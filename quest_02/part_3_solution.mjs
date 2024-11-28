import { readInput } from "../input.mjs";

const input = readInput("quest_02/part_3_input.txt");

function solve(notes) {
    const [rawWords, , ...rawGrid] = notes.split(/\n/);

    const words = rawWords.replace("WORDS:", "").trim().split(",");
    const grid = rawGrid.map((s) => s.trim());

    words.push(...words.map((w) => w.split("").reverse().join("")));

    const symbolPositionsInGrid = new Set();

    addHorizontalMatchPositions(grid, words, symbolPositionsInGrid);
    addVerticalMatchPositions(grid, words, symbolPositionsInGrid);

    return symbolPositionsInGrid.size;
}

function addHorizontalMatchPositions(grid, words, symbolPositionsInGrid) {
    grid.forEach((sentence, row) => {
        const extendedSentence = sentence + sentence;

        for (const word of words) {
            const regex = new RegExp(word, "g");

            let match;

            while ((match = regex.exec(extendedSentence))) {
                for (let i = 0; i < word.length; i++) {
                    const colExtended = i + match.index;
                    const col = colExtended % sentence.length;

                    symbolPositionsInGrid.add(encodeGridPosition(row, col));
                }

                regex.lastIndex = match.index + 1;
            }
        }
    });
}

function addVerticalMatchPositions(grid, words, symbolPositionsInGrid) {
    const cols = grid[0].length;
    const rotatedGrid = new Array(cols).fill("");

    for (const sentence of grid) {
        for (let col = 0; col < cols; col++) {
            rotatedGrid[col] += sentence[col];
        }
    }

    rotatedGrid.forEach((sentence, row) => {
        for (const word of words) {
            const regex = new RegExp(word, "g");

            let match;

            while ((match = regex.exec(sentence))) {
                for (let i = 0; i < word.length; i++) {
                    const col = i + match.index;

                    symbolPositionsInGrid.add(encodeGridPosition(col, row));
                }

                regex.lastIndex = match.index + 1;
            }
        }
    });
}

function encodeGridPosition(row, column) {
    return `${row};${column}`;
}

console.log(solve(input));
