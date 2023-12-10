"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const file_reader_1 = require("../file-reader");
function main(filePath = 'src/Day-6/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, false).then((values) => {
        const raceDetailsPart1 = getRaceDetails(values);
        const raceDetailsPart2 = getRaceDetails(values, false);
        partOne(raceDetailsPart1);
        partTwo(raceDetailsPart2);
    });
}
exports.main = main;
function getRaceDetails(inputData, part1 = true) {
    const allRaces = [];
    let splitData = inputData.split('\n');
    splitData = part1 ? splitData : splitData.map((x) => x.replace(/\s/g, ''));
    const timeData = splitData[0].substring(splitData[0].indexOf(':') + 1, splitData[0].length).split(' ').filter((x) => !!x).map(x => parseInt(x.trim()));
    const distanceData = splitData[1].substring(splitData[1].indexOf(':') + 1, splitData[1].length).split(' ').filter((x) => !!x).map(x => parseInt(x.trim()));
    for (let i = 0; i < timeData.length; i++) {
        allRaces.push({ raceDuration: timeData[i], recordDistance: distanceData[i] });
    }
    return allRaces;
}
// Part One - START
function partOne(raceDetails) {
    const allRaceRecords = [];
    for (let [index, race] of raceDetails.entries()) {
        allRaceRecords[index] = (getAllRaceDistances(race).filter((x) => x > race.recordDistance));
    }
    console.log('Part one:', allRaceRecords.reduce((acc, curr) => acc * curr.length, 1));
}
function getAllRaceDistances(race) {
    const allDistances = [];
    for (let i = 0; i <= race.raceDuration; i++) {
        allDistances.push(i * (race.raceDuration - i));
    }
    return allDistances;
}
// Part One - END
// Part Two - START
function partTwo(raceDetails) {
    partOne(raceDetails);
}
// Part Two - END
