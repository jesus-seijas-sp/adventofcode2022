const { loadTxt } = require('../utils');

const input = loadTxt('./input.txt');
function indexDifferent(input, amount) {
  for (let i = amount; i < input.length; i += 1) {
    if ((new Set(input.substring(i - amount, i))).size === amount)
      return i;
  }
}
console.log(`Part1: ${indexDifferent(input, 4)}`)
console.log(`Part2: ${indexDifferent(input, 14)}`)
