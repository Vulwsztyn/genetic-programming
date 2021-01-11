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

function protectedPow(a, b) {
  return !a.eq('0') ? $(a.abs()).pow(b) : $(0)
}

function protectedLog(a, b) {
  try {
    return a.gt(0) && b.gt(0) && !a.eq($(1)) ? b.log(a) : $(0)
  } catch (error) {
    return b
  }
}

function sin(a) {
  try {
    return a.sin()
  } catch (error) {
    return a
  }
}

function cos(a) {
  try {
    return a.cos()
  } catch (error) {
    return a
  }
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
  protectedPow,
  protectedLog,
  sin,
  cos,
  protectedSqrt,
  neg,
}
