export function randomInt(range) {
  return Math.floor(Math.random() * range)
}

export function randomIntInRange(min, max) {
  return randomInt(max - min) + min
}

export function trueWithProbabilty(probabilty) {
  return Math.random() < probabilty
}

export function choose(choices) {
  const index = randomInt(choices.length)
  return choices[index]
}

export const structuredClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export function getRandom(min, max) {
  return Math.random() * (max - min) + min
}

export function sample(arr, size) {
  const indexes = [...Array(size).keys()].map(() => randomInt(arr.length))
  indexes.sort()
  return indexes.map((i) => arr[i])
}

export function stringifyTleaf(specimen) {
  return specimen.value.length
    ? specimen.value
    : Number.isInteger(specimen.value)
    ? specimen.value
    : typeof specimen.value === 'boolean'
    ? specimen.value
    : specimen.value.toFixed(5)
}

export function stringifySpecimen(specimen) {
  return specimen.type === 'T'
    ? `${stringifyTleaf(specimen)}`
    : `${specimen.name}(${specimen.children ? specimen.children.map(stringifySpecimen).join(', ') : ''})`
}

export function chooseOne(array, tournamentSize) {
  const indexNormalised = Math.min(...[...Array(tournamentSize).keys()].map(() => Math.random()))
  // console.log({indexNormalised})
  return array[Math.floor(indexNormalised * array.length)]
}

export function tournament(specimenArray, tourmanentWinningProbability) {
  for (const specimen of specimenArray) {
    if (trueWithProbabilty(tourmanentWinningProbability)) {
      return specimen
    }
  }
  return specimenArray[specimenArray.length - 1]
}

export function specimenToCode(specimen, functions, inputVariables) {
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
  // console.log(Object.keys(codified.functionsUsed))
  // console.log(Object.keys(codified.functionsUsed).filter((e) => functions[e].codeAddition))
  // console.log(
  //   Object.keys(codified.functionsUsed)
  //     .filter((e) => functions[e].codeAddition)
  //     .map((e) => functions[e].codeAddition),
  // )
  return `const myFunction = (${inputVariables}) => ${codified.code}\n${Object.keys(codified.functionsUsed)
    .filter((e) => functions[e].codeAddition)
    .map((e) => functions[e].codeAddition)
    .join('\n')}`
}

export function mapSpecimenToStorable(e, functions, inputVariables) {
  return {
    function: stringifySpecimen(e),
    fitness: e.fitness.toFixed(5),
    code: specimenToCode(e, functions, inputVariables),
  }
}

// module.exports = {
//   getRandom,
//   randomInt,
//   trueWithProbabilty,
//   choose,
//   structuredClone,
//   sample,
//   stringifySpecimen,
//   tournament,
//   mapSpecimenToStorable,
// }
