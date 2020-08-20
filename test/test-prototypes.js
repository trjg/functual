const assert = require('assert')
require('../prototypes')() 


describe('prototypes', function() {
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

  describe('#map', () => {
    it('should map the key values to an array when no function argument is provided.', () => {
      const actual = dataObject.map()
      const expected = [['a', 1], ['b', 2], ['c', {d: 3, e: 4}]]
      assert.deepEqual(actual, expected)
    })
    it('should use the provided function to map results.', () => {
      const actual = dataObject.map(([key,value]) => key)
      const expected = ['a', 'b', 'c']
      assert.deepEqual(actual, expected)
    })
    it('should handle an array passed in correctly', () => {
      const actual = simpleArray.map(value => value)
      const expected = ["a", "b", "c"]
      assert.deepEqual(actual, expected)
    })
  })


  describe('#reduce', () => {
    it('should create the same dictionary as it started, when given the right reduce lambda.', () => {
      const actual = dataObject.reduce((acc, [key, value]) => {
        return {...acc, [key]: value}
      }, {})
    
      assert.deepEqual(dataObject, actual)
    })

    it('should use the starting value provided.', () => {
      const actual = dataObject.reduce((acc, [key, value]) => {
        return {...acc, [key]: value}
      }, {f: 5})
      const expected = {...dataObject, f: 5}

      assert.deepEqual(actual, expected)
    })
  })


  describe('#toObj', () => {
    it('can turn a simple array of into an object', () => {
      const actual = simpleArray.toObj(item=>item, item=>item)
      const expected = {a: "a", b: "b", c: "c"}
      assert.deepEqual(actual, expected)
    })
    it('does not require a getValue argument', () => {
      const actual = simpleArray.toObj(item=>item)
      const expected = {a: "a", b: "b", c: "c"}
      assert.deepEqual(actual, expected)
    })

    it('transforms the value when a function is provided', () => {
      const actual = simpleArray.toObj(item=>item, item=>`${item}${item}`)
      const expected = {a: "aa", b: "bb", c: "cc"}
      assert.deepEqual(actual, expected)
    })
  })


  describe('#toArray', () => {
    it('can convert simpleObj into an array of ["a","b","c"]', () => {
      const actual = simpleObj.toArray(([key,value])=>key)
      const expected = ["a","b","c"]
      assert.deepEqual(actual, expected)
    })
    it('can handle an array passed in as expected.', () => {
      const actual = simpleArray.toArray(value=>value)
      const expected = ["a","b","c"]
      assert.deepEqual(actual, expected)
    })
    it('does not require a transform.', () => {
      const actual = simpleObj.toArray()
      const expected = [["a", 1],["b", 2],["c", 3]]
      assert.deepEqual(actual, expected)
    })
  })

})

