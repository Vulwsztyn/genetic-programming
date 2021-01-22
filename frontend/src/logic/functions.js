import * as R from 'ramda'

const addNameAndArity = R.mapObjIndexed((v, k) => ({ ...v, name: k, arity: v.function.length }))

const protectedDivide = (a, b) => (b !== 0 ? a / b : a)

const protectedLog = (a, b) => (a > 0 && b > 0 && a !== 1 ? Math.log(b) / Math.log(a) : 0)

const protectedSqrt = (a) => Math.sqrt(Math.abs(a))

export default addNameAndArity({
  add: {
    function: (a, b) => a + b,
    toCode: (a, b) => `${a} + ${b}`,
  },
  subtract: {
    function: (a, b) => a - b,
    toCode: (a, b) => `${a} - ${b}`,
  },
  multiply: {
    function: (a, b) => a * b,
    toCode: (a, b) => `${a} * ${b}`,
  },
  divide: {
    function: (a, b) => a / b,
    toCode: (a, b) => `${a} / ${b}`,
  },
  protectedDivide: {
    function: protectedDivide,
    toCode: (a, b) => `protectedDivide(${a}, ${b})`,
    codeAddition: `const protectedDivide = ${protectedDivide.toString()}`,
  },
  min: {
    function: (a, b) => Math.min(a, b),
    toCode: (a, b) => `Math.min(${a}, ${b})`,
  },
  max: {
    function: (a, b) => Math.max(a, b),
    toCode: (a, b) => `Math.max(${a}, ${b})`,
    // codeAddition: 'const max = (a, b) => Math.max(a, b)',
  },
  exp: {
    function: (a) => Math.exp(a),
    toCode: (a) => `Math.exp(${a})`,
  },
  pow: {
    function: (a, b) => Math.pow(a, b),
    toCode: (a, b) => `Math.pow(${a}, ${b})`,
  },
  log: {
    function: (a, b) => Math.log(b) / Math.log(a),
    toCode: (a, b) => `Math.log(${b}) / Math.log(${a})`,
  },
  protectedLog: {
    function: protectedLog,
    toCode: (a, b) => `protectedLog(${a}, ${b})`,
    codeAddition: `const protectedLog = ${protectedLog.toString()}`,
  },
  sin: {
    function: (a) => Math.sin(a),
    toCode: (a) => `Math.sin(${a})`,
  },
  cos: {
    function: (a) => Math.cos(a),
    toCode: (a) => `Math.cos(${a})`,
  },
  sqrt: {
    function: (a) => Math.sqrt(a),
    toCode: (a) => `Math.sqrt(${a})`,
  },
  protectedSqrt: {
    function: protectedSqrt,
    toCode: (a) => `protectedSqrt(${a})`,
    codeAddition: `const protectedSqrt = ${protectedSqrt.toString()}`,
  },
  neg: {
    function: (a) => -a,
    toCode: (a) => `-${a}`,
  },
})
