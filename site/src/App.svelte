<script>
import Boat from './components/Boat.svelte';
import Extremes from './components/Extremes.svelte';
import Svelecte from 'svelecte';
import { onMount } from 'svelte';
import { getBoat, indexLoader } from './api.js';
import CustomPlot from './components/CustomPlot.svelte';

export let sailnumber;
let boat;

function onhashchange() {
    const hash = window.location.hash;
    sailnumber = hash.length > 1 ? hash.substring(1) : undefined;
}

function renderer(item) {
    const [number, name, type] = item;
    return `<span class="sailnumber">${number}</span> ${name}`;
}

onMount(() => {
    window.addEventListener('hashchange', onhashchange, false);
    return () => window.removeEventListener('hashchange', onhashchange, false);
});

$: {
    if (sailnumber && sailnumber != 'extremes' && sailnumber != 'customplot') {
        boat = getBoat(sailnumber);
        window.location.hash = sailnumber;
    } else {
        boat = undefined;
    }
}
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#extremes">ORC sailboat data (2021)</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a href="#customplot" class="nav-link">Plot custom CSV</a></li>
                <li class="nav-item d-block-md">
                    {#await indexLoader() then index}
                        <Svelecte
                            options={index}
                            placeholder="Sailnumber, name or type"
                            virtualList={true}
                            {renderer}
                            on:change={(event) => {
                                if (event.detail) {
                                    sailnumber = event.detail[0];
                                }
                            }}
                        />
                    {/await}
                </li>
            </ul>

            <div class="d-flex navbar-text">
                <a href="https://twitter.com/jietermanis">Twitter</a>,
                <a href="https://github.com/jieter/orc-data/">GitHub</a>,
                <a href="https://orc.org/index.asp?id=44">Data &copy; ORC.org</a>
            </div>
            &nbsp;
        </div>
    </div>
</nav>
{#if !sailnumber || sailnumber == 'extremes'}
    <Extremes bind:sailnumber />
{:else if sailnumber == 'customplot'}
    <CustomPlot />
{:else}
    {#await boat}
        Loading {sailnumber}
    {:then value}
        <Boat boat={value} />
    {/await}
{/if}

<style>
:global(.svelecte-control) {
    min-width: 250px;
}
</style>
