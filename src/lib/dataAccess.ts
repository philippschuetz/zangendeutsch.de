import {dictionaryZangendeutsch} from '$lib/dataZangendeutsch';
import {dictionaryPliersenglish} from '$lib/dataPliersenglish';

export interface Word {
    original: string;
    translations: string[];
    comment: string;
}

class Dictionary {
    dictionary: Word[]
    columnNameOriginal: string
    columnNameTranslations: string

    constructor(dictionary: Word[], columnNameOriginal: string, columnNameTranslations: string) {
        this.dictionary = dictionary
        this.columnNameOriginal = columnNameOriginal
        this.columnNameTranslations = columnNameTranslations
    }

    queryOriginalTranslations(query: string): Word[] {
        if (query === '') {
            return [];
        }
        query = query.toLowerCase();
        const entries = this.dictionary.filter(entry =>
            like(entry.original.toLowerCase(), query) ||
            entry.translations.some(translation => like(translation.toLowerCase(), query))
        );
        return entries.sort((a, b) => a.original.localeCompare(b.original));
    }

    getAll(): Word[] {
        return this.dictionary.sort((a, b) => a.original.localeCompare(b.original));
    }

    getWordCount(): number {
        return this.getAll().length
    }

    getWords(query: string, page: number, pageSize: number): Word[] {
        let words = this.queryOriginalTranslations(query);
        if (words.length === 0)
            words = this.getAll()
        const firstIndex = (page - 1) * pageSize;
        const lastIndex = firstIndex + pageSize;
        return words.slice(firstIndex, lastIndex)
    }
}

function like(word: string, wordToCheck: string): boolean {
    const words = word.split(' ');

    for (const singleWord of words) {
        if (singleWord.startsWith(wordToCheck)) {
            return true;
        }
    }
    return false;
}

export const typedDictZangendeutsch = new Dictionary(
    dictionaryZangendeutsch,
    "Angelsächsisch",
    "Zangendeutsch"
);
export const typedDictPliersenglish = new Dictionary(
    dictionaryPliersenglish,
    "Teutonic",
    "Pliersenglish"
);