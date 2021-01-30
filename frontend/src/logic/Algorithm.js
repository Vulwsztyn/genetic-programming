import {
  getRandom,
  mapSpecimenToStorable,
  // stringifySpecimen,
  trueWithProbabilty,
  // sample,
  // tournament,
  structuredClone,
  chooseOne,
  randomIntInRange,
} from './util'
import functions from './functions'
import * as R from 'ramda'
const { specimenEvaluator } = require('./evaluate')
const { generateTree, mutate, crossover } = require('./treeGenerator')
const { assignFitness } = require('./fitness')

export default class Algorithm {
  constructor() {
    this.problemType = 'real'
    this.running = false
    this.mode = 'Fullnt'
    this.reduxSetters = {}
    this.functions = functions
    this.inputVariables = []
    this.calculateUsableFuncitons()
    this.evaluate = specimenEvaluator(functions)
    this.currentGenerationNumber = 0
    console.log({ functions })
    this.sortingFunction = (a, b) =>
      isNaN(a.fitness)
        ? 1
        : isNaN(b.fitness)
        ? -1
        : a.fitness > b.fitness
        ? 1
        : b.fitness > a.fitness
        ? -1
        : a.subNodesCount > b.subNodesCount
        ? 1
        : b.subNodesCount > a.subNodesCount
        ? -1
        : 0
  }

  calculateUsableFuncitons() {
    console.log(this.problemType)
    this.functionsArray = Object.values(functions).filter(({ onlyFor }) => onlyFor.includes(this.problemType))
    this.userSelectedFunctions = R.mergeAll(
      Object.keys(this.functions)
        .filter((e) => this.functions[e].onlyFor.includes(this.problemType))
        .map((e) => ({ [e]: true })),
    )
    console.log('test:', this.userSelectedFunctions)
    console.log(
      R.mergeAll(
        Object.keys(this.functions)
          .filter((e) => this.functions[e].onlyFor.includes(this.problemType))
          .map((e) => ({ [e]: true })),
      ),
    )
  }

  getUserSelectedFunctions() {
    console.log(this.userSelectedFunctions)
    return this.userSelectedFunctions
  }

  setUserSelectedFunctions(functions) {
    this.userSelectedFunctions = R.mergeAll(
      Object.keys(this.userSelectedFunctions).map((e) => ({ [e]: !!functions[e] })),
    )
    this.functionsArray = Object.values(this.functions).filter(
      (x) => !!functions[x.name] && x.onlyFor.includes(this.problemType),
    )
  }

  setReduxSetters(setters) {
    this.reduxSetters = { ...this.reduxSetters, ...setters }
  }

  setProperty(name, value) {
    this[name] = value
    if (name === 'problemType') {
      this.calculateUsableFuncitons()
    }
  }

  parsePoints() {
    const parseSinglePoint = {
      real: (e) => Number(e),
      integer: (e) => Math.round(Number(e)),
      boolean: (e) => {
        console.log(e, e === 'true')
        return e.trim().toLowerCase() === 'true'
      },
    }[this.problemType]
    this.points = this.pointsRaw.split('\n').map((line) => {
      const vars = line.split(',').map((e) => parseSinglePoint(e))
      const xs = vars.slice(0, -1)
      const y = vars.slice(-1)[0]
      return {
        ...xs.reduce((acc, x) => ({ value: { ...acc.value, [`x${acc.i}`]: x }, i: acc.i + 1 }), { value: {}, i: 0 })
          .value,
        y,
      }
    })
    console.log({ points: this.points })
  }

  parseLeaves() {
    const isRange = (e) => e.startsWith('(') && e.endsWith(')')
    const fromInput =
      this.problemType !== 'boolean'
        ? this.leavesRaw.split('\n').map((line) => {
            if (isRange(line)) {
              const [min, max] = line
                .slice(1, -1)
                .split(',')
                .map((e) => Number(e))
              return this.problemType === 'real' ? () => getRandom(min, max) : () => randomIntInRange(min, max)
            } else {
              return () => Number(line)
            }
          })
        : [true, false].map((e) => () => e)
    this.inputVariables = Object.keys(this.points[0]).filter((e) => e !== 'y')
    const fromPoints = this.inputVariables.map((e) => {
      return () => e
    })

    this.leavesFunctions = [...fromInput, ...fromPoints]
  }

