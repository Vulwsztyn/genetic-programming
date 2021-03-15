import React, { useState, useEffect, useCallback } from 'react'
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
import Grid from '@material-ui/core/Grid'
// import * as R from 'ramda'
import i18n from './i18n'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
      padding: theme.spacing(3),
      // textAlign: 'center',
      // color: theme.palette.text.secondary,
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
  resetAlgorithmState,
  currentGeneration,
  setDesiredGeneration,
  desiredGeneration,
}) {
  const { lang } = useParams()
  i18n.changeLanguage(lang)
  const classes = useStyles()
  const [numberOfgeneraionsToRun, setNumberOfgeneraionsToRun] = useState(5)
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

  const createNextGenerationButtonFunction = useCallback(() => {
    algorithmState !== 'BEFORE_RUN' ? algorithm.createNextGeneration() : algorithm.startAndCreateFirstGeneration()
  }, [algorithm, algorithmState])

  const runButtonFunction = async () => {
    setDesiredGeneration(Number(currentGeneration) + Number(numberOfgeneraionsToRun))
    createNextGenerationButtonFunction()
  }
  useEffect(() => {
    setTimeout(() => {
      if (Number(currentGeneration) < Number(desiredGeneration)) {
        createNextGenerationButtonFunction()
      }
    }, 0)
  }, [createNextGenerationButtonFunction, currentGeneration, desiredGeneration])

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Grid container spacing={1}>
        {[
          { name: 'populationSize', value: populationSize, stateField: 'populationSize' },
          // { name: 'number-of-generations', value: numberOfGenerations, stateField: 'numberOfGenerations' },
          { name: 'maxTreeDepth', value: maxTreeDepth, stateField: 'maxTreeDepth' },
          { name: 'tournamentSize', value: tournamentSize, stateField: 'tournamentSize' },
          // {
          //   name: 'tournament-winning-probability',
          //   value: tournamentWinningProbability,
          //   stateField: 'tournamentWinningProbability',
          // },
          { name: 'crossoverProbability', value: crossoverProbability, stateField: 'crossoverProbability' },
        ].map(({ name, value, stateField }) => (
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <TextField
              id={name}
              key={name}
              label={i18n.t(name)}
              type='number'
              value={value}
              onChange={(e) => setValue(stateField, Number(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
              disabled={algorithmState !== 'BEFORE_RUN'}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TextField
            id='points'
            label={i18n.t('pointsWithInfo')}
            multiline
            rows={10}
            value={pointsRaw}
            variant='outlined'
            onChange={(e) => setValue('pointsRaw', e.target.value)}
            // disabled={algorithmState !== 'BEFORE_RUN'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TextField
            id='leaves'
            label={i18n.t('possibleLeaves')}
            multiline
            rows={10}
            value={problemType === 'boolean' ? 'true, false' : leavesRaw}
            variant='outlined'
            onChange={(e) => setValue('leavesRaw', e.target.value)}
            disabled={problemType === 'boolean'}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>{i18n.t('problemType')}</FormLabel>
            <RadioGroup
              aria-label='problem-type'
              name='problem-type'
              value={problemType}
              onChange={(event) => setValue('problemType', event.target.value)}
            >
              {['real', 'integer', 'boolean'].map((e) => (
                <FormControlLabel
                  key={e}
                  value={e}
                  control={<Radio disabled={algorithmState !== 'BEFORE_RUN'} />}
                  label={capitalise(i18n.t(e))}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={createGenerationZeroButtonFunction}
          >
            {i18n.t('createFirstGeneration')}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={createNextGenerationButtonFunction}
            // disabled={algorithmState === 'BEFORE_RUN'}
          >
            {i18n.t('createNextGeneration')}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Button className={classes.button} variant='contained' color='primary' onClick={runButtonFunction}>
            {i18n.t('runNGenerations')}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TextField
            // id={name}
            // key={name}
            // label={name.split('-').map(capitalise).join(' ')}
            label={i18n.t('numberOfGenerationsToRun')}
            type='number'
            value={numberOfgeneraionsToRun}
            onChange={(e) => setNumberOfgeneraionsToRun(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            // disabled={algorithmState !== 'BEFORE_RUN'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Button className={classes.button} variant='contained' color='primary' onClick={resetAlgorithmState}>
            Reset
          </Button>
        </Grid>
        {/* <Button variant='contained' color='primary'>
          Primary
        </Button>
        <Button variant='contained' color='primary'>
          Primary
        </Button> */}
      </Grid>
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
    currentGeneration,
    desiredGeneration,
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
    currentGeneration,
    desiredGeneration,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (field, value) => dispatch({ type: 'INPUT_CHANGE', value, field }),
    setFunction: (event) => dispatch({ type: 'SET_FUNCTION', name: event.target.name, value: event.target.checked }),
    resetAlgorithmState: () => dispatch({ type: 'SET_ALGORITHM_STATE', value: 'BEFORE_RUN' }),
    setDesiredGeneration: (value) => dispatch({ type: 'SET_DESIRED_GENERAION', value }),
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(Inputs)
export default Container
