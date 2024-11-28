import { readInput } from "../input.mjs";

const input = readInput("quest_01/part_1_input.txt");

const potionsPerCreature = { A: 0, B: 1, C: 3 };

function solve(creatures) {
    let amountOfPotions = 0;

    for (const creature of creatures) {
        amountOfPotions += potionsPerCreature[creature];
    }

    return amountOfPotions;
}

console.log(solve(input));
