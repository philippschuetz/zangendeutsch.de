<script lang="ts">
    import DictionaryView from '../../components/DictionaryView.svelte';
    import {typedDictZangendeutsch} from "#lib/dataAccess.ts";
</script>

<svelte:head>
    <title>zangendeutsch.de - Zangendeutsch Wörterbuch</title>
    <meta
            name="description"
            content="Zangendeutsch Wörterbuch"
    />
</svelte:head>

<DictionaryView dictionary={typedDictZangendeutsch}/>
