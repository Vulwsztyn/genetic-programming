const points = [...Array(20).keys()].map((a) => {
  const x = a / 10
  return {
    x: x.toFixed(2),
    y: (x * x - x).toFixed(2),
  }
})

const defaultState = {
  problemType: 'real',
  populationSize: 25000,
  numberOfGenerations: 50,
  maxTreeDepth: 6,
  tournamentSize: 500,
  tournamentWinningProbability: 0.5,
  crossoverProbability: 0.5,
  pointsRaw: points.map(({ x, y }) => `${x}, ${y}`).join('\n'),
  leavesRaw: ['1', '-1', '(-10,10)'].join('\n'),
}

const mainReducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        [action.field]: action.value,
      }
    default:
      return state
  }
}

module.exports = { mainReducer }
