<script>
import { onMount } from 'svelte';

import PolarPlot from './PolarPlot.svelte';
import Sailnumber from './Sailnumber.svelte';
import BoatSelect from './BoatSelect.svelte';

import { getBoat } from '../api.js';

export let sailnumberA = undefined;
export let sailnumberB = undefined;

let boats = [];

const PREFIX = 'compare-';
const SEPARATOR = '|';

onMount(() => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith(PREFIX)) {
        [sailnumberA, sailnumberB] = hash.substring(PREFIX.length).split(SEPARATOR);
    }
});
function loadBoats(sailnumbers) {
    boats = sailnumbers.map((sailnumber) => {
        if (sailnumber) {
            return getBoat(sailnumber);
        } else {
            return undefined;
        }
    });
    if (sailnumbers.every((x) => x)) {
        window.location.hash = `${PREFIX}${sailnumbers.join(SEPARATOR)}`;
    }
}

$: loadBoats([sailnumberA, sailnumberB]);
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
    {#each boats as boatPromise}
        <div class="col">
            {#await boatPromise then boat}
                {#if boat}
                    <Sailnumber number={boat.sailnumber} />
                    {boat.name}
                    <PolarPlot {boat} />
                {/if}
            {/await}
        </div>
    {/each}
</div>
