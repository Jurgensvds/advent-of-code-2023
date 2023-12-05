"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTextFile = void 0;
const fs_1 = require("fs");
function readTextFile(filePath, dummyData = false) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            filePath = dummyData ? filePath.replace('input', 'test') : filePath;
            const data = yield fs_1.promises.readFile(filePath, { encoding: 'utf-8' });
            return data.trim();
        }
        catch (error) {
            console.error('Error reading file:', error);
            return '';
        }
    });
}
exports.readTextFile = readTextFile;
// Replace 'path/to/your/file.txt' with the actual file path
