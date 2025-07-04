<script lang="ts">
	import { page } from '$app/stores';
	import { queryOriginalTranslations, getAll } from '$lib/dataAccess';
	import type { Word } from '$lib/dataAccess';

	let search: string = '';
	let previousParam = ''; // used to detect changes in word param

	// set initial value for search
	if ($page.params.word === undefined) {
		search = '';
	} else {
		search = $page.params.word;
	}

	$: {
		if (
			$page.params.word !== undefined &&
			previousParam !== $page.params.word
		) {
			previousParam = $page.params.word;
			search = $page.params.word;
		}
	}

	let wordsDisplayed: Word[] = [];

	$: {
		wordsDisplayed = queryOriginalTranslations(search);
		if (wordsDisplayed.length === 0) {
			wordsDisplayed = getAll();
		}
	}
</script>

<svelte:head>
	<title>zangendeutsch.de - Zangendeutsch Wörterbuch</title>
	<meta
		name="description"
		content="Zangendeutsch Wörterbuch"
	/>
</svelte:head>

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
					<th scope="col">Angelsächsisch</th>
					<th scope="col">Zangendeutsch</th>
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
			<!-- <tfoot>
				<tr>
					<td>Angelsächsisch</td>
					<td>Eingedeutscht</td>
					<td>Anmerkungen</td>
				</tr>
			</tfoot> -->
		</table>
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
