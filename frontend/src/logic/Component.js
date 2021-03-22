import React from 'react'
import { connect } from 'react-redux'
// import * as R from 'ramda'

function App({
  algorithm,
  problemType,
  populationSize,
  numberOfGenerations,
  maxTreeDepth,
  tournamentSize,
  tournamentWinningProbability,
  crossoverProbability,
  pointsRaw,
  leavesRaw,
  setFunctions,
  functions,
  setAlgorithmState,
  setCurrentGeneration,
  setBestSpecimens,
  setBestSpecimen,
  nodePenalty,
}) {
  algorithm.setProperty('populationSize', Number(populationSize))
  algorithm.setProperty('numberOfGenerations', Number(numberOfGenerations))
  algorithm.setProperty('maxTreeDepth', Number(maxTreeDepth))
  algorithm.setProperty('tournamentSize', Number(tournamentSize))
  algorithm.setProperty('tournamentWinningProbability', Number(tournamentWinningProbability))
  algorithm.setProperty('crossoverProbability', Number(crossoverProbability))
  algorithm.setProperty('pointsRaw', pointsRaw)
  algorithm.setProperty('leavesRaw', leavesRaw)
  algorithm.setProperty('nodePenalty', nodePenalty)
  if (Object.keys(functions).length !== 0) {
    algorithm.setUserSelectedFunctions(functions)
  } else {
    setFunctions(algorithm.getUserSelectedFunctions())
  }
  console.log(problemType, algorithm.problemType)
  console.log(problemType !== algorithm.problemType)
  if (problemType !== algorithm.problemType) {
    algorithm.setProperty('problemType', problemType)
    setFunctions(algorithm.getUserSelectedFunctions())
  }

  algorithm.setReduxSetters({ setAlgorithmState, setCurrentGeneration, setBestSpecimens, setBestSpecimen })
  return <></>
}
const mapStateToProps = (state) => {
  const {
    problemType,
    populationSize,
    numberOfGenerations,
    maxTreeDepth,
    tournamentSize,
    tournamentWinningProbability,
    crossoverProbability,
    pointsRaw,
    leavesRaw,
    functions,
    nodePenalty,
  } = state
  return {
    problemType,
    populationSize,
    numberOfGenerations,
    maxTreeDepth,
    tournamentSize,
    tournamentWinningProbability,
    crossoverProbability,
    pointsRaw,
    leavesRaw,
    functions,
    nodePenalty,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFunctions: (functions) => dispatch({ type: 'SET_FUNCTIONS', functions }),
    setAlgorithmState: (value) => dispatch({ type: 'SET_ALGORITHM_STATE', value }),
    setCurrentGeneration: (value) => dispatch({ type: 'SET_CURRENT_GENERATION', value }),
    setBestSpecimens: (value) => dispatch({ type: 'SET_BEST_SPECIMENS', value }),
    setBestSpecimen: (value) => dispatch({ type: 'SET_BEST_SPECIMEN', value }),
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(App)
export default Container
