<script>
import PolarPlot from './PolarPlot.svelte';
import Sailnumber from './Sailnumber.svelte';
import { getBoat } from '../api.js';

export let sailnumber;

let boat;

async function loadBoat(sailnumber) {
    boat = await getBoat(sailnumber);
}

$: sailnumber && loadBoat(sailnumber);
</script>

{#if boat}
    <Sailnumber number={sailnumber} />
    {boat.name}
    <PolarPlot {boat} />
{/if}
