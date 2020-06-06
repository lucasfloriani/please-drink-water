const stringToInt = text => parseInt(text, 10)
const isBetween = (value, min, max) => value >= min && value <= max

module.exports = {
  isBetween,
  stringToInt,
}