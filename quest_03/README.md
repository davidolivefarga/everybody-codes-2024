# Quest 3: Mining Maestro

You can find the Quest [here](https://everybody.codes/event/2024/quests/3).

## Part I

### 🎯 Objective

We're given a grid with two types of tile:

-   `#`: mineable tile.
-   `.`: non-mineable tile.

Example:

```
..........
..###.##..
...####...
..######..
..######..
...####...
..........
```

A mineable tile can be mined many times, but only if the height difference between adjacent areas (left, right, top and bottom) is no more than one.

We want to find the amount of blocks that can be mined.

### 📜 Solution

The idea here is to start by counting the tiles that can only be mined once, which will be those tiles that are adjacent to a non-mineable tile. Then, we mark those positions as non-mineable. If we now look for the tiles that are adjacent to a non-mineable tile, we will find the tiles that can only be mined twice. We just need to repeat the process until there are no tiles that can be mined and keep count of the mined blocks in each step.

```js
function solve(notes) {
    const grid = notes.split(/\n/).map((r) => r.trim().split(""));

    let totalBlocks = 0;
    let layer = 1;
    let blocks;

    while ((blocks = mineBlocks(grid)) !== 0) {
        totalBlocks += blocks * layer;
        layer++;
    }

    return totalBlocks;
}

function mineBlocks(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    let minedBlocksPositions = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (
                grid[i][j] !== "." &&
                (grid[i - 1]?.[j] === "." ||
                    grid[i + 1]?.[j] === "." ||
                    grid[i][j - 1] === "." ||
                    grid[i][j + 1] === ".")
            ) {
                minedBlocksPositions.push([i, j]);
            }
        }
    }

    minedBlocksPositions.forEach(([i, j]) => {
        grid[i][j] = ".";
    });

    return minedBlocksPositions.length;
}
```

## Part II

### 🎯 Objective

Same objective as Part I, we're just given a bigger grid.

### 📜 Solution

Even if the grid is bigger the solution from Part I is performant enough, so the same solution applies.

## Part III

### 🎯 Objective

Again, we're given a grid with mineable and non-mineable tiles, but there's a few twists:

-   The grid will contain several mineable areas.
-   The height difference rule now applies to diagonally adjacent tiles as well.
-   The grid must be treated as if it was surrounded by an infinite amount of non-mineable tiles.

### 📜 Solution

The solution is essentially the same as Part I & II, we just need to adjust the condition that checks for adjacent non-mineable tiles.

```js
function solve(notes) {
    const grid = notes.split(/\n/).map((r) => r.trim().split(""));

    let totalBlocks = 0;
    let layer = 1;
    let blocks;

    while ((blocks = mineBlocks(grid)) !== 0) {
        totalBlocks += blocks * layer;
        layer++;
    }

    return totalBlocks;
}

function mineBlocks(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    let minedBlocksPositions = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (
                grid[i][j] !== "." &&
                (grid[i - 1]?.[j] !== "#" ||
                    grid[i + 1]?.[j] !== "#" ||
                    grid[i][j - 1] !== "#" ||
                    grid[i][j + 1] !== "#" ||
                    grid[i - 1]?.[j - 1] !== "#" ||
                    grid[i - 1]?.[j + 1] !== "#" ||
                    grid[i + 1]?.[j - 1] !== "#" ||
                    grid[i + 1]?.[j + 1] !== "#")
            ) {
                minedBlocksPositions.push([i, j]);
            }
        }
    }

    minedBlocksPositions.forEach(([i, j]) => {
        grid[i][j] = ".";
    });

    return minedBlocksPositions.length;
}
```
