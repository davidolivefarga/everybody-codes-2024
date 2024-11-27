const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "part_1_input.txt"), "utf8");

const potionsPerCreature = { A: 0, B: 1, C: 3 };

function solve(creatures) {
    let amountOfPotions = 0;

    for (creature of creatures) {
        amountOfPotions += potionsPerCreature[creature];
    }

    return amountOfPotions;
}

console.log(solve(input));
