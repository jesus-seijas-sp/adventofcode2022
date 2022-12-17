const { loadLinesSplitted } = require('../utils');

const jets = loadLinesSplitted('./input.txt', '')[0];
const rocks = [['@@@@'], ['.@.', '@@@', '.@.'], ['..@', '..@', '@@@'], ['@', '@', '@', '@'], ['@@', '@@']];
const incZ = (x, z) => (x + 1) % z;

function move(grid, rock, dx, dy) {
  for (let y = 0; y < rock.bricks.length; y += 1) {
    for (let x = 0; x < rock.bricks[y].length; x += 1) {
      if (rock.bricks[y][x] === '@' && 
        (!grid[rock.y + y + dy] || grid[rock.y + y + dy][rock.x + x + dx] !== '.')) {
        return false;
      }
    }
  }
  rock.x += dx;
  rock.y += dy;
  return true;
}

function solve(numIters) {
  const grid = [];
  let rockIndex = 0; 
  let jetIndex = 0;
  const bookmark = [];
  const dict = {};
  let addHeight = 0;
  let useDict = true;
  let i = 0;
  while (i < numIters) {
    const rock = { bricks: rocks[rockIndex], x: 2, y: 0 }
    rockIndex = incZ(rockIndex, rocks.length);
    grid.unshift(...Array.from({ length: 3 + rock.bricks.length}, () => '.......'.split('')));
    let fixed = false;
    while (!fixed) {
      const jet = jets[jetIndex];
      jetIndex = incZ(jetIndex, jets.length);
      move(grid, rock, jet === '>' ? 1 : -1, 0);
      fixed = !move(grid, rock, 0, 1);
    }
    for (let y = 0; y < rock.bricks.length; y++) {
      for (let x = 0; x < rock.bricks[y].length; x++) {
        if (rock.bricks[y][x] === '@') grid[rock.y + y][rock.x + x] = '#';
      }
    }
    while (grid[0] && grid[0].every(b => b === '.')) grid.shift();
    if (useDict) {
      bookmark.push(`${rock.x}-${rock.y}`);
      while (bookmark.length > 9) bookmark.shift();
      const bookmarkStr = bookmark.join('-');
      const found = dict[bookmarkStr];
      if (found) {
        const loops = Math.floor((numIters - i) / (i - found.i));
        addHeight = loops * (grid.length - found.length);
        i += loops * (i - found.i);
        useDict = false; 
      } else {
        dict[bookmarkStr] = { i, length: grid.length };
      }
    }
    i += 1;
  }
  return grid.length + addHeight;
}

console.log(`Part 1: ${solve(2022)}`);
console.log(`Part 2: ${solve(1000000000000)}`);

