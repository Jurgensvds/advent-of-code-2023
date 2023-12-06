Day 3 - Advent


import { readTextFile } from "../file-reader";
import { Coordinate, NumberCoordinate } from "./models/day-three-models";

export function main(filePath = 'src/Day-3/input.txt') {
    readTextFile(filePath, false).then((values) => {
        const mappedData = mapDataToTwoDimensionalArray(values);
        partOne(mappedData);
        partTwo(mappedData);
    });
}

function mapDataToTwoDimensionalArray(inputData: string): string[][] {
    return inputData.trim().split('\n').map(x => x.trim().split(''));
}

function mapToCoordinateArray(mappedData: string[][]): NumberCoordinate[] {
    let coordinates: NumberCoordinate[] = [];

    for(let i = 0; i < mappedData.length; i++) {
        for(let j = 0; j < mappedData[i].length; j++) {
            if(parseInt(mappedData[i][j])) {
                let numberStartCoordinate: Coordinate = { row: i, column: j };
                let numberEndCoordinate: Coordinate = findNumberEndIndex(mappedData[i], numberStartCoordinate);

                j = numberEndCoordinate.column;
                coordinates.push({ start: numberStartCoordinate, end: numberEndCoordinate });
            }
        }
    }

    return coordinates;
}

// Part One - START

function partOne(mappedData: string[][]): void {
    let total = 0;
    const coordinates = mapToCoordinateArray(mappedData);
    for(let coord of coordinates) {
        if(numberHasAdjacentSymbols(mappedData, coord)) {
            total += getNumberFromList(mappedData, coord);
        }
    }

    console.log('Part one:', total);
}

function findNumberEndIndex(row: string[], numberStartCoordinate: Coordinate): Coordinate {
    for(let i = numberStartCoordinate.column; i < row.length; i++) {
        if(isNaN(parseInt(row[i]))) {
            return { row: numberStartCoordinate.row, column: i-1 };
        }
    }

    return { row: numberStartCoordinate.row, column: row.length - 1 };
}

function numberHasAdjacentSymbols(mappedData: string[][], coordinates: NumberCoordinate): boolean {
    let hasAdjacentSymbols = false;

    const startColumn = coordinates.start.column === 0 ? 0 : coordinates.start.column - 1;
    const endColumn = coordinates.end.column === mappedData.length - 1 ? coordinates.end.column : coordinates.end.column + 1;
    const startRow = coordinates.start.row === 0 ? 0 : coordinates.start.row - 1;
    const endRow = coordinates.end.row === mappedData.length - 1 ? coordinates.end.row : coordinates.end.row + 1;

    for(let i = startRow; i <= endRow; i++) {
        for(let j = startColumn; j <= endColumn; j++) {
            if(i === coordinates.start.row && (j >= coordinates.start.column && j <= coordinates.end.column)) {
                continue;
            }

            if(!parseInt(mappedData[i][j]) && mappedData[i][j] !== '.') {
                hasAdjacentSymbols = true;
                break;
            }
        }

        if(hasAdjacentSymbols) {
            break;
        }
    }

    return hasAdjacentSymbols;
}

function getNumberFromList(mappedData: string[][], coordinate: NumberCoordinate): number {
    let number = '';

    for(let i = coordinate.start.row; i <= coordinate.end.row; i++) {
        for(let j = coordinate.start.column; j <= coordinate.end.column; j++) {
            number += mappedData[i][j];
        }
    }

    return parseInt(number);
}

// Part One - END
// ---------------------------------------------------
// Part Two - START

function partTwo(mappedData: string[][]): void {
    const coordinates = mapToCoordinateArray(mappedData);
    let gearMap: number[][][] = mappedData.map(row => row.map(() => []));;
    for(let coord of coordinates) {
        addNumberToGearMap(mappedData, coord, gearMap)
    }

    gearMap = gearMap.map(row => row.filter((cell) => cell.length === 2)).filter((row) => row.length);
    const total = gearMap.reduce((a,b) => a + b.reduce((x, y) => x + (y[0] * y[1]), 0), 0)
    console.log("Part two:", total);
}

function addNumberToGearMap(mappedData: string[][], coordinates: NumberCoordinate, gearMap: number[][][]): void {
    let hasAdjacentSymbols = false;

    const startColumn = coordinates.start.column === 0 ? 0 : coordinates.start.column - 1;
    const endColumn = coordinates.end.column === mappedData.length - 1 ? coordinates.end.column : coordinates.end.column + 1;
    const startRow = coordinates.start.row === 0 ? 0 : coordinates.start.row - 1;
    const endRow = coordinates.end.row === mappedData.length - 1 ? coordinates.end.row : coordinates.end.row + 1;

    for(let i = startRow; i <= endRow; i++) {
        for(let j = startColumn; j <= endColumn; j++) {
            if(i === coordinates.start.row && (j >= coordinates.start.column && j <= coordinates.end.column)) {
                continue;
            }

            if(mappedData[i][j] === '*') {
                // gearMap[i][j].push(coordinates)
                gearMap[i][j].push(getNumberFromList(mappedData, coordinates))
            }
        }
    }
} 

// Part Two - END
