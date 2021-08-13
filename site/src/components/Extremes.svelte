<script>
import { onMount } from 'svelte';

import Sailnumber from './Sailnumber.svelte';
import PolarPlot from './PolarPlot.svelte';

import { getBoat, getExtremes, getRandomBoat } from '../api.js';

export let sailnumber;

let hoverSailnumber;
let boat;

async function loadRandomBoat() {
    sailnumber = await getRandomBoat();
}

onMount(async () => {
    hoverSailnumber = await getRandomBoat();
});

async function loadBoat(number) {
    if (number) {
        boat = await getBoat(number);
    }
}

$: loadBoat(hoverSailnumber);

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
        <div class="col col-md-8 p-4">
            <p>
                Polar diagrams for sailyachts with ORC certificates. Select one of the boats below, search by
                sailnumber, name or type or select a
                <span on:click={loadRandomBoat} class="link-primary">random boat</span>.
            </p>

            <p>
                Questions/suggestions? Contact me on <a href="https://twitter.com/jietermanis">Twitter</a> or
                <a href="https://github.com/jieter/orc-data">GitHub</a>. All data is fetched from
                <a href="https://orc.org/index.asp?id=44">ORC.org</a>.
            </p>
        </div>
        <div class="col-md-4 p-4">
            <button class="btn btn-primary" on:click={loadRandomBoat}>Random boat</button>
        </div>
    </div>

    <div class="row gx-5">
        <div class="col col-md-8 p-4">
            {#await getExtremes() then extremes}
                <div class="row">
                    {#each Object.entries(extremes) as [extreme, boats]}
                        <div class="col-md-6">
                            <h5>{labels[extreme]}</h5>

                            <ul class="list-unstyled">
                                {#each boats as [number, name, type, value]}
                                    <li
                                        class="boat"
                                        on:click={() => (sailnumber = number)}
                                        on:mouseenter={() => loadBoat(number)}
                                    >
                                        <Sailnumber {number} />
                                        {name || '?'}
                                        <span class="float-end">{value}</span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    {/each}
                </div>
            {/await}
        </div>
        <div class="col-md-4 p-4">
            {#if boat}
                <h6><Sailnumber number={boat.sailnumber} /> {boat.name} ({boat.boat.type})</h6>

                <PolarPlot {boat} />
            {/if}
        </div>
    </div>
</div>

<style>
.link-primary,
.boat {
    cursor: pointer;
}

.boat {
    list-style-type: none;
    padding: 1px 2px;
}
.boat:hover {
    background-color: #eee;
}
</style>
