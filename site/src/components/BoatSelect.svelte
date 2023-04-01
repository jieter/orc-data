<script>
import Svelecte from 'svelecte';
import { indexLoader } from '../api.js';

export let sailnumber = undefined;

function renderer({ sailnumber, name, type }) {
    return `<span class="sailnumber">${sailnumber}</span> ${name} (${type})`;
}
</script>

{#await indexLoader() then options}
    <Svelecte {options} placeholder="Sailnumber, name or type" virtualList={true} bind:value={sailnumber} {renderer} />
{:catch}
    Error loading index
{/await}

<style>
:global(.svelecte-control) {
    min-width: 500px;
}

@media only screen and (max-width: 1300px) {
    :global(.svelecte-control) {
        min-width: 275px;
    }
}
</style>
