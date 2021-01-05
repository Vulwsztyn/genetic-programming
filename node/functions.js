const { $ } = require('./shared')
function add(a, b) {
  return a.plus(b)
}

function subtract(a, b) {
  return a.minus(b)
}

function multiply(a, b) {
  return a.times(b)
}

function protectedDivide(a, b) {
  return !b.eq('0') ? a.div(b) : $(0)
}

function min(a, b) {
  return a.lte(b) ? a : b
}

function max(a, b) {
  return a.gte(b) ? a : b
}

function exp(a) {
  return a.exp()
}

function pow(a, b) {
  return $(a).pow(b)
}

function protectedLog(a, b) {
  return a.gt(0) && b.gt(0) && !a.eq($(1)) ? b.log(a) : $(0)
}

function sin(a) {
  return a.sin()
}

function cos(a) {
  return a.cos()
}

function protectedSqrt(a) {
  return a.abs().sqrt()
}

function neg(a) {
  return a.neg()
}

module.exports = {
  add,
  subtract,
  multiply,
  protectedDivide,
  min,
  max,
  exp,
  pow,
  protectedLog,
  sin,
  cos,
  protectedSqrt,
  neg,
}
