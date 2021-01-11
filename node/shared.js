const Decimal = require('decimal.js')
const v8 = require('v8')
const $ = (x) => new Decimal(x)
const R = require('ramda')

function randomInt(range) {
  return Math.floor(Math.random() * range)
}

function trueWithProbabilty(probabilty) {
  return Math.random() < probabilty
}

function choose(choices) {
  const index = randomInt(choices.length)
  return choices[index]
}

const structuredClone = (obj) => {
  return v8.deserialize(v8.serialize(R.omit(['fitness'], obj)))
}

function sample(arr, size) {
  const indexes = arr.map((_, i) => i)
  let i = arr.length
  let temp = null
  let index = null
  while (i--) {
    index = Math.floor((i + 1) * Math.random())
    temp = indexes[index]
    indexes[index] = indexes[i]
    indexes[i] = temp
  }
  indexes.sort()
  return indexes.slice(0, size).map((i) => arr[i])
}

module.exports = {
  $,
  choose,
  structuredClone,
  randomInt,
  trueWithProbabilty,
  sample,
}
