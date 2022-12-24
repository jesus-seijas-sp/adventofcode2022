const { loadLines } = require('../utils');

const lines = loadLines('./input.txt');
const input = lines.slice(0, -2);

const maxCols = Math.max(...lines.slice(0, -2).map(line => line.length));
const map = input.map((line) => {
  const row = line.split('');
  while (row.length < maxCols) row.push(' ');
  return row;
});
const inc = { '>': [1, 0, 0], 'v': [0, 1, 1], '<': [-1, 0, 2], '^': [0, -1, 3] };
const rotations = { L: { '>': '^', 'v': '>', '<': 'v', '^': '<' }, R: { '>': 'v', 'v': '<', '<': '^', '^': '>' }};
const movements = lines[lines.length - 1].match(/[a-zA-Z]+|[0-9]+/g).map(x => ['L', 'R'].includes(x) ? x : Number(x));
const dice = Array.from({ length: map.length }, () => Array(maxCols));
for (let side = 0; side <= 5; side++)
  for (let row = 0; row < 50; row++)
    for (let col = 0; col < 50; col++)
      dice[row + [0, 0, 50, 100, 100, 150][side]][col + [50, 100, 50, 0, 50, 0][side]] = side + 1;
const getValue = (map, pos) => map[pos.row] ? map[pos.row][pos.col] || ' ' : ' ';

const next1 = (p) => {
  let pos = { ...p };
  const step = () => {
    pos.row += inc[p.dir][1];
    pos.col += inc[p.dir][0];
    if (pos.col >= maxCols) pos.col = 0;
    if (pos.row >= map.length) pos.row = 0;
    if (pos.col < 0) pos.col = maxCols - 1;
    if (pos.row < 0) pos.row = map.length - 1;
  }
  do {
    step()
  } while (getValue(map, pos) === ' ');
  return pos;
}

function apply(pos, dir, row, col) {
  pos.dir = dir;
  pos.row = row;
  pos.col = col;
  return pos;
}

const next2 = (p) => {
  const pos = { dir: p.dir, row: p.row + inc[p.dir][1], col: p.col + inc[p.dir][0] };
  if (getValue(dice, pos) !== ' ') {
    return pos;
  }
  switch (`${getValue(dice, p)}${pos.dir}`) {
    case '1^': return apply(pos, '>', 100 + p.row, 0);
    case '1<': return apply(pos, '>', 149 - p.row, 0);
    case '2^': return apply(pos, '^', 199, p.col - 100);
    case '2>': return apply(pos, '<', 149 - p.row, 99); 
    case '2v': return apply(pos, '<', p.col - 50, 99);
    case '3>': return apply(pos, '^', 49, p.row - 50);
    case '3<': return apply(pos, 'v', 100, p.row - 50);
    case '4<': return apply(pos, '>', 149 - p.row, 50);
    case '4^': return apply(pos, '>', p.col + 50, 50);
    case '5>': return apply(pos, '<', 149 - p.row, 149);
    case '5v': return apply(pos, '<', p.col + 100, 49);
    case '6v': return apply(pos, 'v', 0, p.col + 100);
    case '6>': return apply(pos, '^', 149, p.row - 100);
    case '6<': return apply(pos, 'v', 0, p.row - 100);
    default: return pos;
  }
}

const run = (fn) => {
  let pos = { dir: '>', col: map[0].indexOf('.'), row: 0 }
  movements.forEach(movement => {
    if (typeof movement === 'number') {
      while (getValue(map, fn(pos)) === '.' && movement) {
        movement -= 1;
        pos = fn(pos);
      }
    } else {
      pos.dir = rotations[movement][pos.dir]
    }
  });
  return (pos.row + 1) * 1000 + (pos.col + 1) * 4 + inc[pos.dir][2];
}

console.log(`Part 1: ${run(next1)}`);
console.log(`Part 2: ${run(next2)}`); 