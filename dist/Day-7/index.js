"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const file_reader_1 = require("../file-reader");
const day_seven_models_1 = require("./models/day-seven-models");
const ALL_CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
function main(filePath = 'src/Day-7/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, false).then((values) => {
        const handData = mapInputDataTo(values);
        partOne(handData);
        partTwo(handData);
    });
}
exports.main = main;
// Part One - START
function partOne(handData) {
    handData = handData.sort(sortByHandStrength);
    handData = handData.map((x, index) => ({ ...x, rank: index + 1 }));
    console.log('Part one:', handData.reduce((acc, curr) => acc + curr.bid * curr.rank, 0));
}
// Part One - END
// Part Two - START
function partTwo(handData) {
    for (let hand of handData) {
        hand.jokerHand = convertToBestHand(hand.cards);
    }
    handData = handData.sort((a, b) => sortByHandStrength(a, b, true));
    handData = handData.map((x, index) => ({ ...x, rank: index + 1 }));
    console.log('Part two:', handData.reduce((acc, curr) => acc + curr.bid * curr.rank, 0));
}
// Part Two - END
// Utility functions
function mapInputDataTo(inputData) {
    return inputData.split('\n').map((x) => {
        const splitData = x.split(' ');
        return {
            cards: splitData[0].trim(),
            bid: parseInt(splitData[1].trim())
        };
    });
}
function getHandStrength(hand, isJoker = false) {
    if (hasMatchingCharacters(isJoker ? hand.jokerHand : hand.cards, 5)) {
        return day_seven_models_1.HandStrength.FiveOfAKind;
    }
    if (hasMatchingCharacters(isJoker ? hand.jokerHand : hand.cards, 4)) {
        return day_seven_models_1.HandStrength.FourOfAKind;
    }
    if (hasMatchingCharacters(isJoker ? hand.jokerHand : hand.cards, 3) && hasMatchingCharacters(isJoker ? hand.jokerHand : hand.cards, 2)) {
        return day_seven_models_1.HandStrength.FullHouse;
    }
    if (hasMatchingCharacters(isJoker ? hand.jokerHand : hand.cards, 3)) {
        return day_seven_models_1.HandStrength.ThreeOfAKind;
    }
    if (hasMatchingCharacters(isJoker ? hand.jokerHand : hand.cards, 3)) {
        return day_seven_models_1.HandStrength.ThreeOfAKind;
    }
    if (hasMatchingCharacters(isJoker ? hand.jokerHand : hand.cards, 2, 2)) {
        return day_seven_models_1.HandStrength.TwoPairs;
    }
    if (hasMatchingCharacters(isJoker ? hand.jokerHand : hand.cards, 2)) {
        return day_seven_models_1.HandStrength.Pair;
    }
    return day_seven_models_1.HandStrength.HighCard;
}
function hasMatchingCharacters(handCards, matchCount, pairs = 1) {
    if (handCards.length !== 5) {
        return false;
    }
    const charCount = new Map();
    for (const card of handCards) {
        const count = charCount.get(card) || 0;
        charCount.set(card, count + 1);
    }
    let matchPairs = 0;
    for (const count of charCount.values()) {
        if (count === matchCount) {
            matchPairs++;
        }
    }
    return matchPairs >= pairs;
}
function sortByHandStrength(handA, handB, isJoker = false) {
    const sortValue = getHandStrength(handA, isJoker) - getHandStrength(handB, isJoker);
    if (sortValue !== 0) {
        return sortValue;
    }
    let allCards = [...ALL_CARDS];
    if (isJoker) {
        allCards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
    }
    return allCards.indexOf(handA.cards[0]) - allCards.indexOf(handB.cards[0]) ||
        allCards.indexOf(handA.cards[1]) - allCards.indexOf(handB.cards[1]) ||
        allCards.indexOf(handA.cards[2]) - allCards.indexOf(handB.cards[2]) ||
        allCards.indexOf(handA.cards[3]) - allCards.indexOf(handB.cards[3]) ||
        allCards.indexOf(handA.cards[4]) - allCards.indexOf(handB.cards[4]);
}
function convertToBestHand(hand) {
    const allCards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
    let strongestHand = hand;
    allCards.forEach((char) => {
        let newHand = hand.replace('J', char);
        if (newHand.includes('J')) {
            newHand = convertToBestHand(newHand);
        }
        if (sortByHandStrength({ cards: newHand, bid: 0 }, { cards: strongestHand, bid: 0 }) > 0) {
            strongestHand = newHand;
        }
    });
    return strongestHand;
}
