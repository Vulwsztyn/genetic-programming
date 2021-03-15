import * as R from 'ramda'

const addNameAndArity = R.mapObjIndexed((v, k) => ({ ...v, name: k, arity: v.function.length }))

const protectedDivide = (a, b) => (b !== 0 ? a / b : a)

const protectedLog = (a, b) => (a > 0 && b > 0 && a !== 1 ? Math.log(b) / Math.log(a) : 0)

const protectedSqrt = (a) => Math.sqrt(Math.abs(a))

const bitwiseXor = (a,b) => (a && !b) || (!a && b)

const ifThenElse = (a,b,c) => a ? b : c

export default addNameAndArity({
  add: {
    function: (a, b) => a + b,
    toCode: (a, b) => `(${a} + ${b})`,
    onlyFor: ['integer', 'real'],
  },
  subtract: {
    function: (a, b) => a - b,
    toCode: (a, b) => `(${a} - ${b})`,
    onlyFor: ['integer', 'real'],
  },
  multiply: {
    function: (a, b) => a * b,
    toCode: (a, b) => `${a} * ${b}`,
    onlyFor: ['integer', 'real'],
  },
  divide: {
    function: (a, b) => a / b,
    toCode: (a, b) => `${a} / ${b}`,
    onlyFor: ['integer', 'real'],
  },
  protectedDivide: {
    function: protectedDivide,
    toCode: (a, b) => `protectedDivide(${a}, ${b})`,
    codeAddition: `const protectedDivide = ${protectedDivide.toString()}`,
    onlyFor: ['integer', 'real'],
  },
  min: {
    function: (a, b) => Math.min(a, b),
    toCode: (a, b) => `Math.min(${a}, ${b})`,
    onlyFor: ['integer', 'real'],
  },
  max: {
    function: (a, b) => Math.max(a, b),
    toCode: (a, b) => `Math.max(${a}, ${b})`,
    onlyFor: ['integer', 'real'],
  },
  exp: {
    function: (a) => Math.exp(a),
    toCode: (a) => `Math.exp(${a})`,
    onlyFor: ['integer', 'real'],
  },
  pow: {
    function: (a, b) => Math.pow(a, b),
    toCode: (a, b) => `Math.pow(${a}, ${b})`,
    onlyFor: ['integer', 'real'],
  },
  log: {
    function: (a, b) => Math.log(b) / Math.log(a),
    toCode: (a, b) => `Math.log(${b}) / Math.log(${a})`,
    onlyFor: ['integer', 'real'],
  },
  protectedLog: {
    function: protectedLog,
    toCode: (a, b) => `protectedLog(${a}, ${b})`,
    codeAddition: `const protectedLog = ${protectedLog.toString()}`,
    onlyFor: ['integer', 'real'],
  },
  sin: {
    function: (a) => Math.sin(a),
    toCode: (a) => `Math.sin(${a})`,
    onlyFor: ['integer', 'real'],
  },
  cos: {
    function: (a) => Math.cos(a),
    toCode: (a) => `Math.cos(${a})`,
    onlyFor: ['integer', 'real'],
  },
  sqrt: {
    function: (a) => Math.sqrt(a),
    toCode: (a) => `Math.sqrt(${a})`,
    onlyFor: ['integer', 'real'],
  },
  protectedSqrt: {
    function: protectedSqrt,
    toCode: (a) => `protectedSqrt(${a})`,
    codeAddition: `const protectedSqrt = ${protectedSqrt.toString()}`,
    onlyFor: ['integer', 'real'],
  },
  neg: {
    function: (a) => -a,
    toCode: (a) => `-${a}`,
    onlyFor: ['integer', 'real'],
  },
  bitwiseOr: {
    function: (a, b) => a | b,
    toCode: (a, b) => `(${a} | ${b})`,
    onlyFor: ['integer'],
  },
  bitwiseAnd: {
    function: (a, b) => a & b,
    toCode: (a, b) => `(${a} & ${b})`,
    onlyFor: ['integer'],
  },
  bitwiseXor: {
    function: (a, b) => a ^ b,
    toCode: (a, b) => `(${a} ^ ${b})`,
    onlyFor: ['integer'],
  },
  or: {
    function: (a, b) => a | b,
    toCode: (a, b) => `(${a} || ${b})`,
    onlyFor: ['boolean'],
  },
  and: {
    function: (a, b) => a && b,
    toCode: (a, b) => `(${a} && ${b})`,
    onlyFor: ['boolean'],
  },
  xor: {
    function: bitwiseXor,
    toCode: (a, b) => `bitwiseXor(${a}, ${b})`,
    codeAddition: `const bitwiseXor = ${bitwiseXor.toString()}`,
    onlyFor: ['boolean'],
  },
  ifThenElse: {
    function: ifThenElse,
    toCode: (a, b, c) => `ifThenElse(${a}, ${b}, ${c})`,
    codeAddition: `const ifThenElse = ${ifThenElse.toString()}`,
    onlyFor: ['boolean'],
  },
  not: {
    function: (a) => !a,
    toCode: (a) => `!(${a})`,
    onlyFor: ['boolean'],
  },
})
