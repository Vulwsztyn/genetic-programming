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
import Checkbox from '@material-ui/core/Checkbox'
// import * as R from 'ramda'
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
  setValue,
  functions,
  setFunction,
  algorithmState,
}) {
  const classes = useStyles()

  const capitalise = (e) => e[0].toUpperCase() + e.slice(1)

  // const runButtonFunction = () => {
  //   algorithm.startAndCreateFirstGeneration()

  //   for (let i = 0; i < algorithm.numberOfGenerations - 1; i++) {
  //     console.log('Generacja', i)
  //     await algorithm.createNextGeneration()
  //   }
  // }

  const createGenerationZeroButtonFunction = () => {
    algorithm.startAndCreateFirstGeneration()
  }

  const createNextGenerationButtonFunction = () => {
    algorithm.createNextGeneration()
  }

  const runButtonFunction = async () => {
    let finished = false
    while (!finished) {
      finished = await algorithm.runIfNotFinished()
    }
  }

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
              <FormControlLabel
                key={e}
                value={e}
                control={<Radio disabled={algorithmState !== 'BEFORE_RUN'} />}
                label={capitalise(e)}
              />
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
            key={name}
            label={name.split('-').map(capitalise).join(' ')}
            type='number'
            value={value}
            onChange={(e) => setValue(stateField, Number(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            disabled={algorithmState !== 'BEFORE_RUN'}
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
          disabled={algorithmState !== 'BEFORE_RUN'}
        />
        <TextField
          id='leaves'
          label='Possible leaves'
          multiline
          rows={10}
          value={leavesRaw}
          variant='outlined'
          onChange={(e) => setValue('leavesRaw', e.target.value)}
          disabled={algorithmState !== 'BEFORE_RUN'}
        />
        <FormControl component='fieldset'>
          {Object.keys(functions).map((key) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={functions[key]}
                  name={key}
                  key={key}
                  onChange={(event) => {
                    setFunction(event)
                  }}
                  disabled={algorithmState !== 'BEFORE_RUN'}
                />
              }
              label={key}
            />
          ))}
        </FormControl>
      </div>

      <div>
        <Button variant='contained' color='primary' onClick={createGenerationZeroButtonFunction}>
          Create first generation
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={createNextGenerationButtonFunction}
          disabled={algorithmState === 'BEFORE_RUN'}
        >
          Create Next Generation
        </Button>
        <Button variant='contained' color='primary' onClick={runButtonFunction}>
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
    functions,
    algorithmState,
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
    algorithmState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (field, value) => dispatch({ type: 'INPUT_CHANGE', value, field }),
    setFunction: (event) => dispatch({ type: 'SET_FUNCTION', name: event.target.name, value: event.target.checked }),
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(Inputs)
export default Container
