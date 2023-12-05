import { promises as fs } from 'fs';

export async function readTextFile(filePath: string, dummyData: boolean = false): Promise<string> {
    try {
        filePath = dummyData ? filePath.replace('input', 'test') : filePath;
        const data = await fs.readFile(filePath, { encoding: 'utf-8' });
        return data.trim();
    } catch (error) {
        console.error('Error reading file:', error);
        return '';
    }
}

// Replace 'path/to/your/file.txt' with the actual file path

