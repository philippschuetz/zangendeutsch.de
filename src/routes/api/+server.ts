import {typedDictZangendeutsch} from '#lib/dataAccess.ts';

export function GET({url}) {
    const query: string = url.searchParams.get('query') ?? '';
    let matches = typedDictZangendeutsch.queryOriginalTranslations(query);

    const response = {
        'query': query,
        'matches': matches
    };
    return Response.json(response);
}
