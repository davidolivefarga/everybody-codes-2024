# Quest 2: The Runes of Power

You can find the Quest [here](https://everybody.codes/event/2024/quests/2).

## Part I

### ✍🏼 Input

Some notes containing a list of words and a sentence.

Example:

```
WORDS:THE,OWE,MES,ROD,HER

AWAKEN THE POWER ADORNED WITH THE FLAMES BRIGHT IRE
```

### 🎯 Objective

Count the occurences of a word in the sentence.

### 📜 Solution

Straight-forward solution, nothing interesting to add.

I'm not considering overlaps because they are not needed for this part.

```js
function solve(notes) {
    const words = notes.split(/\n/)[0].replace("WORDS:", "").trim().split(",");
    const sentence = notes.split(/\n/)[2];

    let wordsInSentence = 0;

    for (let word of words) {
        wordsInSentence += sentence.split(word).length - 1;
    }

    return wordsInSentence;
}
```

## Part II

### ✍🏼 Input

Same as before, but this time we have multiple sentences.

Example:

```
WORDS:THE,OWE,MES,ROD,HER,QAQ

AWAKEN THE POWE ADORNED WITH THE FLAMES BRIGHT IRE
THE FLAME SHIELDED THE HEART OF THE KINGS
POWE PO WER P OWE R
THERE IS THE END
QAQAQ
```

### 🎯 Objective

For each sentence, count the number of characters that make up the words that appear on it. This time, words can appear in both directions.

Find the total amount of characters across all sentences.

### 📜 Solution

This time is a bit more tricky, because there will be overlaps... But this can easily be addressed by keeping track of the visited positions, to avoid counting them more than once.

To account for the fact that words can appear in both directions, I'm simply extending the initial word list by adding the reverse of all words.

```js
function solve(notes) {
    const [rawWords, _, ...rawSentences] = notes.split(/\n/);

    const words = rawWords.replace("WORDS:", "").trim().split(",");
    const sentences = rawSentences.map((s) => s.trim());

    words.push(...words.map((w) => w.split("").reverse().join("")));

    let symbolsInSentences = 0;

    for (let sentence of sentences) {
        symbolsInSentences += countSymbolsInSentence(sentence, words);
    }

    return symbolsInSentences;
}

function countSymbolsInSentence(sentence, words) {
    const symbolPositionsInSentence = new Set();

    for (let word of words) {
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

Same as before, we want to count the number of characters that make up the words that appear on it, but there's a couple twists:

-   Words can appear horizontally and vertically in the grid: left to right, right to left, top to bottom, bottom to top
-   The right edge of the grid connects with the left one, forming a cylinder

### 📜 Solution

The core idea is the same as before, but we need a couple tricks to overcome the twists:

-   To take care of vertical words, we simply rotate the grid and look for words in this new grid. We just need to remember that rows and columns are swapped when we mark a position as visited.
-   To take care of the connection between the left and right edges when looking for horizontal words, we can simply extend each row by duplicating it. We just need to remember to adjust the column to the real row when marking a position as visited.

```js
function solve(notes) {
    const [rawWords, _, ...rawSentences] = notes.split(/\n/);

    const words = rawWords.replace("WORDS:", "").trim().split(",");
    const sentences = rawSentences.map((s) => s.trim());

    words.push(...words.map((w) => w.split("").reverse().join("")));

    const symbolPositionsInGrid = new Set();

    addHorizontalMatchPositions(sentences, words, symbolPositionsInGrid);
    addVerticalMatchPositions(sentences, words, symbolPositionsInGrid);

    return symbolPositionsInGrid.size;
}

function addHorizontalMatchPositions(sentences, words, symbolPositionsInGrid) {
    sentences.forEach((sentence, row) => {
        const extendedSentence = sentence + sentence;

        for (let word of words) {
            const regex = new RegExp(word, "g");

            let match;

            while ((match = regex.exec(extendedSentence))) {
                for (let i = 0; i < word.length; i++) {
                    const colExtended = i + match.index;
                    const col = colExtended % sentence.length;

                    symbolPositionsInGrid.add(encode(row, col));
                }

                regex.lastIndex = match.index + 1;
            }
        }
    });
}

function addVerticalMatchPositions(sentences, words, symbolPositionsInGrid) {
    const rows = sentences.length;
    const cols = sentences[0].length;

    const rotatedSentences = new Array(cols).fill("");

    sentences.forEach((sentence, row) => {
        for (let col = 0; col < cols; col++) {
            rotatedSentences[col] += sentence[col];
        }
    });

    rotatedSentences.forEach((sentence, row) => {
        for (let word of words) {
            const regex = new RegExp(word, "g");

            let match;

            while ((match = regex.exec(sentence))) {
                for (let i = 0; i < word.length; i++) {
                    const col = i + match.index;

                    symbolPositionsInGrid.add(encode(col, row));
                }

                regex.lastIndex = match.index + 1;
            }
        }
    });
}

function encode(row, column) {
    return `${row};${column}`;
}
```
