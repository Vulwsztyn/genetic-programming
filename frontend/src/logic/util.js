// import * as R from 'ramda'

function randomInt(range) {
  return Math.floor(Math.random() * range)
}

function trueWithProbabilty(probabilty) {
  return Math.random() < probabilty
}

function choose(choices) {
  const index = randomInt(choices.length)
  return choices[index]
}

const structuredClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min
}

function sample(arr, size) {
  const indexes = [...Array(size).keys()].map(() => randomInt(arr.length))
  indexes.sort()
  return indexes.map((i) => arr[i])
}

function stringifyTleaf(specimen) {
  return specimen.value.length
    ? specimen.value
    : Number.isInteger(specimen.value)
    ? specimen.value
    : specimen.value.toFixed(5)
}

function stringifySpecimen(specimen) {
  return specimen.type === 'T'
    ? `${stringifyTleaf(specimen)}`
    : `${specimen.name}(${specimen.children ? specimen.children.map(stringifySpecimen).join(',') : ''})`
}

function tournament(specimenArray, tourmanentWinningProbability) {
  for (const specimen of specimenArray) {
    if (trueWithProbabilty(tourmanentWinningProbability)) {
      return specimen
    }
  }
  return specimenArray[specimenArray.length - 1]
}

function specimenToCode(specimen, functions) {
  function codify(specimen) {
    const childrenMapped = specimen.children ? specimen.children.map(codify) : null
    return specimen.type === 'T'
      ? { code: `${stringifyTleaf(specimen)}`, functionsUsed: {} }
      : {
          code: functions[specimen.name].toCode(...childrenMapped.map((e) => e.code)),
          functionsUsed: {
            ...(childrenMapped ? childrenMapped.map((e) => e.functionsUsed) : []).reduce((x, y) => ({ ...x, ...y })),
            [specimen.name]: 1,
          },
        }
  }
  const codified = codify(specimen)
  console.log(Object.keys(codified.functionsUsed))
  console.log(Object.keys(codified.functionsUsed).filter((e) => functions[e].codeAddition))
  console.log(Object.keys(codified.functionsUsed).filter((e) => functions[e].codeAddition).map((e) => functions[e].codeAddition))
  return `const myFunction() => ${codified.code}\n${Object.keys(codified.functionsUsed)
    .filter((e) => functions[e].codeAddition)
    .map((e) => functions[e].codeAddition)
    .join('\n')}`
}

function mapSpecimenToStorable(e, functions) {
  return { function: stringifySpecimen(e), fitness: e.fitness.toFixed(5), code: specimenToCode(e, functions) }
}

module.exports = {
  getRandom,
  randomInt,
  trueWithProbabilty,
  choose,
  structuredClone,
  sample,
  stringifySpecimen,
  tournament,
  mapSpecimenToStorable,
}
