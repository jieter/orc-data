<script>
import Boat from './components/Boat.svelte';
import { getRandomBoat } from './search.js';

export let sailnumber;
let boat;

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
                            {#each Object.entries(extremes) as [extreme, boats]}
                                <div class="col-md-4">
                                    <h5>{labels[extreme]}</h5>

                                    <table class="table table-sm">
                                        {#each boats as [boat, name, type, value]}
                                            <tr
                                                on:click={() => {
                                                    sailnumber = boat;
                                                }}
                                            >
                                                <td>
                                                    <span class="sailnumber">{boat.substr(0, 3) == boat.substr(4, 3) ? boat.substr(4) : boat}</span>
                                                    {name || '?'}
                                                </td>
                                                <td class="text-end">{value}</td>
                                            </tr>
                                        {/each}
                                    </table>
                                </div>
                            {/each}
                        </div>
                    {/await}
                </div>
            </div>
            <hr />

            All data is fetched from <a href="https://orc.org/index.asp?id=44">ORC.org</a>.
        </div>
    {/if}
</div>

<style>
</style>
