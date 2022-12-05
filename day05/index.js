const { loadLines } = require('../utils');

const lines = loadLines('./input.txt');

const getLineCrates = (line) => line.match(/.{1,4}/g).reduce((p, c, index) => (c[1] !== ' ' && p.push({ index, crate: c[1] }), p), []);

let cursor = 0;
const crates = [];
while (lines[cursor] !== '') {
  const line = lines[cursor];
  if (line.indexOf('[') !== -1) {
    const lineCrates = getLineCrates(line);
    for (let i = 0; i < lineCrates.length; i += 1) {
      const current = lineCrates[i];
      crates[current.index] ??= [];
      crates[current.index].push(current.crate);
    }
  }
  cursor += 1;
}
cursor += 1;
const crates2 = [...crates.map(x => [...x])];
while (cursor < lines.length) {
  const [,howMany,,from,,to] = lines[cursor].split(' ').map(Number);
  const toMove = [];
  for (let i = 0; i < howMany; i += 1) {
    crates[to - 1].unshift(crates[from - 1].shift());
    toMove.unshift(crates2[from - 1].shift());
  }
  for (let i = 0; i < howMany; i += 1) {
    crates2[to - 1].unshift(toMove.shift());
  }
  cursor += 1;
}

console.log(crates.map(x => x[0]).join(''));
console.log(crates2.map(x => x[0]).join(''));
