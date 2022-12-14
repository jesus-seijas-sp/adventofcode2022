const { loadLinesSplitted, range } = require('../utils');

const input = loadLinesSplitted('./input.txt').map(line => ({ cmd: line[0], num: Number(line[1] || 0)}));
let x = 1;
let t = 0;
let result = 0;
const display = range(6).map(() => Array(40).fill(' '));
const draw = () => {
  if (Math.abs(t % 40 - x) <= 1) {
    display[Math.floor(t / 40)][t % 40] = '█';
  }
}
const check = () => {
  draw();
  t += 1;
  if ([20, 60, 100, 140, 180, 220].includes(t)) {
    result += x * t;
  }
}
input.forEach(({ cmd, num}) => {
  check();
  if (cmd === 'addx') {
    check();
    x += num;
  }
});
console.log(result);
console.log(display.map(c => c.join('')).join('\n'));
