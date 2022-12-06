const { loadTxt } = require('../utils');

const input = loadTxt('./input.txt');
const indexDifferent = (str, length) => {
  for (let i = length; i < input.length; i += 1) {
    if ((new Set(str.substring(i - length, i))).size === length)
      return i;
  }
}
console.log(`Part1: ${indexDifferent(input, 4)}`);
console.log(`Part2: ${indexDifferent(input, 14)}`);
