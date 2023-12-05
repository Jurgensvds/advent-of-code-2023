import { readTextFile } from "../file-reader";

let total = 0;

const wordNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export function main(filePath: string = 'src/Day-1/input.txt') {
    readTextFile(filePath, false).then((values) => {
        for(let value of values.split('\n')) {
            value = value.trim();
            if(value === '') {
                continue;
            }
            const firstNumberInString = getFirstNumberInString(value);
            const lastNumberInString = getLastNumberInString(value);
        
            total += Number(`${firstNumberInString}${lastNumberInString}`);
        }
    
        console.log(total);
    });
    
}

function getFirstNumberInString(string) {
    for(let i = 0; i < string.length; i++) {
        if(!isNaN(parseInt(string[i]))) {
            if(hasNumberWordInString(string.substring(0, i))) {
                return getNumberWordAsNumber(findFirstNumberWordInString(string.substring(0, i)));
            }
            return parseInt(string[i])
        }
    }

    return getNumberWordAsNumber(findFirstNumberWordInString(string));
}

function getLastNumberInString(string) {
    for(let i = string.length - 1; i >= 0; i--) {
        if(!isNaN(parseInt(string[i]))) {
            if(hasNumberWordInString(string.substring(i))) {
                return getNumberWordAsNumber(findLastNumberWordInString(string.substring(i, string.length)));
            }
            return parseInt(string[i]);
        }
    }

    return getNumberWordAsNumber(findLastNumberWordInString(string));
}

function hasNumberWordInString(string) {
    for(let word of wordNumbers) {
        if(string.includes(word)) {
            return true;
        }
    }
    return false;
}

function findFirstNumberWordInString(string) {
    const allNumberWords = findAllNumberWordsInString(string);
    let currentIndex = Infinity;
    let currentWord = '';

    for(let numberedWord of allNumberWords) {
        const index = string.indexOf(numberedWord);
        if(index < currentIndex) {
            currentIndex = index;
            currentWord = numberedWord;
        }
    }

    return currentWord;
}

function findLastNumberWordInString(string) {
    const allNumberWords = findAllNumberWordsInString(string);
    let currentIndex = -Infinity;
    let currentWord = '';

    for(let numberedWord of allNumberWords) {
        const index = string.lastIndexOf(numberedWord);
        if(index > currentIndex) {
            currentIndex = index;
            currentWord = numberedWord;
        }
    }

    return currentWord;
}

function getNumberWordAsNumber(string) {
    return wordNumbers.indexOf(string) + 1;
}

function findAllNumberWordsInString(string) {
    const allNumberWords = [];
    for(let i = 0; i < wordNumbers.length; i++) {
        if(string.includes(wordNumbers[i])) {
            allNumberWords.push(wordNumbers[i]);
        }
    }
    return allNumberWords;
}