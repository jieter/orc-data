<script>
import Svelecte from 'svelecte';

import { index } from '../api.js';

export let sailnumber = undefined;

function renderer({ sailnumber, name, type }) {
    return `<span class="sailnumber">${sailnumber}</span> ${name} (${type})`;
}
</script>

<Svelecte
    options={$index}
    placeholder="Sailnumber, name or type"
    virtualList={true}
    bind:value={sailnumber}
    {renderer} />

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
