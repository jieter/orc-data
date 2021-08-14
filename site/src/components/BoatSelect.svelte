<script>
import Svelecte from 'svelecte';
import { indexLoader } from '../api.js';

export let sailnumber = undefined;

function renderer(item) {
    const [number, name, type] = item;
    return `<span class="sailnumber">${number}</span> ${name}`;
}
</script>

{#await indexLoader() then index}
    <Svelecte
        options={index}
        placeholder="Sailnumber, name or type"
        virtualList={true}
        {renderer}
        on:change={(event) => {
            if (event.detail) {
                sailnumber = event.detail[0];
            }
        }}
    />
{/await}

<style>
:global(.svelecte-control) {
    min-width: 250px;
}
</style>
