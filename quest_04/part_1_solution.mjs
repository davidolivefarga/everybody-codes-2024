import { readInput } from "../input.mjs";

const input = readInput("quest_04/part_1_input.txt");

function solve(notes) {
    const nails = notes.split(/\n/).map(Number);
    const smallestNail = Math.min(...nails);

    return nails.reduce((strikes, nail) => strikes + nail - smallestNail, 0);
}

console.log(solve(input));
