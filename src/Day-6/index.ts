import { readTextFile } from "../file-reader";
import { RaceDetails } from "./models/day-six-models";

export function main(filePath = 'src/Day-6/input.txt') {
    readTextFile(filePath, false).then((values) => {
        const raceDetailsPart1: RaceDetails[] = getRaceDetails(values);
        const raceDetailsPart2: RaceDetails[] = getRaceDetails(values, false);

        partOne(raceDetailsPart1);
        partTwo(raceDetailsPart2);
    });
}

function getRaceDetails(inputData: string, part1: boolean = true): RaceDetails[] {
    const allRaces: RaceDetails[] = [];
    let splitData = inputData.split('\n');

    splitData = part1 ? splitData : splitData.map((x) => x.replace(/\s/g, ''))
    const timeData = splitData[0].substring(splitData[0].indexOf(':') + 1, splitData[0].length).split(' ').filter((x) => !!x).map(x => parseInt(x.trim()));
    const distanceData = splitData[1].substring(splitData[1].indexOf(':') + 1, splitData[1].length).split(' ').filter((x) => !!x).map(x => parseInt(x.trim()));
    
    for(let i = 0; i < timeData.length; i++) {
        allRaces.push({ raceDuration: timeData[i], recordDistance: distanceData[i] });
    }

    return allRaces;
}

// Part One - START

function partOne(raceDetails: RaceDetails[]): void {
    const allRaceRecords: number[][] = [];
    for(let [index, race] of raceDetails.entries()) {
        allRaceRecords[index] = (getAllRaceDistances(race).filter((x) => x > race.recordDistance))
    }
    console.log('Part one:', allRaceRecords.reduce((acc, curr) => acc * curr.length, 1));
}

function getAllRaceDistances(race: RaceDetails): number[] {
    const allDistances: number[] = [];
    for (let i = 0; i <= race.raceDuration; i++) {
        allDistances.push(i * (race.raceDuration - i))
    }

    return allDistances;
}

// Part One - END

// Part Two - START

function partTwo(raceDetails: RaceDetails[]): void {
    partOne(raceDetails)
}

// Part Two - END