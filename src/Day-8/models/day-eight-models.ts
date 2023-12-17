export interface Instructions {
    directions: string[];
    map: Map<string, Direction>;
}

export interface Direction {
    left: string;
    right: string;
}