export interface AllMappedData {
    allSeeds: number[];
    seedToSoil: MapData[];
    soilToFertilizer: MapData[];
    fertilizerToWater: MapData[];
    waterToLight: MapData[];
    lightToTemperature: MapData[];
    temperatureToHumidity: MapData[];
    humidityToLocation: MapData[];
}

export interface MapData {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
}