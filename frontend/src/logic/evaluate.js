export function specimenEvaluator(functions) {
  function evaluator(variables, specimen) {
    function Tvalue(node) {
      return variables[node.value] ?? node.value
    }
    return specimen.type === 'F'
      ? functions[specimen.name].function(...specimen.children.map((x) => evaluator(variables, x)))
      : Tvalue(specimen)
  }
  return evaluator
}
