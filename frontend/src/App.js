import './App.css'
import Inputs from './inputs'
import Visuals from './visuals'
import Logic from './logic/Component'
import Algorithm from './logic/Algorithm'
import Grid from '@material-ui/core/Grid'
export default function App() {
  const algorithm = new Algorithm()

  return (
    <div className='App'>
      <Grid container>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Inputs algorithm={algorithm}></Inputs>
        </Grid>
        <Grid item xs={12} sm={6} md={9} lg={10}>
          <Visuals></Visuals>
        </Grid>
      </Grid>
      <Logic algorithm={algorithm}></Logic>
    </div>
  )
}
