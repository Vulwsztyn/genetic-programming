import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import Inputs from './inputs'
function App({ count, handleIncrementClick, handleDecrementClick }) {
  return (
    <div className='App'>
      <Inputs></Inputs>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    count: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
    handleDecrementClick: () => dispatch({ type: 'DECREMENT' }),
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(App)
export default Container
