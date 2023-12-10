export interface HandData {
    cards: string;
    bid: number;
    jokerHand?: string;
    rank?: number;
}

export enum HandStrength {
    HighCard = 1,
    Pair = 2,
    TwoPairs = 3,
    ThreeOfAKind = 4,
    FullHouse = 5,
    FourOfAKind = 6,
    FiveOfAKind = 7
}