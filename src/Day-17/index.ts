import { readTextFile } from "../file-reader";

export function main(filePath = 'src/Day-17/input.txt') {
    readTextFile(filePath, true).then((values) => {
        const cityMap = mapInputToCityMap(values);
        // cityMap.forEach((row) => console.log(row.join('')));

        partOne(cityMap);
        partTwo(cityMap);
    });
}

// Part One - START

function partOne(cityMap: string[][]) {
    const result = 'TODO';
    console.log(`Part One: ${result}`);
}

// Part One - END
// -----------------------------------------------------------------------------------------------
// Part Two - START

function partTwo(cityMap: string[][]) {
    const result = 'TODO';
    console.log(`Part Two: ${result}`);
}

// Part Two - END

// -----------------------------------------------------------------------------------------------

// Utility Functions

function mapInputToCityMap(input: string): string[][] {
    const cityMap: string[][] = input.split('\n').map((row) => {
        return row.split('');
    });
    
    return cityMap;
}