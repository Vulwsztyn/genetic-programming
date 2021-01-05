const functions = require('../functions')
const { $ } = require('../shared')
const zero = $(0)
const one = $(1)
const two = $(2)
const three = $(3)
const four = $(4)
const minusOne = $(-1)
const minusFour = $(-4)
describe('functions', () => {
  describe('sum', () => {
    it('should sum', () => {
      expect(functions.add(one, two)).toEqual(three)
    })
  })
  describe('subrtact', () => {
    it('should subtract positive numbers', () => {
      expect(functions.subtract(three, two)).toEqual(one)
    })
    it('should subtract negative numbers', () => {
      expect(functions.subtract(two, minusOne)).toEqual(three)
    })
  })
  describe('multiply', () => {
    it('should subtract positive numbers', () => {
      expect(functions.multiply(two, two)).toEqual(four)
    })
    it('should subtract negative numbers', () => {
      expect(functions.multiply(two, minusFour)).toEqual($(-8))
    })
  })
  describe('protectedDivide', () => {
    it('should divide when divisor is not zero', () => {
      expect(functions.protectedDivide(four, two)).toEqual(two)
    })
    it('should return zero when divisor is zero', () => {
      expect(functions.protectedDivide(four, zero)).toEqual(zero)
    })
  })
  describe('min', () => {
    it('should return min', () => {
      expect(functions.min(one, two)).toEqual(one)
    })
  })
  describe('max', () => {
    it('should return max', () => {
      expect(functions.max(one, two)).toEqual(two)
    })
  })
  describe('exp', () => {
    it('should return exp for arg 1', () => {
      const e = functions.exp(one)
      expect(e.gt($('2.7'))).toBeTruthy()
      expect(e.lt($('2.72'))).toBeTruthy()
    })
    it('should return exp for arg 2', () => {
      const e2 = functions.exp(two)
      expect(e2.gt($('7.389'))).toBeTruthy()
      expect(e2.lt($('7.3891'))).toBeTruthy()
    })
  })
  describe('pow', () => {
    it('should work for positive exponenet', () => {
      expect(functions.pow(two, three)).toEqual($(8))
    })
    it('should work for negative exponenet', () => {
      expect(functions.pow(two, minusFour)).toEqual($('0.0625'))
    })
  })
  describe('protectedLog', () => {
    it('should work for positive base', () => {
      expect(functions.protectedLog(two, $(8))).toEqual(three)
    })
    it('should work for negative base', () => {
      expect(functions.protectedLog(minusFour, two)).toEqual(zero)
    })
    it('should work for base 1', () => {
      expect(functions.protectedLog(one, two)).toEqual(zero)
    })
    it('should work for negative parameter', () => {
      expect(functions.protectedLog(one, minusFour)).toEqual(zero)
    })
  })
  describe('sin & cos', () => {
    it('should work', () => {
      const radToDeg = (x) => (x * Math.PI) / 180
      const shouldBeCloseEnoughTo = (a, b) => {
        const delta = $('.000001')
        expect(a.lte(b.plus(delta))).toBeTruthy()
        expect(a.gte(b.minus(delta))).toBeTruthy()
      }
      const sinDeg = (x) => functions.sin($(radToDeg(x)))
      const cosDeg = (x) => functions.cos($(radToDeg(x)))
      shouldBeCloseEnoughTo(sinDeg(0), zero)
      shouldBeCloseEnoughTo(sinDeg(30), $(0.5))
      shouldBeCloseEnoughTo(sinDeg(45), $(2).sqrt().div(2))
      shouldBeCloseEnoughTo(sinDeg(60), $(3).sqrt().div(2))
      shouldBeCloseEnoughTo(sinDeg(90), $(1))
      shouldBeCloseEnoughTo(cosDeg(0), $(1))
      shouldBeCloseEnoughTo(cosDeg(30), $(3).sqrt().div(2))
      shouldBeCloseEnoughTo(cosDeg(45), $(2).sqrt().div(2))
      shouldBeCloseEnoughTo(cosDeg(60), $(0.5))
      shouldBeCloseEnoughTo(cosDeg(90), zero)
    })
  })
  describe('protectedSqrt', () => {
    it('should work for positive value', () => {
      expect(functions.protectedSqrt(four)).toEqual(two)
    })
    it('should work for positive value', () => {
      expect(functions.protectedSqrt(minusFour)).toEqual(two)
    })
  })
  describe('neg', () => {
    it('should work for positive value', () => {
      expect(functions.neg(four)).toEqual(minusFour)
    })
    it('should work for positive value', () => {
      expect(functions.neg(minusFour)).toEqual(four)
    })
  })
})
