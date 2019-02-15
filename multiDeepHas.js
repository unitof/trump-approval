const deepHas = require('object-has')

module.exports = function has(obj, ...props) {
  return props
  .map(prop => { return deepHas(obj, prop) }) // array of bools whether obj has each prop
  .every(hasProps => hasProps) // does it have them all?
}
