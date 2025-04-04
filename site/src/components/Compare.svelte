<script>
import { onMount } from 'svelte';

import BoatSelect from './BoatSelect.svelte';
import PolarPlot from './PolarPlot.svelte';
import { getBoat } from '../api.js';
import Sailnumber from './Sailnumber.svelte';

let sailnumberA = undefined;
let sailnumberB = undefined;
let boatA = undefined;
let boatB = undefined;

let sailnumbers = [];
const PREFIX = 'compare-';
const SEPARATOR = '|';

onMount(() => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith(PREFIX)) {
        [sailnumberA, sailnumberB] = hash.substring(PREFIX.length).split(SEPARATOR);
    }
});

function updateUrl(sailnumbers) {
    if (sailnumbers.some((x) => x)) {
        window.location.hash = `${PREFIX}${sailnumbers.join(SEPARATOR)}`;
    }
    return sailnumbers;
}
async function loadBoatA(sailnumber) {
    if (sailnumber === undefined) {
        target = undefined;
        return
    }
    boatA = await getBoat(sailnumber);
}
async function loadBoatB(sailnumber) {
    if (sailnumber === undefined) {
        target = undefined;
        return
    }
    boatB = await getBoat(sailnumber);
}

$: sailnumbers = updateUrl([sailnumberA, sailnumberB]);
$: sailnumberA && loadBoatA(sailnumberA);
$: sailnumberB && loadBoatB(sailnumberB);

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

        <div class="col">
            {#if boatA}
                <Sailnumber number={sailnumberA} />
                {boatA.name}
            {/if}
        </div>
        <div class="col">
            {#if boatB}
                <Sailnumber number={sailnumberB} />
                {boatB.name}
            {/if}
        </div>
    </div>
    <div class="row p-2">
        <div class="col-sm-8">
            <PolarPlot boats={[boatA, boatB]} />
        </div>
        <div class="col-sm-4">
            boe
        </div>
    </div>
</div>
