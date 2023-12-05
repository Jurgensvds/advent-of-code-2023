"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTextFile = void 0;
const fs_1 = require("fs");
async function readTextFile(filePath, dummyData = false) {
    try {
        filePath = dummyData ? filePath.replace('input', 'test') : filePath;
        const data = await fs_1.promises.readFile(filePath, { encoding: 'utf-8' });
        return data.trim();
    }
    catch (error) {
        console.error('Error reading file:', error);
        return '';
    }
}
exports.readTextFile = readTextFile;
// Replace 'path/to/your/file.txt' with the actual file path
