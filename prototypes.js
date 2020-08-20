const functional = require('./functional')


const prototypes = () => {
  Object.prototype.map = function(lambda) {
    return functional.mapObj(this, lambda)
  }

  Object.prototype.reduce = function(lambda, startingValue) {
    return functional.reduceObj(this, lambda, startingValue)
  }

  Array.prototype.toObj = function(getKey, getValue=(val)=>val) {
    return functional.arrayToObj(this, getKey, getValue)
  }

  Object.prototype.toArray = function(transform=([key,value])=>[key,value]) {
    return functional.objToArray(this, transform)
  }
}


module.exports = prototypes

