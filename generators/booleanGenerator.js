const randomNumber = require('./numberGenerator')
module.exports = () => {
  return ((randomNumber(1, 2) % 2) !== 0)
}
