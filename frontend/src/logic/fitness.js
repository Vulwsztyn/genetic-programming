function fitness(evaluate, points, specimen) {
  return points
    .map((point) => {
      // console.log(point.y - evaluate(point, specimen))
      // console.log(point.y, evaluate(point, specimen))
      return point.y - evaluate(point, specimen)
    })
    .map((x) => x * x)
    .reduce((x, y) => x + y)
}

function assignFitness(evaluate, points, specimen) {
  // console.log(fitness(evaluate, points, specimen))
  specimen.fitness = Number(fitness(evaluate, points, specimen).toFixed(5))
  return specimen
}

module.exports = {
  fitness,
  assignFitness,
}
