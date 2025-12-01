<script lang="ts">
    import {page} from '$app/state';
    import type {Word} from '$lib/dataAccess';

    let {dictionary} = $props();
    let search: string = $state('');
    let pagination: number = $state(1);
    const pageSize: number = 10;

    if (page.params.word === undefined) {
        search = '';
    } else {
        search = page.params.word;
    }

    let wordsDisplayed: Word[] = $derived(dictionary.getWords(search, pagination, pageSize));

    function first() {
        pagination = 1
    }

    function previous() {
        if (pagination > 1)
            pagination -= 1
    }

    function next() {
        pagination += 1
    }

    function last() {
        pagination = Math.floor(dictionary.getWordCount() / pageSize)
        if (dictionary.getWordCount() % pageSize !== 0)
            pagination += 1
    }
</script>

<article>
    <main class="container-fluid">
        <hgroup>
            <h1>zangendeutsch.de</h1>
            <input
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Suche"
                    bind:value={search}
            />
        </hgroup>
        <table>
            <thead>
            <tr>
                <th scope="col">{dictionary.columnNameOriginal}</th>
                <th scope="col">{dictionary.columnNameTranslations}</th>
                <th scope="col">Anmerkungen</th>
            </tr>
            </thead>
            <tbody>
            {#each wordsDisplayed as word}
                <tr>
                    <td>{word.original}</td>
                    <td>{word.translations.join(", ")}</td>
                    <td>{word.comment}</td>
                </tr>
            {/each}
            </tbody>
        </table>
        <div role="group">
            <div role="group">
                <button class="secondary outline" onclick={first}>Erste</button>
            </div>
            <div role="group">
                <button class="contrast outline" onclick={previous}>Vorherige</button>
                <button class="contrast outline" onclick={next}>Nächste</button>
            </div>
            <div role="group">
                <button class="secondary outline" onclick={last}>Letzte</button>
            </div>
        </div>
    </main>
    <footer>
        <a
                class="secondary"
                href="/privacy-policy">Datenschutzerklärung</a
        >
        <a
                class="secondary"
                href="https://github.com/philippschuetz/zangendeutsch.de">Mitmachen</a
        >
    </footer>
</article>

<style>
    h1 {
        text-align: center;
    }

    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
