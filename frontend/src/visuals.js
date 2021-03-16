import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
// import Highlight from 'react-highlight.js'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import SyntaxHighlighter from 'react-syntax-highlighter'
import i18n from './i18n'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
})

function Visuals({ generation, bestSpecimens, bestSpecimen }) {
  const { lang } = useParams()
  i18n.changeLanguage(lang)
  const classes = useStyles()
  const [code, setCode] = useState(bestSpecimen?.code)
  const mapSpecimenToRow = (row, i, title) => (
    <TableRow key={i}>
      <TableCell component='th' scope='row' align='right'>
        {title || i + 1}
      </TableCell>
      <TableCell align='right'>
        <Typography>{row.function}</Typography>
      </TableCell>
      <TableCell align='right'>{row.fitness}</TableCell>
      <TableCell align='right'>
        <Button variant='contained' color='primary' onClick={() => setCode(row.code)}>
          {i18n.t('showCode')}
        </Button>
      </TableCell>
    </TableRow>
  )
  return (
    <>
      <h1>{i18n.t("generation")}: {generation}</h1>
      {code || bestSpecimen?.code ? (
        <>
          <h2>Code:</h2>
          <SyntaxHighlighter
            language='javascript'
            lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
            wrapLines={true}
          >
            {code || bestSpecimen?.code}
          </SyntaxHighlighter>
        </>
      ) : (
        <></>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          {(bestSpecimen ? [bestSpecimen] : []).map((row, i) => mapSpecimenToRow(row, i, i18n.t('globalBest')))}
          <TableHead>
            <TableRow>
              <TableCell align='right'>{i18n.t('number')}</TableCell>
              <TableCell align='right'>{i18n.t('function')}</TableCell>
              <TableCell align='right'>{i18n.t('errorSquared')}</TableCell>
              <TableCell align='right'>{i18n.t('showCode')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{bestSpecimens.map((row, i) => mapSpecimenToRow(row, i))}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
const mapStateToProps = (state) => {
  const { currentGeneration, bestSpecimens, bestSpecimen } = state
  return {
    generation: currentGeneration,
    bestSpecimens,
    bestSpecimen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setValue: (field, value) => dispatch({ type: 'INPUT_CHANGE', value, field }),
    // setFunction: (event) => dispatch({ type: 'SET_FUNCTION', name: event.target.name, value: event.target.checked }),
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(Visuals)
export default Container
