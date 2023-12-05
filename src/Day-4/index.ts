import { readTextFile } from "../file-reader";
import { CardData } from "./models/day-four-models";

export function main(filePath = 'src/Day-4/input.txt') {
    readTextFile(filePath, false).then((values) => {
        const cardData: CardData[] = convertDataToCardData(values);
        partOne(cardData);
        partTwo(cardData);
    });
}

function convertDataToCardData(data: string): CardData[] {
    let allCards: string[] = data.split('\n');
    allCards = allCards.map((card) => card.substring(card.indexOf(':') + 1, card.length));
    return allCards.map((card) => {
        const cardSections: string[] = card.split('|')
        return {
            winningNumbers: cardSections[0].replace(/\s\s+/g, ' ').trim().split(' ').map((num) => parseInt(num)),
            yourNumbers: cardSections[1].replace(/\s\s+/g, ' ').trim().split(' ').map((num) => parseInt(num))
        }
    });
}

// PART ONE -- START

function partOne(allCardData: CardData[]): void {
    const allScores = getAllScores(allCardData);
    console.log("Part One -", allScores.reduce((a, b) => a + b, 0));
}

function getAllScores(cardData: CardData[]): number[] {
    return cardData.map((card) => {
        return getScore(card);
    })
}

function getScore(card: CardData): number {
    let score: number = 0;
    for(let yourNum of card.yourNumbers) {
        if(card.winningNumbers.includes(yourNum)) {
           score = score === 0 ? 1 : score * 2;
        }
    }

    return score;
}

// PART ONE -- END
// ---------------------------------------------------------------------------------------------------------------------
// PART TWO -- START

function partTwo(allCardData: CardData[]): void {
    const cardCounts: number[] = allCardData.map(() => 0);

    for(let i = 0; i < allCardData.length; i++) {
        cardCounts[i] += 1;
        calculateAllScoresForCard(allCardData, cardCounts, i)
    }

    console.log("Part Two -", cardCounts.reduce((a, b) => a + b, 0));
}

function calculateAllScoresForCard(allCardData: CardData[], cardCounts: number[], index: number): void {
        const totalMatches = getTotalMatchingNumbers(allCardData[index]);
        for(let i = index+1; i <= totalMatches + index; i++) {
            cardCounts[i] += 1;
            calculateAllScoresForCard(allCardData, cardCounts, i)
        }
}

function getTotalMatchingNumbers(card: CardData): number {
    let totalMatch: number = 0;
    for (let yourNum of card.yourNumbers) {
        if (card.winningNumbers.includes(yourNum)) {
            totalMatch++;
        }
    }

    return totalMatch;
}

// PART TWO -- END