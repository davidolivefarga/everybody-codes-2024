const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "part_3_input.txt"), "utf8");

function solve(notes) {
    const [rawWords, _, ...rawSentences] = notes.split(/\n/);

    const words = rawWords.replace("WORDS:", "").trim().split(",");
    const sentences = rawSentences.map((s) => s.trim());

    words.push(...words.map((w) => w.split("").reverse().join("")));

    const symbolPositionsInGrid = new Set();

    addHorizontalMatchPositions(sentences, words, symbolPositionsInGrid);
    addVerticalMatchPositions(sentences, words, symbolPositionsInGrid);

    return symbolPositionsInGrid.size;
}

function addHorizontalMatchPositions(sentences, words, symbolPositionsInGrid) {
    sentences.forEach((sentence, row) => {
        const extendedSentence = sentence + sentence;

        for (let word of words) {
            const regex = new RegExp(word, "g");

            let match;

            while ((match = regex.exec(extendedSentence))) {
                for (let i = 0; i < word.length; i++) {
                    const colExtended = i + match.index;
                    const col = colExtended % sentence.length;

                    symbolPositionsInGrid.add(encode(row, col));
                }

                regex.lastIndex = match.index + 1;
            }
        }
    });
}

function addVerticalMatchPositions(sentences, words, symbolPositionsInGrid) {
    const rows = sentences.length;
    const cols = sentences[0].length;

    const rotatedSentences = new Array(cols).fill("");

    sentences.forEach((sentence, row) => {
        for (let col = 0; col < cols; col++) {
            rotatedSentences[col] += sentence[col];
        }
    });

    rotatedSentences.forEach((sentence, row) => {
        for (let word of words) {
            const regex = new RegExp(word, "g");

            let match;

            while ((match = regex.exec(sentence))) {
                for (let i = 0; i < word.length; i++) {
                    const col = i + match.index;

                    symbolPositionsInGrid.add(encode(col, row));
                }

                regex.lastIndex = match.index + 1;
            }
        }
    });
}

function encode(row, column) {
    return `${row};${column}`;
}

console.log(solve(input));
