<script>
import PolarPlot from './PolarPlot.svelte';
import Sailnumber from './Sailnumber.svelte';
import { getBoat } from '../api.js';

export let sailnumber;
export let mirrored;

let boat;

async function loadBoat(sailnumber) {
    boat = await getBoat(sailnumber);
}

$: sailnumber && loadBoat(sailnumber);
</script>

{#if boat}
    <Sailnumber number={sailnumber} />
    {boat.name}
    mirrored={mirrored}
    <PolarPlot {boat} {mirrored} />
{/if}
