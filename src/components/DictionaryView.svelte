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
    function getPrevious() {
        if (pagination > 1)
            return pagination - 1
        else return 1
    }

    function next() {
        pagination += 1
    }
    function getNext() {
        return pagination + 1
    }

    function getLast() {
        let last = Math.floor(dictionary.getWordCount() / pageSize)
        if (dictionary.getWordCount() % pageSize !== 0)
            last += 1
        return last
    }

    function setPage(n: number) {
        pagination = n
    }
</script>

<article>
    <main class="container-fluid">
        <h1>zangendeutsch.de</h1>
        <input
                type="search"
                id="search"
                name="search"
                placeholder="Suche"
                bind:value={search}
        />
        <table>
            <thead>
            <tr>
                <th scope="col">{dictionary.columnNameOriginal} <a class="contrast" href="{dictionary.otherDictUrl}">⇄</a></th>
                <th scope="col">{dictionary.columnNameTranslations} <a class="contrast" href="{dictionary.otherDictUrl}">⇄</a></th>
                <th scope="col">{dictionary.columnNameNote}</th>
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
        <div id="pagination">
            {#if pagination != 1}
            <div>
                <a class="secondary" href="#" onclick={previous}>« Vorherige</a>
            </div>
            <span>·</span>
            {:else if pagination == 1}
            <div><a class="contrast" href="#" onclick={() => setPage(1)}>1</a></div>
            <div><a class="secondary" href="#" onclick={() => setPage(2)}>2</a></div>
            <div><a class="secondary" href="#" onclick={() => setPage(3)}>3</a></div>
            {/if}

            {#if pagination > 1 && pagination < getLast()}
            <div><a class="secondary" href="#" onclick={() => previous()}>{getPrevious()}</a></div>
            <div><a class="contrast" href="#" onclick={() => pagination = pagination}>{pagination}</a></div>
            <div><a class="secondary" href="#" onclick={() => next()}>{getNext()}</a></div>
            {/if}

            {#if pagination != getLast()}
            <span>·</span>
            <div>
                <a class="secondary" href="#" onclick={next}>Nächste »</a>
            </div>
            {:else if pagination == getLast()}
            <div><a class="secondary" href="#" onclick={() => setPage(getLast()-2)}>{getLast()-2}</a></div>
            <div><a class="secondary" href="#" onclick={() => setPage(getLast()-1)}>{getLast()-1}</a></div>
            <div><a class="contrast" href="#" onclick={() => setPage(getLast())}>{getLast()}</a></div>
            {/if}
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

    #pagination {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;
        justify-content: center;
    }

    #pagination > div {
        cursor: pointer;
    }

    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
