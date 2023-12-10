export interface Shape {
    lines: Line[];
}

export interface Line {
    start: Coordinate;
    end: Coordinate;
}

export interface Coordinate {
    x: number;
    y: number;
}

export enum MapTile {
    NorthToSouth = '|',
    EastToWest = '-',
    NorthToEast = 'L',
    NorthToWest = 'J',
    SouthToWest = '7',
    SouthToEast = 'F',
    Ground = '.',
    Start = 'S',
    LoopPath = '■'
}