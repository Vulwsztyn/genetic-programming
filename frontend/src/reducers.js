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
  numberOfGenerations: 2,
  maxTreeDepth: 6,
  tournamentSize: 50,
  tournamentWinningProbability: 0.5,
  crossoverProbability: 0.5,
  pointsRaw: points.map(({ x, y }) => `${x}, ${y}`).join('\n'),
  leavesRaw: ['1', '-1', '(-10,10)'].join('\n'),
  functions: {},
  bestSpecimens: [],
  bestSpecimen: null,
  currentGeneration: '',
  algorithmState: 'BEFORE_RUN',
}

const mainReducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return state.algorithmState === 'RUNNING'
        ? state
        : {
            ...state,
            [action.field]: action.value,
          }
    case 'SET_FUNCTIONS':
      return {
        ...state,
        functions: action.functions,
      }
    case 'SET_FUNCTION':
      return {
        ...state,
        functions: {
          ...state.functions,
          [action.name]: action.value,
        },
      }
    case 'SET_ALGORITHM_STATE':
      return {
        ...state,
        algorithmState: action.value,
      }
    case 'SET_CURRENT_GENERATION':
      return {
        ...state,
        currentGeneration: action.value,
      }
    case 'SET_BEST_SPECIMENS':
      return {
        ...state,
        bestSpecimens: action.value,
      }
    case 'SET_BEST_SPECIMEN':
      return {
        ...state,
        bestSpecimen: action.value,
      }
    default:
      return state
  }
}

module.exports = { mainReducer }
