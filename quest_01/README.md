# Quest 1: The Battle for the Farmlands

You can find the Quest [here](https://everybody.codes/event/2024/quests/1).

## Part I

### 🎯 Objective

We're given a list of creatures, each represented by a capital letter.

For example:

```
ABBAC
```

Each creature requires a different amount of healing potions to be defeated:

-   Creatures of type `A` require **0 healing potions** to be defeated.
-   Creatures of type `B` require **1 healing potions** to be defeated.
-   Creatures of type `C` require **3 healing potions** to be defeated.

We want to calculate the amount of healing potions required to defeat all creatures.

### 📜 Solution

Straight-forward solution, nothing interesting to add.

```js
const potionsPerCreature = { A: 0, B: 1, C: 3 };

function solve(creatures) {
    let amountOfPotions = 0;

    for (const creature of creatures) {
        amountOfPotions += potionsPerCreature[creature];
    }

    return amountOfPotions;
}
```

## Part II

### 🎯 Objective

Again, we're given a list of creatures.

Example:

```
AxBCDDCAxD
```

This time there are two new possible types of creature:

-   Creatures of type `D` require **5 healing potions** to be defeated.
-   An `x` indicates an empty spot with no creature in it.

Also, the list must now be interpreted in pairs. If a pair contains 2 creatures, defeating them requires **1 extra healing potion per creature**.

We want to calculate the amount of healing potions required to defeat all creatures.

### 📜 Solution

Straight-forward solution, the only thing worth mentioning is that the input is guaranteed to have complete pairs (that is, `creatures.length % 2 === 0`). Otherwise, we would simply need to append `x` to the list until all groups are completed.

```js
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
```

## Part III

### 🎯 Objective

Again, we're given a list of creatures.

Example:

```
xBxAAABCDxCC
```

This time the list must be interpreted in groups of 3.

-   If a group contains 2 creatures, defeating them requires **1 extra healing potion per creature**.
-   If a group contains 3 creatures, defeating them requires **2 extra healing potions per creature**.

We want to calculate the amount of healing potions required to defeat all creatures.

### 📜 Solution

Straight-forward solution, the only thing worth mentioning is that the input is guaranteed to have complete groups (that is, `creatures.length % 3 === 0`). Otherwise, we would simply need to append `x` to the list until all groups are completed.

```js
const potionsPerCreature = { A: 0, B: 1, C: 3, D: 5, x: 0 };
const extraPotionsPerGroup = { 0: 0, 1: 0, 2: 2, 3: 6 };

function solve(creatures) {
    let amountOfPotions = 0;

    for (let i = 0; i < creatures.length; i += 3) {
        amountOfPotions += potionsPerCreature[creatures[i]];
        amountOfPotions += potionsPerCreature[creatures[i + 1]];
        amountOfPotions += potionsPerCreature[creatures[i + 2]];

        let group = 0;

        if (creatures[i] !== "x") group++;
        if (creatures[i + 1] !== "x") group++;
        if (creatures[i + 2] !== "x") group++;

        amountOfPotions += extraPotionsPerGroup[group];
    }

    return amountOfPotions;
}
```
