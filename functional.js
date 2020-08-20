const recursion = (
  getState=(previousState, previousResult)=>previousState,
  shouldStop=(state)=>true,
  transform=(state, previousResult)=>{},
  previousResult=undefined,
  previousState=undefined,
  safety=true
) => {
  const newState = getState(previousState, previousResult)
  if (shouldStop(newState)) {
    return previousResult
  }

  const newResult = transform(newState, previousResult)

  /*
   The following prevents simple out of control recursions. 
   If the state isn't changing then there is a problem.
  */
  if (safety && previousState === newState) {
    return previousResult
  }

  return recursion(getState, shouldStop, transform, newResult, newState, safety)
}


const reduceObj = (obj, reduceFunc, startingValue) => {
  return mapObj(obj).reduce(reduceFunc, startingValue)
}


const mapObj = (obj, mappedFunc=(values)=>values) => {
  return Array.isArray(obj)
    ? obj.map(mappedFunc)
    : Object.keys(obj).map(key => {
      return mappedFunc([key, obj[key]])
    })
}


const arrayToObj = (array, getKey, getValue=(val)=>val) => {
  return array.reduce((acc, item) => {
    return {...acc, [getKey(item)]: getValue(item)}
  }, {})
}


const objToArray = (obj, transform=(item)=>item) => {
  return mapObj(obj).map(transform)
}


module.exports = {
  arrayToObj,
  mapObj,
  reduceObj,
  recursion,
  objToArray
}

