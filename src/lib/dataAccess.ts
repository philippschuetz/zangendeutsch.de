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
    columnNameNote: string
    otherDictUrl: string

    constructor(dictionary: Word[], columnNameOriginal: string, columnNameTranslations: string, columnNameNote: string, otherDictUrl: string) {
        this.dictionary = dictionary
        this.columnNameOriginal = columnNameOriginal
        this.columnNameTranslations = columnNameTranslations
        this.columnNameNote = columnNameNote
        this.otherDictUrl = otherDictUrl
    }

    queryOriginalTranslations(query: string): Word[] {
        if (query === '') {
            return this.getAll();
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
    "Zangendeutsch",
    "Anmerkungen",
    "/pliersenglish"
);
export const typedDictPliersenglish = new Dictionary(
    dictionaryPliersenglish,
    "Teutonic",
    "Pliersenglish",
    "Notes",
    "/"
);