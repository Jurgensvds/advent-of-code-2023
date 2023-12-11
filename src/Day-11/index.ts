import { cloneDeep } from "lodash";
import { readTextFile } from "../file-reader";
import { EmptySpace, GalaxyCoord, PathBetweenGalaxies } from "./models/day-eleven-models";

let GALAXY_MAP: string[][] = [];
let ALL_SHORTEST_PATHS: Map<string, GalaxyCoord[]> = new Map<string, GalaxyCoord[]>();
let GALAXY_EMPTY_SPACES: EmptySpace = { cols: [], rows: [] };
let ALL_PATHS: PathBetweenGalaxies[] = [];

export function main(filePath = 'src/Day-11/input.txt') {
    readTextFile(filePath, false).then((values) => {
        // Start Here
        mapInputToGalaxyMap(values);
        findGalaxyEmptySpaces(GALAXY_MAP);

        partOne(2);
        partTwo();
    });
}

// Part One - START
function partOne(multiplier: number, partOne: boolean = true): void {
    const allGalaxyCoords: GalaxyCoord[] = getAllGalaxyCoordsOnMap(GALAXY_MAP);
    ALL_PATHS = [];

    for(let i = 0; i < allGalaxyCoords.length; i++) {
        for(let j = i + 1; j < allGalaxyCoords.length; j++) {
            const key = `${i+1}-${j+1}`;
            const path = shortestPathBetweenTwoGalaxies(allGalaxyCoords[i], allGalaxyCoords[j]);
            ALL_SHORTEST_PATHS.set(key, path);
            ALL_PATHS.push({ start: allGalaxyCoords[i], end: allGalaxyCoords[j], path: path, pathLength: path.length });
        }
    }
    for(let path of ALL_PATHS) {
        const emptySpaceMoves = getEmptySpaceMoves(path);
        path.pathLength = (path.pathLength - emptySpaceMoves) + (emptySpaceMoves * multiplier);
    }

    console.log(`Part ${partOne ? 'One' : 'Two'}: ${ALL_PATHS.reduce((acc, path) => acc + path.pathLength, 0)}`);
}
// Part One - END
// --------------------------------------------------------------------
// Part Two - START
function partTwo(): void {
    partOne(1000000, false);
}
// Part Two - END


// Utility Functions
function mapInputToGalaxyMap(input: string): void {
    GALAXY_MAP = input.trim().split('\n').map((row) => row.trim().split(''));
}

function findGalaxyEmptySpaces(map: string[][]): void {
    for (let i = 0; i < map.length; i++) {
        if (map[i].every(cell => cell === '.')) {
            GALAXY_EMPTY_SPACES.rows.push(i);
        }
    }

    // Duplicate columns with only '.'
    for (let col = 0; col < map[0].length; col++) {
        let allDots = true;
        for (let row = 0; row < map.length; row++) {
            if (map[row][col] !== '.') {
                allDots = false;
                break;
            }
        }
        if (allDots) {
            GALAXY_EMPTY_SPACES.cols.push(col);
        }
    }
} 

function getAllGalaxyCoordsOnMap(map: string[][]): GalaxyCoord[] {
    const allGalaxyCoords: GalaxyCoord[] = [];
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === '#') {
                allGalaxyCoords.push({ x: col, y: row });
            }
        }
    }
    return allGalaxyCoords;
}

function shortestPathBetweenTwoGalaxies(start: GalaxyCoord, end: GalaxyCoord): GalaxyCoord[] {
    let currentLocation = cloneDeep(start);
    const path: GalaxyCoord[] = [];
    let moveX: boolean = true

    while (currentLocation.x !== end.x || currentLocation.y !== end.y) {
        if (moveX) {
            if(currentLocation.x === end.x) {
                moveX = !moveX;
                continue;
            }
            else if (currentLocation.x > end.x) {
                currentLocation.x--;
            } else {
                currentLocation.x++;
            }
        } else {
            if(currentLocation.y === end.y) {
                moveX = !moveX;
                continue;
            }
            else if (currentLocation.y > end.y) {
                currentLocation.y--;
            } else {
                currentLocation.y++;
            }
        }
        moveX = !moveX;
        path.push(cloneDeep(currentLocation));
    }

    return path;
}

function getEmptySpaceMoves(path: PathBetweenGalaxies): number {
    const travelCols = path.path.map((coord) => coord.x).filter((col) => GALAXY_EMPTY_SPACES.cols.includes(col));
    const travelRows = path.path.map((coord) => coord.y).filter((row) => GALAXY_EMPTY_SPACES.rows.includes(row));

    const emptyColMoves = new Set(travelCols).size;
    const emptyRowMoves = new Set(travelRows).size;

    return emptyColMoves + emptyRowMoves;
}
