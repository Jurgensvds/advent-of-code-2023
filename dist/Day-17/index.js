"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const file_reader_1 = require("../file-reader");
function main(filePath = 'src/Day-17/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, true).then((values) => {
        const cityMap = mapInputToCityMap(values);
        // cityMap.forEach((row) => console.log(row.join('')));
        partOne(cityMap);
        partTwo(cityMap);
    });
}
exports.main = main;
// Part One - START
function partOne(cityMap) {
    const result = 'TODO';
    console.log(`Part One: ${result}`);
}
// Part One - END
// -----------------------------------------------------------------------------------------------
// Part Two - START
function partTwo(cityMap) {
    const result = 'TODO';
    console.log(`Part Two: ${result}`);
}
// Part Two - END
// -----------------------------------------------------------------------------------------------
// Utility Functions
function mapInputToCityMap(input) {
    const cityMap = input.split('\n').map((row) => {
        return row.split('');
    });
    return cityMap;
}
