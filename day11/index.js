const { loadTxt, sortDesc } = require('../utils');
const input = loadTxt('./input.txt').split(/\r?\n\r?\n/);

function getNewItem(monkey, item, part, cp) {
  const value = monkey.value === 'old' ? item : Number(monkey.value);
  const newItem = monkey.operation === '+' ? item + value : item * value;
  return part === 1 ? Math.floor(newItem / 3) : newItem % cp;
}

function exec(numLoops, part = 1) {
  const monkeys = input.map((monkey) => {
    const lines = monkey.split(/\r?\n/);
    const items = lines[1].split(':')[1].split(',').map(x => Number(x.trim()));
    const [_,operation, value] = lines[2].split('=')[1].trim().split(' ');
    const divider = Number(lines[3].split(':')[1].split(' ')[3]);
    const ifTrue = Number(lines[4].trim().split(' ')[5]);
    const ifFalse = Number(lines[5].trim().split(' ')[5]);
    return { items, operation, value, divider, ifTrue, ifFalse, inspected: 0 };
  });
  const cp = monkeys.map(monkey => monkey.divider).reduce((p, c) => p * c, 1);
  for (let i = 0; i < numLoops; i += 1) {
    for (let j = 0; j < monkeys.length; j += 1) {
      const monkey = monkeys[j];
      while (monkey.items.length) {
        const newItem = getNewItem(monkey, monkey.items.pop(), part, cp);
        monkeys[newItem % monkey.divider === 0 ? monkey.ifTrue : monkey.ifFalse].items.push(newItem);
        monkey.inspected += 1;
      }
    }
  }
  const sorted = sortDesc(monkeys.map(x => x.inspected));
  return sorted[0] * sorted[1];
}

console.log(`Part 1: ${exec(20)}`);
console.log(`Part 2: ${exec(10000, 2)}`);
