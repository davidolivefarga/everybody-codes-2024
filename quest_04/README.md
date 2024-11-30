# Quest 4: Royal Smith's Puzzle

You can find the Quest [here](https://everybody.codes/event/2024/quests/4).

## Part I

### 🎯 Objective

We're given a list of nails, each nail represented by its height from the surface.

Example:

```
3
4
7
8
```

We have a hammer that each time it strikes a nail, it drives it 1 unit of height deeper into the surface.

We want to find the amount of strikes required to make the nails form a perfectly straight line.

### 📜 Solution

Straight-forward solution, nothing interesting to add.

```js
function solve(notes) {
    const nails = notes.split(/\n/).map(Number);
    const smallestNail = Math.min(...nails);

    return nails.reduce((strikes, nail) => strikes + nail - smallestNail, 0);
}
```

## Part II

### 🎯 Objective

Same objective as Part I, we just have bigger nails.

### 📜 Solution

Same solution as Part I.

## Part III

### 🎯 Objective

Again, we're given a list of nails represented by their height, but this time the hammer is special. With each strike, we can either push the nail 1 one unit of height into the surface or we can pull it 1 one unit of height from the surface (we can assume the nails are pushed infinitely deep into the surface).

We also want to find the amount of strikes required to make the nails form a perfectly straight line.

### 📜 Solution

If before we used the smallest nail as the reference for the others, this time we need to use the [median](https://en.wikipedia.org/wiki/Median) nail, because the median minimizes the mean absolute error, which means that it minimizes the amount of strikes needed to align the nails.

It is very important to not confuse it with the [mean](https://en.wikipedia.org/wiki/Arithmetic_mean), because the mean is heavily affected by skewed data sets. For example, if our nails are `[1, 1,1, 97]` and use the mean (25) as the reference we will need 144 strikes, but if we use the median (1) as the reference we will need only 96 strikes.

```js
function solve(notes) {
    const nails = notes.split(/\n/).map(Number);

    nails.sort();

    const medianNail = nails[nails.length >> 1];

    return nails.reduce(
        (strikes, nail) => strikes + Math.abs(nail - medianNail),
        0
    );
}
```
