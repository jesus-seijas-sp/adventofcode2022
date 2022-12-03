const { loadLines } = require('../utils');

const getScore = chars => chars.reduce((p, c) => p + c.charCodeAt(0) - (c === c.toLowerCase() ? 96 : 38), 0);
const chars = loadLines('./input.txt').map(line => line.split(''));

const chars1 = chars.map(chars => [chars.slice(0, chars.length /2), chars.slice(-chars.length/2)])
  .map(([a, b]) => a.map(c => b.indexOf(c) === -1 ? undefined : c).filter(Boolean)[0]);
console.log(`Part 1: ${getScore(chars1)}`);

const chars2 = chars.map((_, index, data) => index % 3 ? undefined: data.slice(index, index + 3)).filter(Boolean)
  .map(([a, b, c]) => a.map(d => b.indexOf(d) === -1 || c.indexOf(d) === -1 ? undefined : d).filter(Boolean)[0]);
console.log(`Part 2: ${getScore(chars2)}`);
