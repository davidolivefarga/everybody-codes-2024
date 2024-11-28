import { readInput } from "../input.mjs";

const input = readInput("quest_02/part_1_input.txt");

function solve(notes) {
    const [rawWords, , rawSentence] = notes.split(/\n/);

    const words = rawWords.replace("WORDS:", "").trim().split(",");
    const sentence = rawSentence.trim();

    let wordsInSentence = 0;

    for (const word of words) {
        const regex = new RegExp(word, "g");

        let match;

        while ((match = regex.exec(sentence))) {
            wordsInSentence++;

            regex.lastIndex = match.index + 1;
        }
    }

    return wordsInSentence;
}

console.log(solve(input));
