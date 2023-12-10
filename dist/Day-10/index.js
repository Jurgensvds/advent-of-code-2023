"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const lodash_1 = require("lodash");
const file_reader_1 = require("../file-reader");
const day_ten_models_1 = require("./models/day-ten-models");
function main(filePath = 'src/Day-10/input.txt') {
    (0, file_reader_1.readTextFile)(filePath, false).then((values) => {
        const mapLayout = mapInputTo2DArray(values);
        // Start Here
        partOne(mapLayout);
        partTwo(mapLayout);
    });
}
exports.main = main;
let counter = 0;
const SHAPE = { lines: [] };
const CORNERS = [];
let MAP = [];
// Part 1 - START
function partOne(mapLayout) {
    const startCoordinate = findStartCoordinate(mapLayout);
    mapValidLoopInMap(mapLayout, startCoordinate);
    console.log('Part one:', counter / 2);
}
// Part 1 - END
// ---------------------------------------------
// Part 2 - START
function partTwo(mapLayout) {
    const startCoordinate = findStartCoordinate(mapLayout);
    mapValidLoopInMap(mapLayout, startCoordinate);
    let totalTileInsideLoop = 0;
    MAP[startCoordinate.y][startCoordinate.x] = day_ten_models_1.MapTile.NorthToSouth;
    mapLayout[startCoordinate.y][startCoordinate.x] = day_ten_models_1.MapTile.LoopPath;
    for (let i = 0; i < mapLayout.length; i++) {
        // for (let i = 0; i < 10; i++) {
        for (let j = 0; j < mapLayout[i].length; j++) {
            if (mapLayout[i][j] === day_ten_models_1.MapTile.LoopPath || mapLayout[i][j] === day_ten_models_1.MapTile.Start) {
                continue;
            }
            if (seeIfTileIsInsideLoop({ x: j, y: i })) {
                MAP[i][j] = 'I';
                mapLayout[i][j] = 'I';
                totalTileInsideLoop++;
            }
            else {
                MAP[i][j] = 'O';
                mapLayout[i][j] = 'O';
            }
        }
    }
    for (let i = 0; i < mapLayout.length; i++) {
        console.log(mapLayout[i].join(''));
    }
    console.log('Part two:', totalTileInsideLoop);
}
// Part 2 - END
// Utility Functions
function mapInputTo2DArray(input) {
    const mapLayout = input.split('\n').map((row) => row.split(''));
    MAP = mapLayout.map((row) => row.map((tile) => '.'));
    return mapLayout;
}
function findStartCoordinate(mapLayout) {
    let startCoordinate = { x: -1, y: -1 };
    for (let [y, row] of mapLayout.entries()) {
        for (let [x, tile] of row.entries()) {
            if (tile === day_ten_models_1.MapTile.Start) {
                startCoordinate = { x, y };
                break;
            }
        }
    }
    return startCoordinate;
}
function mapValidLoopInMap(mapLayout, currentCoordinate, previousCoordinate = null) {
    if (previousCoordinate && isStart(mapLayout, currentCoordinate)) {
        return true;
    }
    if (canGoNorth(mapLayout, currentCoordinate, previousCoordinate)) {
        const nextCoordinate = { x: currentCoordinate.x, y: currentCoordinate.y - 1 };
        if (mapValidLoopInMap(mapLayout, nextCoordinate, currentCoordinate)) {
            addCornerToCorners(mapLayout, currentCoordinate);
            MAP[currentCoordinate.y][currentCoordinate.x] = mapLayout[currentCoordinate.y][currentCoordinate.x];
            if (previousCoordinate) {
                mapLayout[currentCoordinate.y][currentCoordinate.x] = day_ten_models_1.MapTile.LoopPath;
            }
            counter++;
            return true;
        }
    }
    // Check South
    if (canGoSouth(mapLayout, currentCoordinate, previousCoordinate)) {
        const nextCoordinate = { x: currentCoordinate.x, y: currentCoordinate.y + 1 };
        if (mapValidLoopInMap(mapLayout, nextCoordinate, currentCoordinate)) {
            addCornerToCorners(mapLayout, currentCoordinate);
            MAP[currentCoordinate.y][currentCoordinate.x] = mapLayout[currentCoordinate.y][currentCoordinate.x];
            if (previousCoordinate) {
                mapLayout[currentCoordinate.y][currentCoordinate.x] = day_ten_models_1.MapTile.LoopPath;
            }
            counter++;
            return true;
        }
    }
    // Check East
    if (canGoEast(mapLayout, currentCoordinate, previousCoordinate)) {
        const nextCoordinate = { x: currentCoordinate.x + 1, y: currentCoordinate.y };
        if (mapValidLoopInMap(mapLayout, nextCoordinate, currentCoordinate)) {
            addCornerToCorners(mapLayout, currentCoordinate);
            MAP[currentCoordinate.y][currentCoordinate.x] = mapLayout[currentCoordinate.y][currentCoordinate.x];
            if (previousCoordinate) {
                mapLayout[currentCoordinate.y][currentCoordinate.x] = day_ten_models_1.MapTile.LoopPath;
            }
            counter++;
            return true;
        }
    }
    // Check West
    if (canGoWest(mapLayout, currentCoordinate, previousCoordinate)) {
        const nextCoordinate = { x: currentCoordinate.x - 1, y: currentCoordinate.y };
        if (mapValidLoopInMap(mapLayout, nextCoordinate, currentCoordinate)) {
            addCornerToCorners(mapLayout, currentCoordinate);
            MAP[currentCoordinate.y][currentCoordinate.x] = mapLayout[currentCoordinate.y][currentCoordinate.x];
            if (previousCoordinate) {
                mapLayout[currentCoordinate.y][currentCoordinate.x] = day_ten_models_1.MapTile.LoopPath;
            }
            counter++;
            return true;
        }
    }
    mapCornersToLines(CORNERS.reverse());
    return false;
}
function addCornerToCorners(mapLayout, currentCoordinate) {
    if (mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToEast ||
        mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToWest ||
        mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.SouthToEast ||
        mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.SouthToWest ||
        mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.Start) {
        CORNERS.push(currentCoordinate);
    }
}
function mapCornersToLines(corners) {
    for (let i = 0; i < corners.length; i++) {
        if (i === corners.length - 1) {
            SHAPE.lines.push({ start: corners[i], end: corners[0] });
        }
        else {
            SHAPE.lines.push({ start: corners[i], end: corners[i + 1] });
        }
    }
}
function isStart(mapLayout, currentCoordinate) {
    return mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.Start;
}
function canGoNorth(mapLayout, currentCoordinate, previousCoordinate) {
    return currentCoordinate.y - 1 >= 0 &&
        (mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToSouth ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToEast ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.Start) &&
        (mapLayout[currentCoordinate.y - 1][currentCoordinate.x] === day_ten_models_1.MapTile.SouthToEast ||
            mapLayout[currentCoordinate.y - 1][currentCoordinate.x] === day_ten_models_1.MapTile.SouthToWest ||
            mapLayout[currentCoordinate.y - 1][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToSouth ||
            mapLayout[currentCoordinate.y - 1][currentCoordinate.x] === day_ten_models_1.MapTile.Start) &&
        !(0, lodash_1.isEqual)({ x: currentCoordinate.x, y: currentCoordinate.y - 1 }, previousCoordinate);
}
function canGoSouth(mapLayout, currentCoordinate, previousCoordinate) {
    return currentCoordinate.y + 1 < mapLayout.length &&
        (mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToSouth ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.SouthToEast ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.SouthToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.Start) &&
        (mapLayout[currentCoordinate.y + 1][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToEast ||
            mapLayout[currentCoordinate.y + 1][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToWest ||
            mapLayout[currentCoordinate.y + 1][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToSouth ||
            mapLayout[currentCoordinate.y + 1][currentCoordinate.x] === day_ten_models_1.MapTile.Start) &&
        !(0, lodash_1.isEqual)({ x: currentCoordinate.x, y: currentCoordinate.y + 1 }, previousCoordinate);
}
function canGoEast(mapLayout, currentCoordinate, previousCoordinate) {
    return currentCoordinate.x + 1 < mapLayout[0].length &&
        (mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToEast ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.SouthToEast ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.EastToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.Start) &&
        (mapLayout[currentCoordinate.y][currentCoordinate.x + 1] === day_ten_models_1.MapTile.NorthToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x + 1] === day_ten_models_1.MapTile.SouthToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x + 1] === day_ten_models_1.MapTile.EastToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x + 1] === day_ten_models_1.MapTile.Start) &&
        !(0, lodash_1.isEqual)({ x: currentCoordinate.x + 1, y: currentCoordinate.y }, previousCoordinate);
}
function canGoWest(mapLayout, currentCoordinate, previousCoordinate) {
    return currentCoordinate.x - 1 >= 0 &&
        (mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.NorthToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.SouthToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.EastToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x] === day_ten_models_1.MapTile.Start) &&
        (mapLayout[currentCoordinate.y][currentCoordinate.x - 1] === day_ten_models_1.MapTile.NorthToEast ||
            mapLayout[currentCoordinate.y][currentCoordinate.x - 1] === day_ten_models_1.MapTile.SouthToEast ||
            mapLayout[currentCoordinate.y][currentCoordinate.x - 1] === day_ten_models_1.MapTile.EastToWest ||
            mapLayout[currentCoordinate.y][currentCoordinate.x - 1] === day_ten_models_1.MapTile.Start) &&
        !(0, lodash_1.isEqual)({ x: currentCoordinate.x - 1, y: currentCoordinate.y }, previousCoordinate);
}
function seeIfTileIsInsideLoop(coord) {
    const maxX = Math.max(...SHAPE.lines.map((line) => line.start.x));
    const maxY = Math.max(...SHAPE.lines.map((line) => line.start.y));
    const minX = Math.min(...SHAPE.lines.map((line) => line.start.x));
    const minY = Math.min(...SHAPE.lines.map((line) => line.start.y));
    if (coord.x > maxX || coord.y > maxY || coord.x < minX || coord.y < minY) {
        return false;
    }
    return isInside(coord);
}
function isInside(coord) {
    const newMap = (0, lodash_1.cloneDeep)(MAP).map((row) => row.map((tile) => tile === day_ten_models_1.MapTile.EastToWest ? day_ten_models_1.MapTile.Ground : tile));
    // Check every point to the left of coord
    let line = '';
    for (let x = coord.x - 1; x >= 0; x--) {
        if (newMap[coord.y][x] === day_ten_models_1.MapTile.NorthToSouth ||
            newMap[coord.y][x] === day_ten_models_1.MapTile.NorthToEast ||
            newMap[coord.y][x] === day_ten_models_1.MapTile.NorthToWest ||
            newMap[coord.y][x] === day_ten_models_1.MapTile.SouthToEast ||
            newMap[coord.y][x] === day_ten_models_1.MapTile.SouthToWest) {
            line = newMap[coord.y][x] + line;
        }
    }
    line = line.replaceAll('L7', '|').replaceAll('FJ', '|').replaceAll('LJ', '').replaceAll('F7', '');
    return line.length === 0 ? false : Math.floor(line.length) % 2 !== 0;
}
