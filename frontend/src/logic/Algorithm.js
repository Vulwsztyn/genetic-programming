import {
  getRandom,
  mapSpecimenToStorable,
  stringifySpecimen,
  trueWithProbabilty,
  sample,
  tournament,
  structuredClone,
} from './util'
import functions from './functions'
import * as R from 'ramda'
const { specimenEvaluator } = require('./evaluate')
const { generateTree, mutate, crossover } = require('./treeGenerator')
const { assignFitness } = require('./fitness')

export default class Algorithm {
  constructor() {
    this.inputs = {}
    this.running = false
    this.mode = 'Fullnt'
    this.reduxSetters = {}
    this.functions = functions
    this.functionsArray = Object.values(functions)
    this.userSelectedFunctions = R.mergeAll(Object.keys(this.functions).map((e) => ({ [e]: true })))
    this.evaluate = specimenEvaluator(functions)
    this.currentGenerationNumber = 0
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

  getUserSelectedFunctions() {
    return this.userSelectedFunctions
  }

  setUserSelectedFunctions(functions) {
    this.userSelectedFunctions = functions
    this.functionsArray = Object.values(this.functions).filter((x) => functions[x.name])
  }

  setReduxSetters(setters) {
    this.reduxSetters = { ...this.reduxSetters, ...setters }
  }
  setProperty(name, value) {
    this[name] = value
  }

  parsePoints() {
    this.points = this.pointsRaw.split('\n').map((line) => {
      const vars = line.split(',').map((e) => Number(e))
      const xs = vars.slice(0, -1)
      const y = vars.slice(-1)[0]

      return {
        ...xs.reduce((acc, x) => ({ value: { ...acc.value, [`x${acc.i}`]: x }, i: acc.i + 1 }), { value: {}, i: 0 })
          .value,
        y,
      }
    })
  }

  parseLeaves() {
    const isRange = (e) => e.startsWith('(') && e.endsWith(')')
    const fromInput = this.leavesRaw.split('\n').map((line) => {
      if (isRange(line)) {
        const [min, max] = line
          .slice(1, -1)
          .split(',')
          .map((e) => Number(e))
        return () => getRandom(min, max)
      } else {
        return () => Number(line)
      }
    })
    const fromPoints = Object.keys(this.points[0])
      .filter((e) => e !== 'y')
      .map((e) => {
        return () => e
      })
    this.leavesFunctions = [...fromInput, ...fromPoints]
  }

  createGenerationZero() {
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
        const specimenArray1 = sample(this.generation, this.tournamentSize)
        const specimenArray2 = sample(this.generation, this.tournamentSize)
        const chosen1 = tournament(specimenArray1, this.tourmanentWinningProbability)
        const chosen2 = tournament(specimenArray2, this.tourmanentWinningProbability)
        const [a, b] = crossover(chosen1, chosen2)
        newGeneration[i] = a
        i++
        newGeneration[i] = b
        i++
      } else {
        const specimenArray = sample(this.generation, this.tournamentSize)
        const chosen = tournament(specimenArray, this.tourmanentWinningProbability)
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
      this.generation.slice(0, 10).map((e) => mapSpecimenToStorable(e, this.functions)),
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
    this.reduxSetters.setBestSpecimen(mapSpecimenToStorable(this.bestSpecimen, this.functions))
    this.setBestSpecimensRedux()
  }

  async createNextGeneration() {
    this.currentGenerationNumber++
    this.reduxSetters.setCurrentGeneration(this.currentGenerationNumber)
    await this.generateNextGeneration()
    this.generation = this.newGeneration

    this.setBestSpecimensRedux()

    const bestSpecimenThisGeneration = this.generation[0]
    if (this.sortingFunction(this.bestSpecimen, bestSpecimenThisGeneration) === 1) {
      this.bestSpecimen = structuredClone(bestSpecimenThisGeneration)
      this.reduxSetters.setBestSpecimen(mapSpecimenToStorable(this.bestSpecimen, this.functions))
    }

    console.log(stringifySpecimen(this.bestSpecimen), this.bestSpecimen.fitness)
    if (this.currentGenerationNumber >= this.numberOfGenerations) this.reduxSetters.setAlgorithmState('FINISHED')
  }
  async runIfNotFinished() {
    if (this.currentGenerationNumber >= this.numberOfGenerations) return true
    if (this.currentGenerationNumber === 0) {
      this.startAndCreateFirstGeneration()
    } else {
      await this.createNextGeneration()
    }
    return false
  }
}
