<script>
import Sailnumber from './Sailnumber.svelte';
import PolarPlot from './PolarPlot.svelte';

import { getBoat, getExtremes, getRandomBoat } from '../api.js';

export let sailnumber;
let hoverBoat;

async function randomBoat() {
    sailnumber = await getRandomBoat();
}

const labels = {
    max_speed: 'Greatest maximum speed (kts)',
    min_speed: 'Smallest maximum speed (kts)',
    max_length: 'Greatest length over all (m)',
    max_displacement: 'Greatest displacement (kg)',
    max_draft: 'Greatest draft (m)',
};
</script>

<div class="container px-4">
    <div class="row gx-5">
        <div class="col alig-self-center">
            <button class="btn btn-primary" on:click={randomBoat}>Random boat</button>

            {#await getExtremes() then extremes}
                <div class="row">
                    <div class="col-md-8">
                        <div class="row">
                            {#each Object.entries(extremes) as [extreme, boats]}
                                <div class="col-md-6">
                                    <h5>{labels[extreme]}</h5>

                                    <table class="table table-sm">
                                        {#each boats as [number, name, type, value]}
                                            <tr
                                                class="boat"
                                                on:click={() => {
                                                    sailnumber = number;
                                                }}
                                                on:mouseenter={async () => {
                                                    hoverBoat = await getBoat(number);
                                                }}
                                            >
                                                <td>
                                                    <Sailnumber {number} />
                                                    {name || '?'}
                                                </td>
                                                <td class="text-end">{value}</td>
                                            </tr>
                                        {/each}
                                    </table>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="col-md-4">
                        {#if hoverBoat}
                            <h6><Sailnumber number={hoverBoat.sailnumber} /> {hoverBoat.name}</h6>

                            <PolarPlot boat={hoverBoat} />
                        {:else}
                            Hover over a boat to reveal its polar...
                        {/if}
                    </div>
                </div>
            {/await}
        </div>
    </div>
    <hr />

    All data is fetched from
    <a href="https://orc.org/index.asp?id=44">ORC.org</a>.
</div>

<style>
.boat td {
    cursor: pointer;
}
.boat:hover {
    background-color: #eee;
}
</style>
