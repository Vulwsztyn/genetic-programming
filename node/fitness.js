const { $ } = require('./shared')
function fitness(evaluate, points, specimen) {
  return points
    .map((point) => $(point.y).minus(evaluate(point, specimen)))
    .map((x) => x.times(x))
    .reduce((x, y) => x.plus(y))
}

function assignFitness(evaluate, points, specimen) {
//   console.log({ specimen })
  specimen.fitness = fitness(evaluate, points, specimen)
  return specimen
}

module.exports = {
  fitness,
  assignFitness,
}
