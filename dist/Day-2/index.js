"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const file_reader_1 = require("../file-reader");
const LOADED_BAG = {
    blue: 14,
    green: 13,
    red: 12
};
function main(filePath = 'src/Day-2/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, false).then((values) => {
        partOne(values);
        partTwo(values);
    });
}
exports.main = main;
function partOne(data) {
    const gameSets = convertDataToGameSets(data);
    console.log("Part One - ", getPlayableGamesScore(gameSets));
}
function partTwo(data) {
    const gameSets = convertDataToGameSets(data);
    const lowestNumberOfCubesSets = getLowestNumberOfCubesSets(gameSets);
    const multipliedCubes = lowestNumberOfCubesSets.map((set) => set.blue * set.green * set.red);
    const sumOfCubes = multipliedCubes.reduce((a, b) => a + b, 0);
    console.log("Part Two - ", sumOfCubes);
}
function convertDataToGameSets(data) {
    const allGames = data.split('\n');
    const allGameSets = [];
    for (const game of allGames) {
        const setsString = game.substring(game.indexOf(':') + 1, game.length);
        const cubeSets = [];
        for (let setString of setsString.split(';')) {
            const blueIndex = setString.indexOf('blue');
            const greenIndex = setString.indexOf('green');
            const redIndex = setString.indexOf('red');
            const cubeSet = {
                blue: blueIndex > -1 ? parseInt(setString.substring(blueIndex - 3, blueIndex)) : 0,
                green: greenIndex > -1 ? parseInt(setString.substring(greenIndex - 3, greenIndex)) : 0,
                red: redIndex > -1 ? parseInt(setString.substring(redIndex - 3, redIndex)) : 0
            };
            cubeSets.push(cubeSet);
        }
        allGameSets.push({
            sets: cubeSets
        });
    }
    return allGameSets;
}
function getPlayableGamesScore(gameSets) {
    let totalScore = 0;
    for (let i = 0; i < gameSets.length; i++) {
        if (isPlayable(LOADED_BAG, gameSets[i])) {
            totalScore += (i + 1);
        }
    }
    return totalScore;
}
function getLowestNumberOfCubesSets(gameSets) {
    let lowestNumberOfCubesSets = [];
    gameSets.forEach((gameSet) => {
        let lowestNumberOfCubesSet = {
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
function isPlayable(loadedBag, gameSet) {
    for (const set of gameSet.sets) {
        if (set.blue > loadedBag.blue || set.green > loadedBag.green || set.red > loadedBag.red) {
            return false;
        }
    }
    return true;
}
