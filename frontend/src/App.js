import './App.css'
import Inputs from './inputs'
import Visuals from './visuals'
import Logic from './logic/Component'
import Algorithm from './logic/Algorithm'
export default function App() {
  const algorithm = new Algorithm()
  return (
    <div className='App'>
      <Inputs algorithm={algorithm}></Inputs>
      <Visuals></Visuals>
      <Logic algorithm={algorithm}></Logic>
    </div>
  )
}
