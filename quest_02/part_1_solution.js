const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "part_1_input.txt"), "utf8");

function solve(notes) {
    const words = notes.split(/\n/)[0].replace("WORDS:", "").trim().split(",");
    const sentence = notes.split(/\n/)[2];

    let wordsInSentence = 0;

    for (let word of words) {
        wordsInSentence += sentence.split(word).length - 1;
    }

    return wordsInSentence;
}

console.log(solve(input));
