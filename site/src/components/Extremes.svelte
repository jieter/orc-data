<script>
import { onMount } from 'svelte';

import PolarPlot from './PolarPlot.svelte';
import Sailnumber from './Sailnumber.svelte';
import { getBoat, getExtremes, getRandomBoat, indexLoader } from '../api.js';

let hoverSailnumber;
let boat;

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

<div class="container-fluid">
    <div class="row gx-5">
        <div class="col col-sm-8 p-4">
            <p>
                Polar diagrams for {#await indexLoader()}lots{:then index}{index.length}{/await} sailyachts with ORC certificates.
                Select one of the boats below, search by sailnumber, name or type or select a
                <a href="#random" class="link-primary">random boat</a>.
            </p>

            <p>
                Questions/suggestions? Contact me on
                <a href="https://github.com/jieter/orc-data">GitHub</a>. All data is fetched from
                <a href="https://orc.org/index.asp?id=44">ORC.org</a>.
            </p>
        </div>
        <div class="col-sm-4 p-4">
            <a href="#random" class="btn btn-primary">Random boat</a>
        </div>
    </div>

    <div class="row gx-5">
        <div class="col col-sm-8 p-4">
            {#await getExtremes() then extremes}
                <div class="row">
                    {#each Object.entries(extremes) as [extreme, boats]}
                        <div class="col-md-6">
                            <h5>{labels[extreme]}</h5>

                            <ul class="list-unstyled">
                                {#each boats as [number, name, type, value]}
                                    <li class="boat" on:mouseenter={() => loadBoat(number)}>
                                        <a href="#{number}" class="link">
                                            <Sailnumber {number} />
                                            {name || '?'}
                                            <span class="float-end">{value < 100 ? value.toFixed(2) : value}</span>
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    {/each}
                </div>
            {/await}
        </div>
        <div class="col-sm-4 p-4">
            {#if boat}
                <h6><Sailnumber number={boat.sailnumber} /> {boat.name} ({boat.boat.type})</h6>

                <PolarPlot boats={[boat]} />
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

h6 {
    white-space: nowrap;
}

.link {
    color: inherit;
    text-decoration: none;
}
</style>
