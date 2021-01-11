const { $ } = require('./shared')
function specimenEvaluator(functions) {
  function evaluator(variables, specimen) {
    function Tvalue(node) {
      try {
        return $(variables[node.value] ?? node.value)
      } catch (error) {
        console.error(error);
        console.log(variables[node.value] ?? node.value)
        console.log()
      }
      
    }
    return specimen.type === 'F'
      ? functions[specimen.name](...specimen.children.map((x) => evaluator(variables, x)))
      : Tvalue(specimen)
  }
  return evaluator
}
module.exports = {
  specimenEvaluator,
}
