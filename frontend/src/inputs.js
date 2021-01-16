import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& > div > *': {
      margin: theme.spacing(1),
    },
  },
}))

function Inputs({
  problemType,
  populationSize,
  numberOfGenerations,
  maxTreeDepth,
  tournamentSize,
  tournamentWinningProbability,
  crossoverProbability,
  pointsRaw,
  leavesRaw,
  setValue,
}) {
  const classes = useStyles()

  const capitalise = (e) => e[0].toUpperCase() + e.slice(1)

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Problem type</FormLabel>
          <RadioGroup
            aria-label='problem-type'
            name='problem-type'
            value={problemType}
            onChange={(event) => setValue('problemType', event.target.value)}
          >
            {['real', 'integer'].map((e) => (
              <FormControlLabel value={e} control={<Radio />} label={capitalise(e)} />
            ))}
          </RadioGroup>
        </FormControl>
        {[
          { name: 'population-size', value: populationSize, stateField: 'populationSize' },
          { name: 'number-of-generations', value: numberOfGenerations, stateField: 'numberOfGenerations' },
          { name: 'max-tree-depth', value: maxTreeDepth, stateField: 'maxTreeDepth' },
          { name: 'tournament-size', value: tournamentSize, stateField: 'tournamentSize' },
          {
            name: 'tournament-winning-probability',
            value: tournamentWinningProbability,
            stateField: 'tournamentWinningProbability',
          },
          { name: 'crossover-probabilty', value: crossoverProbability, stateField: 'crossoverProbability' },
        ].map(({ name, value, stateField }) => (
          <TextField
            id={name}
            label={name.split('-').map(capitalise).join(' ')}
            type='number'
            value={value}
            onChange={(e) => setValue(stateField, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
          />
        ))}
        <TextField
          id='points'
          label='Points (last column is y)'
          multiline
          rows={10}
          value={pointsRaw}
          variant='outlined'
          onChange={(e) => setValue('pointsRaw', e.target.value)}
        />
        <TextField
          id='leaves'
          label='Possible leaves'
          multiline
          rows={10}
          value={leavesRaw}
          variant='outlined'
          onChange={(e) => setValue('leavesRaw', e.target.value)}
        />
      </div>
      <div>
        <Button variant='contained' color='primary'>
          Run
        </Button>
        {/* <Button variant='contained' color='primary'>
          Primary
        </Button>
        <Button variant='contained' color='primary'>
          Primary
        </Button> */}
      </div>
    </form>
  )
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (field, value) => dispatch({ type: 'INPUT_CHANGE', value, field }),
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(Inputs)
export default Container
