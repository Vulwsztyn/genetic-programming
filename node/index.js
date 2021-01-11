const { $, sample, trueWithProbabilty, structuredClone } = require('./shared')
const functions = require('./functions')
const { stringifySpecimen } = require('./util')
const { specimenEvaluator } = require('./evaluate')
const { generateTree, mutate, crossover } = require('./treeGenerator')
const { fitness, assignFitness } = require('./fitness')
const functionNames = Object.keys(functions)
const functionsMetaArray = functionNames.map((name) => ({ name, arity: functions[name].length }))
console.log('---sanity---')
const variables = {
  x: 10,
  // y: 4,
}
const points = [...Array(20).keys()].map((a) => {
  const x = $(a).div(10).minus(1)
  return {
    x,
    y: x.pow(2).minus(x),
  }
})

const evaluate = specimenEvaluator(functions)

function tournament(specimenArray, tourmanentWinningProbability) {
  for (const specimen of specimenArray) {
    if (trueWithProbabilty(tourmanentWinningProbability)) {
      return specimen
    }
  }
  return specimenArray[specimenArray.length - 1]
}

function generateNextGeneration(
  generation,
  tournamentSize,
  evaluate,
  points,
  tourmanentWinningProbability,
  crossoverProbability,
  mode,
  functionsMetaArray,
  leaves,
  maxLevel,
) {
  const newGeneration = [...Array(generation.length).keys()]
  let i = 0
  while (i < generation.length) {
    if (i < generation.length - 1 && trueWithProbabilty(crossoverProbability)) {
      const specimenArray1 = sample(generation, tournamentSize)
      const specimenArray2 = sample(generation, tournamentSize)
      const chosen1 = tournament(specimenArray1, tourmanentWinningProbability)
      const chosen2 = tournament(specimenArray2, tourmanentWinningProbability)
      const [a, b] = crossover(chosen1, chosen2)
      newGeneration[i] = a
      i++
      newGeneration[i] = b
      i++
    } else {
      const specimenArray = sample(generation, tournamentSize)
      const chosen = tournament(specimenArray, tourmanentWinningProbability)
      newGeneration[i] = mutate(chosen, mode, functionsMetaArray, leaves, maxLevel)
      i++
    }
    // if (i%100 === 0) {
    //   console.log(i)
    // }
  }
  // const newGeneration = [...Array(generation.length).keys()].map((x) => {})
  newGeneration.forEach((a) => assignFitness(evaluate, points, a))
  newGeneration.sort((a, b) =>
    a.fitness.gt(b.fitness)
      ? 1
      : b.fitness.gt(a.fitness)
      ? -1
      : a.subNodesCount > b.subNodesCount
      ? 1
      : b.subNodesCount > a.subNodesCount
      ? -1
      : 0,
  )
  return newGeneration
}

const leaves = ['x', 1, 0, -1]
const tournamentSize = 50
const generationSize = 2000
const numberOfGenerations = 200
const tourmanentWinningProbability = 0.5
const crossoverProbability = 0.5
const maxLevel = 5
const mode = 'Fullnt'
const generation0 = [...Array(generationSize).keys()].map(() => generateTree('', functionsMetaArray, leaves, maxLevel))
// generation0.forEach((a) => console.log(stringifySpecimen(a)))
// generation0.forEach((a) => console.log(evaluate(variables, a)))
generation0.forEach((a) => assignFitness(evaluate, points, a))
generation0.sort((a, b) => (a.fitness.gt(b.fitness) ? 1 : b.fitness.gt(a.fitness) ? -1 : 0))
// const specimenArray = sample(generation0, tournamentSize)
// console.log(stringifySpecimen(tournament(specimenArray, tourmanentWinningProbability)))
let bestSpecimenThisGeneration = generation0[0]
let bestSpecimen = structuredClone(bestSpecimenThisGeneration)
assignFitness(evaluate, points, bestSpecimen)
let currentGeneration = generation0
console.log('---genetics---')
;[...Array(numberOfGenerations - 1).keys()].forEach(function (i) {
  console.log()
  console.log('generation ', i + 1)
  currentGeneration = generateNextGeneration(
    currentGeneration,
    tournamentSize,
    evaluate,
    points,
    tourmanentWinningProbability,
    crossoverProbability,
    mode,
    functionsMetaArray,
    leaves,
    maxLevel,
  )
  bestSpecimenThisGeneration = currentGeneration[0]
  console.log(stringifySpecimen(bestSpecimenThisGeneration))
  console.log(bestSpecimenThisGeneration.fitness)
  console.log(bestSpecimen.fitness)
  console.log(stringifySpecimen(bestSpecimen))

  console.log(bestSpecimen.subNodesCount)
  console.log(bestSpecimenThisGeneration.subNodesCount)
  console.log(
    bestSpecimen.fitness.gt(bestSpecimenThisGeneration.fitness) ||
      (bestSpecimen.fitness.eq(bestSpecimenThisGeneration.fitness) &&
        bestSpecimen.subNodesCount > bestSpecimenThisGeneration.subNodesCount),
  )

  bestSpecimen =
    bestSpecimen.fitness.gt(bestSpecimenThisGeneration.fitness) ||
    (bestSpecimen.fitness.eq(bestSpecimenThisGeneration.fitness) &&
      bestSpecimen.subNodesCount > bestSpecimenThisGeneration.subNodesCount)
      ? structuredClone(bestSpecimenThisGeneration)
      : bestSpecimen
  assignFitness(evaluate, points, bestSpecimen)
  // currentGeneration.forEach((a) => console.log(stringifySpecimen(a), a.fitness))
})

// console.log('1'.repeat(10))
// const x = $('3.34534535')
// const y = $('4.345345')
// console.log(x.precision())
// console.log(functionsMetaArray)
// // for(const fun of functionsMetaArray){
// //   // console.log(functions[fun.name](x,y))
// //   console.log(functions[fun.name](functions[fun.name](x,y),y).precision())
// // }
// console.log($(0.5).precision())
