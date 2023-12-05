import { readTextFile } from "../file-reader";
import { AllMappedData, MapData } from "./models/day-five-models";

export function main(filePath = 'src/Day-5/input.txt') {
    readTextFile(filePath, false).then((values) => {
        const mappedData: AllMappedData = getMapData(values);

        partOne(mappedData);
        partTwo(mappedData);
    });
}

function getMapData(inputData: string): AllMappedData {
    const splitSections = inputData.split('\n\n');
    const allSeeds = splitSections[0].substring(splitSections[0].indexOf(':') + 1).split(' ').map(x => parseInt(x)).filter(x => !!x);
    
    return {
        allSeeds,
        seedToSoil: splitSections[1].substring(splitSections[1].indexOf(':') + 1).trim().split('\n').map(mapRowToMapData),
        soilToFertilizer: splitSections[2].substring(splitSections[2].indexOf(':') + 1).trim().split('\n').map(mapRowToMapData),
        fertilizerToWater: splitSections[3].substring(splitSections[3].indexOf(':') + 1).trim().split('\n').map(mapRowToMapData),
        waterToLight: splitSections[4].substring(splitSections[4].indexOf(':') + 1).trim().split('\n').map(mapRowToMapData),
        lightToTemperature: splitSections[5].substring(splitSections[5].indexOf(':') + 1).trim().split('\n').map(mapRowToMapData),
        temperatureToHumidity: splitSections[6].substring(splitSections[6].indexOf(':') + 1).trim().split('\n').map(mapRowToMapData),
        humidityToLocation: splitSections[7].substring(splitSections[7].indexOf(':') + 1).trim().split('\n').map(mapRowToMapData)
    }
}

function mapRowToMapData(row: string): MapData {
    const splitRow = row.trim().split(' ');
    return {
        destinationRangeStart: parseInt(splitRow[0]),
        sourceRangeStart: parseInt(splitRow[1]),
        rangeLength: parseInt(splitRow[2])
    };
}

// Part One - START
function partOne(mappedData: AllMappedData): void {
    const allLocationNumbers: number[] = getAllLocationNumber(mappedData);

    console.log("Part One:", Math.min(...allLocationNumbers));
}

function findMappingNumber(sourceNumber: number, mapData: MapData[]): number {
    for (let map of mapData) {
        if (sourceNumber >= map.sourceRangeStart && sourceNumber < map.sourceRangeStart + map.rangeLength) {
            return (sourceNumber - map.sourceRangeStart) + map.destinationRangeStart;
        }
    }

    return sourceNumber;
}

function getAllLocationNumber(mappedData: AllMappedData, newSeeds: number[] = null): number[] {
    const allLocationNumbers: number[] = [];
    for (let seed of (newSeeds ? newSeeds : mappedData.allSeeds)) {
        const soilNumber = findMappingNumber(seed, mappedData.seedToSoil);
        const fertilizerNumber = findMappingNumber(soilNumber, mappedData.soilToFertilizer);
        const waterNumber = findMappingNumber(fertilizerNumber, mappedData.fertilizerToWater);
        const lightNumber = findMappingNumber(waterNumber, mappedData.waterToLight);
        const temperatureNumber = findMappingNumber(lightNumber, mappedData.lightToTemperature);
        const humidityNumber = findMappingNumber(temperatureNumber, mappedData.temperatureToHumidity);
        const locationNumber = findMappingNumber(humidityNumber, mappedData.humidityToLocation);
        allLocationNumbers.push(locationNumber);
    }

    return allLocationNumbers;
}
// Part One - END
// --------------------------------------------------
// Part Two - START

function partTwo(mappedData: AllMappedData) {
    const seeds = mappedData.allSeeds;
    
    let minLocation = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < seeds.length; i+=2) {
        console.log(`Evaluating seed group ${(i+2)/2} of ${seeds.length / 2}`)
        for(let j = 0; j < seeds[i+1]; j++) {
            const seedLocation = getAllLocationNumber(mappedData, [seeds[i] + j])
            minLocation = seedLocation[0] < minLocation ? seedLocation[0] : minLocation
        }
    }

    console.log("Part Two:", minLocation);
}

// Part Two - END