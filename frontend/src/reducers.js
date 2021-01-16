const defaultState = {
  problemType: 'real',
  populationSize: 25000,
  numberOfGenerations: 50,
  maxTreeDepth: 6,
  tournamentSize: 500,
  tournamentWinningProbability: 0.5,
  crossoverProbability: 0.5,
}

const mainReducer = function (state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

module.exports = { mainReducer }
