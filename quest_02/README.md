# Quest 2: The Runes of Power

You can find the Quest [here](https://everybody.codes/event/2024/quests/2).

## Part I

### 🎯 Objective

We're given a list of unique words and a sentence.

Example:

```
WORDS:THE,OWE,MES,ROD,HER

AWAKEN THE POWER ADORNED WITH THE FLAMES BRIGHT IRE
```

We want to count all occurrences of any word within the sentence.

### 📜 Solution

The only tricky part here is to take care of potential overlaps (for example, the word `AAA` appears twice in the sentence `AAAA`).

If you, like me, enjoy using regexes for these type of situations, make sure to adjust the regex index to support overlapping matches.

```js
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
```

## Part II

### 🎯 Objective

This time we're also given a list of unique words, but now we have multiple sentences.

Example:

```
WORDS:THE,OWE,MES,ROD,HER,QAQ

AWAKEN THE POWE ADORNED WITH THE FLAMES BRIGHT IRE
THE FLAME SHIELDED THE HEART OF THE KINGS
POWE PO WER P OWE R
THERE IS THE END
QAQAQ
```

To make things more complicated, words can now appear in both directions (left-to-right and right-to-left).

We want to find the number of characters that make up the words that appear in any sentence.

### 📜 Solution

To account for the fact that words can appear in both directions, we can simply extend the initial word list by adding the reverse of all words.

Besides that, the only thing we need to worry about is to avoid counting the same character more than once whenever there's an overlap, but this can easily be addressed by keeping track of the visited characters on each sentence, for example using a set.

```js
function solve(notes) {
    const [rawWords, , ...rawSentences] = notes.split(/\n/);

    const words = rawWords.replace("WORDS:", "").trim().split(",");
    const sentences = rawSentences.map((s) => s.trim());

    words.push(...words.map((w) => w.split("").reverse().join("")));

    let symbolsInSentences = 0;

    for (const sentence of sentences) {
        symbolsInSentences += countSymbolsInSentence(sentence, words);
    }

    return symbolsInSentences;
}

function countSymbolsInSentence(sentence, words) {
    const symbolPositionsInSentence = new Set();

    for (const word of words) {
        const regex = new RegExp(word, "g");

        let match;

        while ((match = regex.exec(sentence))) {
            for (let i = 0; i < word.length; i++) {
                symbolPositionsInSentence.add(i + match.index);
            }

            regex.lastIndex = match.index + 1;
        }
    }

    return symbolPositionsInSentence.size;
}
```

## Part III

### ✍🏼 Input

Same as before, but this time the sentences are guaranteed to form a grid.

Example:

```
WORDS:THE,OWE,MES,ROD,RODEO

HELWORLT
ENIGWDXL
TRODEOAL
```

### 🎯 Objective

Again we're also given a list of unique words and a list of sentence, but this time the sentences form a grid.

Example:

```
WORDS:THE,OWE,MES,ROD,RODEO

HELWORLT
ENIGWDXL
TRODEOAL
```

Of course, there are a couple twists to make things more complicated:

-   Words can appear both horizontally and vertically in the grid: left-to-right, right-to-left, top-to-bottom and bottom-to-top.
-   The right edge of the grid connects with the left one, forming a cylinder.

We want to find the number of characters that make up the words that appear in the grid.

### 📜 Solution

Same idea as before, but we need a couple tricks to overcome the twists:

-   To take care of vertical words, we rotate the grid and look for word matches in this new grid. We just need to remember that rows and columns are swapped when we mark a grid position as visited.
-   To take care of the connection between the left and right edges when looking for horizontal words, instead of looking for words in each sentence we do it in a "fake" sentence consisting of the original sentence repeated twice. For example, if the sentence is `ABCD`, the fake sentence is `ABCDABCD`; this lets us find words like `CDAB`. We just need to remember to adjust the column to the original sentence when marking a position as visited.

```js
function solve(notes) {
    const [rawWords, , ...rawGrid] = notes.split(/\n/);

    const words = rawWords.replace("WORDS:", "").trim().split(",");
    const grid = rawGrid.map((s) => s.trim());

    words.push(...words.map((w) => w.split("").reverse().join("")));

    const symbolPositionsInGrid = new Set();

    addHorizontalMatchPositions(grid, words, symbolPositionsInGrid);
    addVerticalMatchPositions(grid, words, symbolPositionsInGrid);

    return symbolPositionsInGrid.size;
}

function addHorizontalMatchPositions(grid, words, symbolPositionsInGrid) {
    grid.forEach((sentence, row) => {
        const extendedSentence = sentence + sentence;

        for (const word of words) {
            const regex = new RegExp(word, "g");

            let match;

            while ((match = regex.exec(extendedSentence))) {
                for (let i = 0; i < word.length; i++) {
                    const colExtended = i + match.index;
                    const col = colExtended % sentence.length;

                    symbolPositionsInGrid.add(encodeGridPosition(row, col));
                }

                regex.lastIndex = match.index + 1;
            }
        }
    });
}

function addVerticalMatchPositions(grid, words, symbolPositionsInGrid) {
    const cols = grid[0].length;
    const rotatedGrid = new Array(cols).fill("");

    for (const sentence of grid) {
        for (let col = 0; col < cols; col++) {
            rotatedGrid[col] += sentence[col];
        }
    }

    rotatedGrid.forEach((sentence, row) => {
        for (const word of words) {
            const regex = new RegExp(word, "g");

            let match;

            while ((match = regex.exec(sentence))) {
                for (let i = 0; i < word.length; i++) {
                    const col = i + match.index;

                    symbolPositionsInGrid.add(encodeGridPosition(col, row));
                }

                regex.lastIndex = match.index + 1;
            }
        }
    });
}

function encodeGridPosition(row, column) {
    return `${row};${column}`;
}
```
