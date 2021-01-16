import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
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

export default function FormPropsTextFields() {
  const [value, setValue] = React.useState('real')

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const classes = useStyles()

  const capitalise = (e) => e[0].toUpperCase() + e.slice(1)

  const points = [...Array(20).keys()].map((a) => {
    const x = a / 10
    return {
      x: x.toFixed(2),
      y: (x * x - x).toFixed(2),
    }
  })

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Problem type</FormLabel>
          <RadioGroup aria-label='gender' name='gender1' value={value} onChange={handleChange}>
            {['real', 'integer'].map((e) => (
              <FormControlLabel value={e} control={<Radio />} label={capitalise(e)} />
            ))}
          </RadioGroup>
        </FormControl>
        {[
          { name: 'population-size', defaultValue: 25000 },
          { name: 'number-of-generations', defaultValue: 50 },
          { name: 'max-tree-depth', defaultValue: 6 },
          { name: 'tournament-size', defaultValue: 500 },
          { name: 'tournament-winning-probability', defaultValue: 0.5 },
          { name: 'crossover-probabilty', defaultValue: 0.5 },
        ].map(({ name, defaultValue }) => (
          <TextField
            id={name}
            label={name.split('-').map(capitalise).join(' ')}
            type='number'
            defaultValue={defaultValue}
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
          />
        ))}
        <TextField
          id='outlined-multiline-static'
          label='Points (last column is y)'
          multiline
          rows={10}
          defaultValue={points.map(({ x, y }) => `${x}, ${y}`).join('\n')}
          variant='outlined'
        />
        <TextField
          id='outlined-multiline-static'
          label='Possible leaves'
          multiline
          rows={10}
          defaultValue={['1', '-1', '(-10,10)'].join('\n')}
          variant='outlined'
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
