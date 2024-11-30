import { readInput } from "../input.mjs";

const input = readInput("quest_04/part_3_input.txt");

function solve(notes) {
    const nails = notes.split(/\n/).map(Number);

    nails.sort();

    const medianNail = nails[nails.length >> 1];

    return nails.reduce(
        (strikes, nail) => strikes + Math.abs(nail - medianNail),
        0
    );
}

console.log(solve(input));