  createGenerationZero() {
    // console.log(this.inputs)
    const generation = [...Array(this.populationSize).keys()].map(() =>
      generateTree('', this.functionsArray, this.leavesFunctions, this.maxTreeDepth),
    )
    generation.forEach((a) => assignFitness(this.evaluate, this.points, a))
    generation.sort(this.sortingFunction)
    this.generation = generation
  }

  // async asyncCrossover(i) {

  // }

  async generateNextGeneration() {
    const newGeneration = [...Array(this.populationSize).keys()]
    let i = 0
    while (i < newGeneration.length) {
      if (i < newGeneration.length - 1 && trueWithProbabilty(this.crossoverProbability)) {
        const chosen1 = chooseOne(this.generation, this.tournamentSize)
        // console.log({chosen1})
        // console.log(stringifySpecimen(chosen1))
        const chosen2 = chooseOne(this.generation, this.tournamentSize)
        const [a, b] = crossover(chosen1, chosen2)
        newGeneration[i] = a
        i++
        newGeneration[i] = b
        i++
      } else {
        const chosen = chooseOne(this.generation, this.tournamentSize)
        // console.log(stringifySpecimen(chosen))
        newGeneration[i] = mutate(chosen, this.mode, this.functionsArray, this.leavesFunctions, this.maxTreeDepth)
        i++
      }
      if (i % 5000 === 0) {
        console.log(i)
      }
    }

    // await Promise.all(newGeneration.map((a) => new Promise(() => assignFitness(this.evaluate, this.points, a))))
    newGeneration.forEach((a) => assignFitness(this.evaluate, this.points, a))
    newGeneration.sort(this.sortingFunction)
    this.newGeneration = newGeneration
  }

  setBestSpecimensRedux() {
    this.reduxSetters.setBestSpecimens(
      this.generation.slice(0, 10).map((e) => mapSpecimenToStorable(e, this.functions, this.inputVariables)),
    )
  }

  startAndCreateFirstGeneration() {
    this.reduxSetters.setAlgorithmState('RUNNING')
    this.parsePoints()
    this.parseLeaves()
    this.currentGenerationNumber = 1
    this.reduxSetters.setCurrentGeneration(this.currentGenerationNumber)
    this.createGenerationZero()
    this.bestSpecimen = structuredClone(this.generation[0])
    this.reduxSetters.setBestSpecimen(mapSpecimenToStorable(this.bestSpecimen, this.functions, this.inputVariables))
    this.setBestSpecimensRedux()
  }

  async createNextGeneration() {
    this.parsePoints()
    this.parseLeaves()
    this.currentGenerationNumber++
    this.reduxSetters.setCurrentGeneration(this.currentGenerationNumber)
    await this.generateNextGeneration()
    this.generation = this.newGeneration

    this.setBestSpecimensRedux()

    const bestSpecimenThisGeneration = this.generation[0]
    const isCurrentBestBetterThanGlobalbest = this.sortingFunction(this.bestSpecimen, bestSpecimenThisGeneration) === 1
    if (isCurrentBestBetterThanGlobalbest) {
      this.bestSpecimen = structuredClone(bestSpecimenThisGeneration)
      this.reduxSetters.setBestSpecimen(mapSpecimenToStorable(this.bestSpecimen, this.functions, this.inputVariables))
    }

    // console.log(stringifySpecimen(this.bestSpecimen), this.bestSpecimen.fitness)
    // if (this.currentGenerationNumber >= this.numberOfGenerations) this.reduxSetters.setAlgorithmState('FINISHED')
  }
  async runIfNotFinished() {
    this.parsePoints()
    this.parseLeaves()
    if (this.currentGenerationNumber >= this.numberOfGenerations) return true
    if (this.currentGenerationNumber === 0) {
      this.startAndCreateFirstGeneration()
    } else {
      await this.createNextGeneration()
    }
    return false
  }
}
