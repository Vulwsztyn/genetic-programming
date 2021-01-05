const { $ } = require('./shared')
const functions = require('./functions')
const functionNames = Object.keys(functions)
const functionsMetaArray = functionNames.map((name) => ({ name, arity: functions[name].length }))
const variables = {
  x: 2,
  y: 4,
}
function stringifySpecimen(specimen) {
  return specimen.type === 'T'
    ? `${specimen.value}`
    : `${specimen.name}(${specimen.children.map(stringifySpecimen).join(',')})`
}
function specimenEvaluator(functions, variables) {
  function evaluator(specimen) {
    function Tvalue(node) {
      return $(variables[node.value] ?? node.value)
    }
    return specimen.type === 'F' ? functions[specimen.name](...specimen.children.map(evaluator)) : Tvalue(specimen)
  }
  return evaluator
}
const specimen = {
  name: 'multiply',
  type: 'F',
  children: [
    {
      name: 'add',
      type: 'F',
      children: [
        {
          type: 'T',
          value: 1,
        },
        {
          type: 'T',
          value: 'x',
        },
      ],
    },
    {
      name: 'neg',
      type: 'F',
      children: [
        {
          type: 'T',
          value: 'y',
        },
      ],
    },
  ],
}
console.log(stringifySpecimen(specimen))
const evaluate = specimenEvaluator(functions, variables)
console.log(functions.add(...[$(1), $(3)]))
console.log(evaluate(specimen))
