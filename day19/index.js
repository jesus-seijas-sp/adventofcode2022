const { loadLines, sum, range, mul } = require('../utils');

const input = loadLines('./input.txt');
const reg = /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./;
const blueprints = input.map((line) => {
  const values = reg.exec(line).slice(1).map(Number);
  return { id: values[0], costs: [[values[1], 0, 0], [values[2], 0, 0], [values[3], values[4], 0], [values[5], 0, values[6]]] };
});

const maxc = (arr, c) => Math.max(...arr.map(x => x[c]));
function solve(bp, maxTime) {
  const q = [{ mats: [0, 0, 0, 0], robots: [1, 0, 0, 0], time: 0 }];
  let result = 0;
  const maxBots = [maxc(bp, 0), maxc(bp, 1), maxc(bp, 2), Infinity];
  while (q.length > 0) {
    const { robots, mats, time } = q.pop();
    result = Math.max(result, mats[3] + robots[3] * (maxTime - time));
    if (time < maxTime) {
      mats.forEach((mat, i) => {
        if (mat < maxBots[i]) {
          const pending = range(3).reduce((p, c) => {
            const delta = bp[i][c] - mats[c];
            return delta === 0 ? p : Math.max(p, Math.ceil(delta / robots[c]));
          }, 0);
          if (pending < maxTime - time) {
            const state = { mats: [...mats], robots: [...robots], time: time + pending + 1 };
            range(4).forEach(j => state.mats[j] += robots[j] * (pending + 1) - (bp[i][j] || 0));
            state.robots[i] += 1;
            q.push(state);
          }
        }
      });
    }
  }
  return result;
}

console.log(`Part 1: ${sum(blueprints.map(bp => bp.id * solve(bp.costs, 24)))}`);
console.log(`Part 2: ${mul(blueprints.slice(0, 3).map(bp => solve(bp.costs, 32)))}`);