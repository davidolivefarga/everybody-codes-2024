const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "part_2_input.txt"), "utf8");

function solve(notes) {
    const [rawWords, _, ...rawSentences] = notes.split(/\n/);

    const words = rawWords.replace("WORDS:", "").trim().split(",");
    const sentences = rawSentences.map((s) => s.trim());

    words.push(...words.map((w) => w.split("").reverse().join("")));

    let symbolsInSentences = 0;

    for (let sentence of sentences) {
        symbolsInSentences += countSymbolsInSentence(sentence, words);
    }

    return symbolsInSentences;
}

function countSymbolsInSentence(sentence, words) {
    const symbolPositionsInSentence = new Set();

    for (let word of words) {
        const regex = new RegExp(word, "g");

        let match;

        while ((match = regex.exec(sentence))) {
            for (let i = 0; i < word.length; i++) {
                symbolPositionsInSentence.add(i + match.index);
            }

            regex.lastIndex = match.index + 1;
        }
    }

    return symbolPositionsInSentence.size;
}

console.log(solve(input));
