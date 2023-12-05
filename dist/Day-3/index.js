"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const file_reader_1 = require("../file-reader");
function main(filePath = 'src/Day-3/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, false).then((values) => {
        const mappedData = mapDataToTwoDimensionalArray(values);
        partOne(mappedData);
        partTwo(mappedData);
    });
}
exports.main = main;
function mapDataToTwoDimensionalArray(inputData) {
    return inputData.trim().split('\n').map(x => x.trim().split(''));
}
function mapToCoordinateArray(mappedData) {
    let coordinates = [];
    for (let i = 0; i < mappedData.length; i++) {
        for (let j = 0; j < mappedData[i].length; j++) {
            if (parseInt(mappedData[i][j])) {
                let numberStartCoordinate = { row: i, column: j };
                let numberEndCoordinate = findNumberEndIndex(mappedData[i], numberStartCoordinate);
                j = numberEndCoordinate.column;
                coordinates.push({ start: numberStartCoordinate, end: numberEndCoordinate });
            }
        }
    }
    return coordinates;
}
// Part One - START
function partOne(mappedData) {
    let total = 0;
    const coordinates = mapToCoordinateArray(mappedData);
    for (let coord of coordinates) {
        if (numberHasAdjacentSymbols(mappedData, coord)) {
            console.log(coord);
            total += getNumberFromList(mappedData, coord);
        }
    }
    console.log(total);
}
function findNumberEndIndex(row, numberStartCoordinate) {
    for (let i = numberStartCoordinate.column; i < row.length; i++) {
        if (isNaN(parseInt(row[i]))) {
            return { row: numberStartCoordinate.row, column: i - 1 };
        }
    }
    return { row: numberStartCoordinate.row, column: row.length - 1 };
}
function numberHasAdjacentSymbols(mappedData, coordinates) {
    let hasAdjacentSymbols = false;
    const startColumn = coordinates.start.column === 0 ? 0 : coordinates.start.column - 1;
    const endColumn = coordinates.end.column === mappedData.length - 1 ? coordinates.end.column : coordinates.end.column + 1;
    const startRow = coordinates.start.row === 0 ? 0 : coordinates.start.row - 1;
    const endRow = coordinates.end.row === mappedData.length - 1 ? coordinates.end.row : coordinates.end.row + 1;
    for (let i = startRow; i <= endRow; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
            if (i === coordinates.start.row && (j >= coordinates.start.column && j <= coordinates.end.column)) {
                continue;
            }
            if (!parseInt(mappedData[i][j]) && mappedData[i][j] !== '.') {
                hasAdjacentSymbols = true;
                break;
            }
        }
        if (hasAdjacentSymbols) {
            break;
        }
    }
    return hasAdjacentSymbols;
}
function getNumberFromList(mappedData, coordinate) {
    let number = '';
    for (let i = coordinate.start.row; i <= coordinate.end.row; i++) {
        for (let j = coordinate.start.column; j <= coordinate.end.column; j++) {
            number += mappedData[i][j];
        }
    }
    return parseInt(number);
}
// Part One - END
// ---------------------------------------------------
// Part Two - START
function partTwo(mappedData) {
    // Start Here
}
// Part Two - END
