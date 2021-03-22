const points = [...Array(20).keys()].map((a) => {
  const x = a / 10
  return {
    x: x.toFixed(2),
    y: (x * x - x).toFixed(2),
  }
})

const defaultState = {
  problemType: 'real',
  populationSize: 5000,
  desiredGeneration: 0,
  maxTreeDepth: 6,
  tournamentSize: 50,
  crossoverProbability: 0.2,
  pointsRaw: points.map(({ x, y }) => `${x}, ${y}`).join('\n'),
  leavesRaw: ['1', '-1', '(-10,10)'].join('\n'),
  functions: {},
  bestSpecimens: [],
  bestSpecimen: null,
  currentGeneration: '0',
  algorithmState: 'BEFORE_RUN',
  nodePenalty: 0,
}

const canBeChangedAfterAlgorithmRun = [
  'tournamentSize',
  'crossoverProbability',
  'leavesRaw',
  'pointsRaw',
  'nodePenalty',
]

export const mainReducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return state.algorithmState === 'RUNNING' && !canBeChangedAfterAlgorithmRun.includes(action.field)
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
        desiredGeneration: action.value === 'BEFORE_RUN' ? 0 : state.desiredGeneration,
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
    case 'SET_DESIRED_GENERAION':
      return {
        ...state,
        desiredGeneration: action.value,
      }
    default:
      return state
  }
}
