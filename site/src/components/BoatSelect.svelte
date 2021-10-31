<script>
import Svelecte from 'svelecte';
import { indexLoader } from '../api.js';

export let sailnumber = undefined;

let selection = null;

async function loadSelection(sailnumber) {
    const index = await indexLoader();
    if (sailnumber && !['extremes', 'customplot'].includes(sailnumber)) {
        selection = [index.find((element) => element[0] == sailnumber)];
    } else {
        selection = null;
    }
}
$: sailnumber && loadSelection(sailnumber);
function renderer(item) {
    const [number, name, type] = item;
    return `<span class="sailnumber">${number}</span> ${name} (${type})`;
}
</script>

{#await indexLoader() then options}
    <Svelecte
        {options}
        placeholder="Sailnumber, name or type"
        virtualList={true}
        bind:selection
        {renderer}
        on:change={(event) => {
            if (event.detail) {
                sailnumber = event.detail[0];
            }
        }}
    />
{:catch}
    Error loading index
{/await}

<style>
:global(.svelecte-control) {
    min-width: 275px;
}
</style>
