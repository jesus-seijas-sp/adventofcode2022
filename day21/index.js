const { loadLinesSplitted } = require('../utils');

const input = loadLinesSplitted('./input.txt', ':');
const ops = {
  '+': (a,b) => a + b,
  '-': (a,b) => a - b,
  '*': (a,b) => a * b,
  '/': (a,b) => a / b,
}

const monkeys = {}; 
input.forEach(line => {
  const [a, b, c] = line[1].trim().split(' ');
  monkeys[line[0]] =  () => b ? ops[b](monkeys[a](), monkeys[c]()) : Number(a);  
});

console.log(`Part 1: ${monkeys['root']()}`);

const [a,, c] = input.find(line => line[0] === 'root')[1].trim().split(' ');
monkeys['root'] = () => ops['-'](monkeys[c](), monkeys[a]());
let [min, max] = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
while (min < max) {
  const mid = (min + max) / 2;
  monkeys['humn'] = () => (mid);
  const result = monkeys['root']();
  if (result === 0) break;
  result < 0 ? min = mid : max = mid;
}
console.log(`Part 2: ${monkeys['humn']()}`);
