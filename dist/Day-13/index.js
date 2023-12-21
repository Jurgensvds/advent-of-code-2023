"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const file_reader_1 = require("../file-reader");
function main(filePath = 'src/Day-13/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, true).then((values) => {
        // Start Here
        const allSpringMaps = mapDataToThreeDimensionalArray(values);
        console.log(allSpringMaps);
        partOne(allSpringMaps);
        partTwo(allSpringMaps);
    });
}
exports.main = main;
// Part One - START
function partOne(allMaps) {
    let totalMirroredColumns = 0;
    let totalMirroredRows = 0;
    for (let map of allMaps) {
        const rowMirrorIndex = getGridRowMirrorIndex(map);
        const columnMirrorIndex = getGridColumnMirrorIndex(map);
        if (rowMirrorIndex > -1) {
            totalMirroredRows += countMirroredRows(map, rowMirrorIndex);
        }
        if (columnMirrorIndex > -1) {
            totalMirroredColumns += countMirroredColumns(map, columnMirrorIndex);
        }
    }
    console.log(`Total Mirrored Rows: ${totalMirroredRows}`);
    console.log(`Total Mirrored Columns: ${totalMirroredColumns}`);
}
// Part One - END
// -----------------------------------------------------------------------------------------------
// Part Two - START
function partTwo(allMaps) {
    const result = 'TODO';
    console.log(`Part Two: ${result}`);
}
// Part Two - END
// -----------------------------------------------------------------------------------------------
// Utility Functions
function mapDataToThreeDimensionalArray(data) {
    console.log(data);
    return data.split('\n\n').map((grid) => {
        return grid.split('\n').map((row) => {
            return row.split('');
        });
    });
}
function getRowAsString(grid, rowIndex) {
    return grid[rowIndex].join('');
}
function getColumnAsString(grid, columnIndex) {
    return grid.map((row) => row[columnIndex]).join('');
}
function getGridColumnMirrorIndex(grid) {
    const rowLength = grid.length;
    for (let i = 0; i < rowLength - 1; i++) {
        const columnOne = getColumnAsString(grid, i);
        const columnTwo = getColumnAsString(grid, i + 1);
        if (columnOne === columnTwo) {
            return i;
        }
    }
    return -1;
}
function getGridRowMirrorIndex(grid) {
    const columnLength = grid[0].length;
    for (let i = 0; i < columnLength - 1; i++) {
        const rowOne = getRowAsString(grid, i);
        const rowTwo = getRowAsString(grid, i + 1);
        if (rowOne === rowTwo) {
            return i;
        }
    }
    return -1;
}
function countMirroredColumns(grid, mirrorIndex) {
    let totalMirroredColumns = 0;
    let currentMirrorIndex = mirrorIndex + 1;
    for (let i = mirrorIndex; i >= 0 || currentMirrorIndex < grid[0].length; i--) {
        const columnOne = getColumnAsString(grid, i);
        const columnTwo = getColumnAsString(grid, currentMirrorIndex);
        if (columnOne === columnTwo) {
            totalMirroredColumns += 1;
        }
        else {
            break;
        }
        currentMirrorIndex++;
    }
    return totalMirroredColumns;
}
function countMirroredRows(grid, mirrorIndex) {
    let totalMirroredRows = 0;
    let currentMirrorIndex = mirrorIndex + 1;
    for (let i = mirrorIndex; i >= 0 || currentMirrorIndex < grid.length; i--) {
        const rowOne = getRowAsString(grid, i);
        const rowTwo = getRowAsString(grid, currentMirrorIndex);
        if (rowOne === rowTwo) {
            totalMirroredRows += 1;
        }
        else {
            break;
        }
        currentMirrorIndex++;
    }
    return totalMirroredRows;
}
