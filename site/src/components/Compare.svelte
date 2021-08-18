<script>
import { onMount } from 'svelte';

import BoatSelect from './BoatSelect.svelte';
import CompareBoat from './CompareBoat.svelte';

let sailnumberA = undefined;
let sailnumberB = undefined;

let sailnumbers = [];

const PREFIX = 'compare-';
const SEPARATOR = '|';

onMount(() => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith(PREFIX)) {
        [sailnumberA, sailnumberB] = hash.substring(PREFIX.length).split(SEPARATOR);
    }
});

async function loadBoats(sailnumbers) {
    if (sailnumbers.every((x) => x)) {
        window.location.hash = `${PREFIX}${sailnumbers.join(SEPARATOR)}`;
    }
}

$: sailnumbers = [sailnumberA, sailnumberB];
</script>

<div class="row p-2">
    <div class="col">
        <BoatSelect bind:sailnumber={sailnumberA} />
    </div>
    <div class="col">
        <BoatSelect bind:sailnumber={sailnumberB} />
    </div>
</div>
<div class="row p-2">
    {#each sailnumbers as sailnumber}
        <div class="col">
            <CompareBoat {sailnumber} />
        </div>
    {/each}
</div>
