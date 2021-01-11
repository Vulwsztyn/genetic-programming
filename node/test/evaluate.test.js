const functions = require('../functions')
const { specimenEvaluator } = require('../evaluate')
const evaluate = specimenEvaluator(functions)
const { $ } = require('../shared')
describe('evaluate', () => {
  it('should evaluate', () => {
    const specimen = {
      name: 'multiply',
      type: 'F',
      children: [
        {
          name: 'add',
          type: 'F',
          children: [
            {
              type: 'T',
              value: 1,
            },
            {
              type: 'T',
              value: 'x',
            },
          ],
        },
        {
          name: 'neg',
          type: 'F',
          children: [
            {
              type: 'T',
              value: 'y',
            },
          ],
        },
      ],
    }
    expect(evaluate({ x: 2, y: 4 }, specimen)).toEqual($(-12))
  })
})
