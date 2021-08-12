<script>
import Boat from './components/Boat.svelte';
import { getRandomBoat } from './search.js';
import PolarPlot from './components/PolarPlot.svelte';
import Sailnumber from './components/Sailnumber.svelte';

export let sailnumber;
let boat;
let hoverBoat;

async function loadBoat(sailnumber) {
    return fetch(`data/${sailnumber}.json`).then((response) => response.json());
}

async function getExtremes() {
    return fetch('extremes.json').then((response) => response.json());
}

async function randomBoat() {
    sailnumber = await getRandomBoat();
}

const labels = {
    max_speed: 'Greatest maximum speed',
    min_speed: 'Smallest maximum speed',
    max_length: 'Greatest length over all',
    max_displacement: 'Greatest displacement',
    max_draft: 'Greatest draft',
};

$: {
    if (sailnumber) {
        boat = loadBoat(sailnumber);
    }
}
</script>

<div>
    {#if sailnumber}
        {#await boat}
            Loading {sailnumber}
        {:then value}
            <Boat boat={value} />
        {/await}
    {:else}
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
                                                            hoverBoat = await loadBoat(number);
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
    {/if}
</div>

<style>
.boat td {
    cursor: pointer;
}
.boat:hover {
    background-color: #eee;
}
</style>
