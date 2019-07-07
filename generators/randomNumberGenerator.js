module.exports = (min = 1, max = 20) => {
  return Math.floor(Math.random() * (+max - +min)) + +min
}
