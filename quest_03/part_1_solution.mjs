import { readInput } from "../input.mjs";

const input = readInput("quest_03/part_1_input.txt");

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

console.log(solve(input));
