const assert = require('assert')
const {
  arrayToObj,
  mapObj,
  reduceObj,
  recursion,
  objToArray,
} = require('../functional')


describe('functional', function() {
  const dataObject = {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: 4
    }
  }

  const simpleObj = {
    a: 1,
    b: 2,
    c: 3,
  }

  const simpleArray = [
    "a",
    "b",
    "c"
  ]

  describe('#mapObj', () => {
    it('should map the key values to an array when no function argument is provided.', () => {
      const actual = mapObj(dataObject)
      const expected = [['a', 1], ['b', 2], ['c', {d: 3, e: 4}]]
      assert.deepEqual(actual, expected)
    })
    it('should use the provided function to map results.', () => {
      const actual = mapObj(dataObject, ([key,value]) => key)
      const expected = ['a', 'b', 'c']
      assert.deepEqual(actual, expected)
    })
    it('should handle an array passed in correctly', () => {
      const actual = mapObj(simpleArray, value => value)
      const expected = ["a", "b", "c"]
      assert.deepEqual(actual, expected)
    })
  })

  describe('#reduceObj', () => {
    it('should create the same dictionary as it started, when given the right reduce lambda.', () => {
      const actual = reduceObj(dataObject, (acc, [key, value]) => {
        return {...acc, [key]: value}
      }, {})

      assert.deepEqual(dataObject, actual)
    })

    it('should use the starting value provided.', () => {
      const actual = reduceObj(dataObject, (acc, [key, value]) => {
        return {...acc, [key]: value}
      }, {f: 5})
      const expected = {...dataObject, f: 5}

      assert.deepEqual(actual, expected)
    })
  })


  describe('#recursion', () => {
    it('can be called with no arguments and not cause a runaway loop.', () => {
      const expected = recursion()
      const actual = undefined
      assert.equal(actual, expected)
    })
    it('should work just like a reduce on an array.', () => {
      const data = [
        "A",
        "B",
        "C",
      ]

      const startingState = -1
      const startingResult = {}

      const getState = (idx, result) => {
        return idx === undefined
          ? 0
          : idx + 1
      }

      const shouldStop = (idx) => {
        return idx >= data.length
      }

      const transform = (idx, result) => {
        const value = data[idx]
        return {...result, [value]: `${value}${value}`}
      }

      const actual = recursion(getState, shouldStop, transform, startingResult, startingState)
      const expected = data.reduce((acc, value) => {
        return {...acc, [value]: `${value}${value}`}
      }, {})
      assert.deepEqual(actual, expected)
    })

    it('turning off safety, should make no difference with valid inputs.', () => {
      const data = [
        "A",
        "B",
        "C",
      ]

      const startingState = -1
      const startingResult = {}

      const getState = (idx, result) => {
        return idx === undefined
          ? 0
          : idx + 1
      }

      const shouldStop = (idx) => {
        return idx >= data.length
      }

      const transform = (idx, result) => {
        const value = data[idx]
        return {...result, [value]: `${value}${value}`}
      }

      const actual = recursion(getState, shouldStop, transform, startingResult, startingState, false)
      const expected = data.reduce((acc, value) => {
        return {...acc, [value]: `${value}${value}`}
      }, {})
      assert.deepEqual(actual, expected)
    })

    it('should kick out of recursion if the state does not change, if safety is set on.', () => {
      const data = [
        "A",
        "B",
        "C",
      ]

      const startingState = -1
      const startingResult = []

      const getState = (idx, previousResult) => {
        return 2 // State never changes.
      }

      const shouldStop = (idx) => {
        return idx >= data.length // This will never return true
      }

      const transform = (idx, result) => {
        return [...result, data[idx]]
      }

      const actual = recursion(getState, shouldStop, transform, startingResult, startingState, true)
      const expected = ["C"]
      assert.deepEqual(actual, expected)
    })

  })


  describe('#arrayToObj', () => {
    it('can turn a simple array of into an object', () => {
      const actual = arrayToObj(simpleArray, (item)=>item, value=>value)
      const expected = {a: "a", b: "b", c: "c"}
      assert.deepEqual(actual, expected)
    })

    it('does not require a getValue argument', () => {
      const actual = arrayToObj(simpleArray, (item)=>item)
      const expected = {a: "a", b: "b", c: "c"}
      assert.deepEqual(actual, expected)
    })

    it('transforms the value when a function is provided', () => {
      const actual = arrayToObj(simpleArray, item=>item, item=>`${item}${item}`)
      const expected = {a: "aa", b: "bb", c: "cc"}
      assert.deepEqual(actual, expected)
    })
  })


  describe('#objToArray', () => {
    it('can convert simpleObj into an array of ["a","b","c"]', () => {
      const actual = objToArray(simpleObj, ([key,value])=>key)
      const expected = ["a","b","c"]
      assert.deepEqual(actual, expected)
    })

    it('can handle an array passed in as expected.', () => {
      const actual = objToArray(simpleArray, value=>value)
      const expected = ["a","b","c"]
      assert.deepEqual(actual, expected)
    })

    it('does not require a transform.', () => {
      const actual = objToArray(simpleObj)
      const expected = [["a", 1],["b", 2],["c", 3]]
      assert.deepEqual(actual, expected)
    })
  })
})

