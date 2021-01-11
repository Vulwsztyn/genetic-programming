import logo from './logo.svg'
import './App.css'
import { Provider, connect } from 'react-redux'

function App({ count, handleIncrementClick, handleDecrementClick }) {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Helloworld React & Redux! {count}</h1>
        <button onClick={handleDecrementClick}>Decrement</button>
        <button onClick={handleIncrementClick}>Increment</button>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
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
