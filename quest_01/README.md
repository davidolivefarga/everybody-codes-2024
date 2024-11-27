# Quest 1: The Battle for the Farmlands

You can find the Quest [here](https://everybody.codes/event/2024/quests/1).

## Part I

### ✍🏼 Input

A list of creatures, each represented by a capital letter.

-   Creatures of type `A` require **0 healing potions** to be defeated.
-   Creatures of type `B` require **1 healing potions** to be defeated.
-   Creatures of type `C` require **3 healing potions** to be defeated.

Example:

```
ABBAC
```

### 🎯 Objective

Calculate the total amount of healing potions required to defeat all creatures.

### 📜 Solution

Straight-forward solution, nothing interesting to add.

```js
const potionsPerCreature = { A: 0, B: 1, C: 3 };

function solve(creatures) {
    let amountOfPotions = 0;

    for (creature of creatures) {
        amountOfPotions += potionsPerCreature[creature];
    }

    return amountOfPotions;
}
```

## Part II

### ✍🏼 Input

Same as before, but this time there's an additional creature type:

-   Creatures of type `D` require **5 healing potions** to be defeated\*.

Also, an `x` means an empty spot with no creature in it.

Example:

```
AxBCDDCAxD
```

### 🎯 Objective

Calculate the total amount of healing potions required to defeat all creatures.

However, there's a twist: the list must be interpreted in groups of 2. When a group contains 2 creatures, defeating them requires **1 extra healing potion per creature**.

### 📜 Solution

Straight-forward solution, the only thing worth mentioning is that the input guarantees that all groups will be complete (that is, `creatures.length % 2 === 0`). Otherwise, we would simply need to append `x` to the list until all groups are completed.

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

### ✍🏼 Input

Same as before.

Example:

```
xBxAAABCDxCC
```

### 🎯 Objective

Calculate the total amount of healing potions required to defeat all creatures.

Again, there's an extra twist: the list must be interpreted in groups of 3. As before, when a group contains 2 creatures, defeating them requires **1 extra healing potion per creature**. But if a group contains 3 creatures, defeating them requires **2 extra healing potions per creature**.

### 📜 Solution

Straight-forward solution, the only thing worth mentioning is that the input guarantees that all groups will be complete (that is, `creatures.length % 3 === 0`). Otherwise, we would simply need to append `x` to the list until all groups are completed.

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
