import { readTextFile } from "../file-reader";
import { CubeSet, GameSet } from "./models/day-two-models";

const LOADED_BAG: CubeSet = {
    blue: 14,
    green: 13,
    red: 12
}

export function main(filePath = 'src/Day-2/input.txt') {
    readTextFile(filePath, false).then((values) => {
        partOne(values);
        partTwo(values)
    });
}

function partOne(data: string): void {
    const gameSets: GameSet[] = convertDataToGameSets(data);
    console.log("Part One - ", getPlayableGamesScore(gameSets));
}

function partTwo(data: string): void {
    const gameSets: GameSet[] = convertDataToGameSets(data);
    const lowestNumberOfCubesSets: CubeSet[] = getLowestNumberOfCubesSets(gameSets);
    const multipliedCubes: number[] = lowestNumberOfCubesSets.map((set) => set.blue * set.green * set.red);
    const sumOfCubes: number = multipliedCubes.reduce((a, b) => a + b, 0);
    console.log("Part Two - ", sumOfCubes);
}

function convertDataToGameSets(data: string): GameSet[] {
    const allGames: string[] = data.split('\n');
    const allGameSets: GameSet[] = [];
    for (const game of allGames) {
        const setsString: string = game.substring(game.indexOf(':') + 1, game.length);
        const cubeSets: CubeSet[] = [];
        for (let setString of setsString.split(';')) {
            const blueIndex = setString.indexOf('blue');
            const greenIndex = setString.indexOf('green');
            const redIndex = setString.indexOf('red');
            const cubeSet: CubeSet = {
                blue: blueIndex > -1 ? parseInt(setString.substring(blueIndex - 3, blueIndex)) : 0,
                green: greenIndex > -1 ? parseInt(setString.substring(greenIndex - 3, greenIndex)) : 0,
                red: redIndex > -1 ? parseInt(setString.substring(redIndex - 3, redIndex)) : 0
            }

            cubeSets.push(cubeSet);
        }
        
        allGameSets.push({
            sets: cubeSets
        })
    }

    return allGameSets;
}

function getPlayableGamesScore(gameSets: GameSet[]): number {
    let totalScore: number = 0;

    for (let i = 0; i < gameSets.length; i++) {
        if (isPlayable(LOADED_BAG, gameSets[i])) {
            totalScore += (i + 1)
        }
    }

    return totalScore;
}

function getLowestNumberOfCubesSets(gameSets: GameSet[]): CubeSet[] {
    let lowestNumberOfCubesSets: CubeSet[] = [];
    

    gameSets.forEach((gameSet) => {
        let lowestNumberOfCubesSet: CubeSet = {
            blue: Number.MIN_SAFE_INTEGER,
            green: Number.MIN_SAFE_INTEGER,
            red: Number.MIN_SAFE_INTEGER
        };

        for (const set of gameSet.sets) {
            if (set.blue > lowestNumberOfCubesSet.blue) {
                lowestNumberOfCubesSet.blue = set.blue;
            }

            if (set.green > lowestNumberOfCubesSet.green) {
                lowestNumberOfCubesSet.green = set.green;
            }

            if (set.red > lowestNumberOfCubesSet.red) {
                lowestNumberOfCubesSet.red = set.red;
            }
        }

        lowestNumberOfCubesSets.push(lowestNumberOfCubesSet);
    });

    return lowestNumberOfCubesSets;
}

function isPlayable(loadedBag: CubeSet, gameSet: GameSet): boolean {
   for (const set of gameSet.sets) {
       if (set.blue > loadedBag.blue || set.green > loadedBag.green || set.red > loadedBag.red) {
           return false;
       }
    }

    return true;
}