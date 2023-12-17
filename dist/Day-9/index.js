"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const file_reader_1 = require("../file-reader");
function main(filePath = 'src/Day-9/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, false).then((values) => {
        const allPatterns = mapInputToPatterns(values);
        partOne(allPatterns);
        partTwo(allPatterns);
    });
}
exports.main = main;
// Part One - START
function partOne(allPatterns) {
    const result = allPatterns.reduce((acc, pattern) => acc + findNumberInSequence(pattern, pattern.length), 0);
    console.log(`Part One: ${result}`);
}
// Part One - END
// -----------------------------------------------------------------------------------------------
// Part Two - START
function partTwo(allPatterns) {
    const result = allPatterns.reduce((acc, pattern) => acc + findNumberInSequence(pattern.reverse(), pattern.length), 0);
    console.log(`Part Two: ${result}`);
}
// Part Two - END
// -----------------------------------------------------------------------------------------------
// Utility Functions
function mapInputToPatterns(input) {
    const sequences = input.split('\n').map((row) => {
        return row.split(' ').map((char) => parseInt(char));
    });
    return sequences;
}
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}
function binomialCoefficient(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}
function findNumberInSequence(sequence, n) {
    let differences = [];
    differences.push(sequence);
    // Construct the forward difference table
    for (let i = 0; differences[differences.length - 1].length > 1; i++) {
        let newDifferences = [];
        for (let j = 0; j < differences[i].length - 1; j++) {
            newDifferences.push(differences[i][j + 1] - differences[i][j]);
        }
        differences.push(newDifferences);
    }
    // Apply the Gregory-Newton forward difference formula
    let result = differences[0][0]; // This is f0
    for (let i = 1; i < differences.length; i++) {
        result += binomialCoefficient(n, i) * differences[i][0];
    }
    return result;
}
