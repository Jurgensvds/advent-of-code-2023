import { cloneDeep } from "lodash";
import { readTextFile } from "../file-reader";
import { Direction, Instructions } from "./models/day-eight-models";

export function main(filePath = 'src/Day-8/input.txt') {
    readTextFile(filePath, false).then((values) => {
        const instructions = mapInputToInstructions(values);

        partOne(instructions);
        partTwo(instructions);
    });
}

// Part One - START

function partOne(instructions: Instructions) {
    const result = navigateMapAndCountSteps(instructions);

    console.log(`Part One: ${result}`);
}

function navigateMapAndCountSteps(instructions: Instructions): number {
    let totalSteps: number = 0;
    let stepTracker: number = 0;

    let currentStep: string = 'AAA';
    const endStep: string = 'ZZZ';

    while (currentStep !== endStep) {
        const currentDirection: Direction = instructions.map.get(currentStep);
        if(instructions.directions[stepTracker] === 'L') {
            currentStep = currentDirection.left;
        } else {
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

function partTwo(instructions: Instructions) {
    const result = navigateAllStartCoordinatesAndCountSteps(Array.from(instructions.map.keys()).filter((key) => key[key.length -1] === 'A'),  instructions);
    console.log(`Part Two: ${result}`);
}

function navigateAllStartCoordinatesAndCountSteps(startingSteps: string[], instructions: Instructions): number {
    let totalSteps: number = 0;
    let stepTracker: number = 0;
    let leastCommonMultiples: Map<string, number[]> = new Map<string, number[]>();
    const startSteps = cloneDeep(startingSteps);
    for(const step of startingSteps) {
        leastCommonMultiples.set(step, []);
    }

    let currentSteps: string[] = startingSteps;

    while (Array.from(leastCommonMultiples.values()).some((value) => value.length < 1)) {
        let nextSteps: string[] = [];
        for (let i = 0; i < currentSteps.length; i++) {
            const currentDirection: Direction = instructions.map.get(currentSteps[i]);
            if(currentSteps[i][currentSteps[i].length - 1] === 'Z') {
                leastCommonMultiples.get(startSteps[i]).push(totalSteps);
            }

            if(instructions.directions[stepTracker] === 'L') {
                nextSteps.push(currentDirection.left);
            } else {
                nextSteps.push(currentDirection.right);
            }
        }

        currentSteps = cloneDeep(nextSteps);
        totalSteps++;
        stepTracker = (stepTracker + 1) % instructions.directions.length;
    }

    return lcmArray(Array.from(leastCommonMultiples.values()).map((value) => value[0]));
}

// Part Two - END

// -----------------------------------------------------------------------------------------------

// Utility Functions

function mapInputToInstructions (input: string): Instructions {
    const instructions: Instructions = {
        directions: [],
        map: new Map<string, Direction>()
    };

    instructions.directions = input.split('\n\n')[0].trim().split('');
    for (let mapRow of input.split('\n\n')[1].trim().split('\n')) {
        const [key, value] = mapRow.split(' = ');
        let splitValue = value.split(', ');

        instructions.map.set(key, { left: splitValue[0].replace('(', ''), right: splitValue[1].replace(')', '') });
    }

    return instructions;
}

function gcd(a: number, b: number): number {
    while (b != 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function lcm(a: number, b: number): number {
    return Math.abs(a * b) / gcd(a, b);
}

function lcmArray(arr: number[]): number {
    return arr.reduce((accumulatedLcm, current) => lcm(accumulatedLcm, current), 1);
}
