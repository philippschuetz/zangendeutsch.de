<script lang="ts">
    import DictionaryView from '../../../components/DictionaryView.svelte';
    import {typedDictPliersenglish} from "$lib/dataAccess";
</script>

<svelte:head>
    <title>zangendeutsch.de - Zangendeutsch Wörterbuch</title>
    <meta
            name="description"
            content="Pliersenglish Dictionary"
    />
</svelte:head>

<DictionaryView dictionary={typedDictPliersenglish}/>