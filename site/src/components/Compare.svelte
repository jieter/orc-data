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

function loadBoats(sailnumbers) {
    if (sailnumbers.some((x) => x)) {
        window.location.hash = `${PREFIX}${sailnumbers.join(SEPARATOR)}`;
    }
    return sailnumbers;
}

$: sailnumbers = loadBoats([sailnumberA, sailnumberB]);
</script>

<div class="container-fluid">
    <div class="row p-2 row-cols-2">
        <div class="col">
            <BoatSelect bind:sailnumber={sailnumberA} />
        </div>
        <div class="col">
            <BoatSelect bind:sailnumber={sailnumberB} />
        </div>
    </div>
    <div class="row p-2 row-cols-2">
        {#each sailnumbers as sailnumber, i}
            <div class="col">
                <CompareBoat {sailnumber} mirrored={i == 0} />
            </div>
        {/each}
    </div>
</div>
