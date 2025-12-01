import {json} from '@sveltejs/kit';
import {typedDictPliersenglish} from '$lib/dataAccess';

export function GET({url}) {
    const query: string = url.searchParams.get('query') ?? '';
    let matches = typedDictPliersenglish.queryOriginalTranslations(query);

    const response = {
        'query': query,
        'matches': matches
    };
    return json(response);
}