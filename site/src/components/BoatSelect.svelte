<script>
import Svelecte from 'svelecte';
import { indexLoader } from '../api.js';

export let sailnumber = undefined;

let value = null;

$: value = !['extremes', 'customplot'].includes(sailnumber) ? sailnumber : null;

function renderer({ sailnumber, name, type }) {
    return `<span class="sailnumber">${sailnumber}</span> ${name} (${type})`;
}
</script>

{#await indexLoader() then options}
    <Svelecte {options} placeholder="Sailnumber, name or type" virtualList={true} bind:value {renderer} />
{:catch}
    Error loading index
{/await}

<style>
:global(.svelecte-control) {
    min-width: 275px;
}
</style>
