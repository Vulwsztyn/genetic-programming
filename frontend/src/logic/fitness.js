function fitness(evaluate, points, specimen) {
  return points
    .map((point) => point.y - evaluate(point, specimen))
    .map((x) => x * x)
    .reduce((x, y) => x + y)
}

function assignFitness(evaluate, points, specimen) {
  //   console.log({ specimen })
  specimen.fitness = Number(fitness(evaluate, points, specimen).toFixed(5))
  return specimen
}

module.exports = {
  fitness,
  assignFitness,
}
