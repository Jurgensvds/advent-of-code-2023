"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const file_reader_1 = require("../file-reader");
function main(filePath = 'src/Day-4/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, false).then((values) => {
        const cardData = convertDataToCardData(values);
        partOne(cardData);
        partTwo(cardData);
    });
}
exports.main = main;
function convertDataToCardData(data) {
    let allCards = data.split('\n');
    allCards = allCards.map((card) => card.substring(card.indexOf(':') + 1, card.length));
    return allCards.map((card) => {
        const cardSections = card.split('|');
        return {
            winningNumbers: cardSections[0].replace(/\s\s+/g, ' ').trim().split(' ').map((num) => parseInt(num)),
            yourNumbers: cardSections[1].replace(/\s\s+/g, ' ').trim().split(' ').map((num) => parseInt(num))
        };
    });
}
// PART ONE -- START
function partOne(allCardData) {
    const allScores = getAllScores(allCardData);
    console.log("Part One -", allScores.reduce((a, b) => a + b, 0));
}
function getAllScores(cardData) {
    return cardData.map((card) => {
        return getScore(card);
    });
}
function getScore(card) {
    let score = 0;
    for (let yourNum of card.yourNumbers) {
        if (card.winningNumbers.includes(yourNum)) {
            score = score === 0 ? 1 : score * 2;
        }
    }
    return score;
}
// PART ONE -- END
// ---------------------------------------------------------------------------------------------------------------------
// PART TWO -- START
function partTwo(allCardData) {
    const cardCounts = allCardData.map(() => 0);
    for (let i = 0; i < allCardData.length; i++) {
        cardCounts[i] += 1;
        calculateAllScoresForCard(allCardData, cardCounts, i);
    }
    console.log("Part Two -", cardCounts.reduce((a, b) => a + b, 0));
}
function calculateAllScoresForCard(allCardData, cardCounts, index) {
    const totalMatches = getTotalMatchingNumbers(allCardData[index]);
    for (let i = index + 1; i <= totalMatches + index; i++) {
        cardCounts[i] += 1;
        calculateAllScoresForCard(allCardData, cardCounts, i);
    }
}
function getTotalMatchingNumbers(card) {
    let totalMatch = 0;
    for (let yourNum of card.yourNumbers) {
        if (card.winningNumbers.includes(yourNum)) {
            totalMatch++;
        }
    }
    return totalMatch;
}
// PART TWO -- END
