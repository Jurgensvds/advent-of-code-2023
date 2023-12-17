"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const lodash_1 = require("lodash");
const file_reader_1 = require("../file-reader");
function main(filePath = 'src/Day-8/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, false).then((values) => {
        const instructions = mapInputToInstructions(values);
        partOne(instructions);
        partTwo(instructions);
    });
}
exports.main = main;
// Part One - START
function partOne(instructions) {
    const result = navigateMapAndCountSteps(instructions);
    console.log(`Part One: ${result}`);
}
function navigateMapAndCountSteps(instructions) {
    let totalSteps = 0;
    let stepTracker = 0;
    let currentStep = 'AAA';
    const endStep = 'ZZZ';
    while (currentStep !== endStep) {
        const currentDirection = instructions.map.get(currentStep);
        if (instructions.directions[stepTracker] === 'L') {
            currentStep = currentDirection.left;
        }
        else {
            currentStep = currentDirection.right;
        }
        totalSteps++;
        stepTracker = (stepTracker + 1) % instructions.directions.length;
    }
    return totalSteps;
}
// Part One - END
// -----------------------------------------------------------------------------------------------
// Part Two - START
function partTwo(instructions) {
    const result = navigateAllStartCoordinatesAndCountSteps(Array.from(instructions.map.keys()).filter((key) => key[key.length - 1] === 'A'), instructions);
    console.log(`Part Two: ${result}`);
}
function navigateAllStartCoordinatesAndCountSteps(startingSteps, instructions) {
    let totalSteps = 0;
    let stepTracker = 0;
    let leastCommonMultiples = new Map();
    const startSteps = (0, lodash_1.cloneDeep)(startingSteps);
    for (const step of startingSteps) {
        leastCommonMultiples.set(step, []);
    }
    let currentSteps = startingSteps;
    while (Array.from(leastCommonMultiples.values()).some((value) => value.length < 1)) {
        let nextSteps = [];
        for (let i = 0; i < currentSteps.length; i++) {
            const currentDirection = instructions.map.get(currentSteps[i]);
            if (currentSteps[i][currentSteps[i].length - 1] === 'Z') {
                leastCommonMultiples.get(startSteps[i]).push(totalSteps);
            }
            if (instructions.directions[stepTracker] === 'L') {
                nextSteps.push(currentDirection.left);
            }
            else {
                nextSteps.push(currentDirection.right);
            }
        }
        currentSteps = (0, lodash_1.cloneDeep)(nextSteps);
        totalSteps++;
        stepTracker = (stepTracker + 1) % instructions.directions.length;
    }
    return lcmArray(Array.from(leastCommonMultiples.values()).map((value) => value[0]));
}
// Part Two - END
// -----------------------------------------------------------------------------------------------
// Utility Functions
function mapInputToInstructions(input) {
    const instructions = {
        directions: [],
        map: new Map()
    };
    instructions.directions = input.split('\n\n')[0].trim().split('');
    for (let mapRow of input.split('\n\n')[1].trim().split('\n')) {
        const [key, value] = mapRow.split(' = ');
        let splitValue = value.split(', ');
        instructions.map.set(key, { left: splitValue[0].replace('(', ''), right: splitValue[1].replace(')', '') });
    }
    return instructions;
}
function gcd(a, b) {
    while (b != 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}
function lcmArray(arr) {
    return arr.reduce((accumulatedLcm, current) => lcm(accumulatedLcm, current), 1);
}
