import { readInput } from "../input.mjs";

const input = readInput("quest_01/part_2_input.txt");

const potionsPerCreature = { A: 0, B: 1, C: 3, D: 5, x: 0 };
const extraPotionsPerGroup = { 0: 0, 1: 0, 2: 2 };

function solve(creatures) {
    let amountOfPotions = 0;

    for (let i = 0; i < creatures.length; i += 2) {
        amountOfPotions += potionsPerCreature[creatures[i]];
        amountOfPotions += potionsPerCreature[creatures[i + 1]];

        let group = 0;

        if (creatures[i] !== "x") group++;
        if (creatures[i + 1] !== "x") group++;

        amountOfPotions += extraPotionsPerGroup[group];
    }

    return amountOfPotions;
}

console.log(solve(input));
