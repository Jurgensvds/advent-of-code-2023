export interface GalaxyCoord {
    x: number;
    y: number;
}

export interface EmptySpace {
    cols: number[];
    rows: number[];
}

export interface PathBetweenGalaxies {
    start: GalaxyCoord;
    end: GalaxyCoord;
    path: GalaxyCoord[];
    pathLength: number;
}