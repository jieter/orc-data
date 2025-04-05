<script>
import { onMount } from 'svelte';

import Boat from './components/Boat.svelte';
import BoatSelect from './components/BoatSelect.svelte';
import Compare from './components/Compare.svelte';
import CustomPlot from './components/CustomPlot.svelte';
import Extremes from './components/Extremes.svelte';
import Table from './components/Table.svelte';

export let route = 'extremes';
export let sailnumber = null;

// A route is custom if it starts with one of the route prefixes.
const prefixes = ['extremes', 'customplot', 'compare', 'type'];
const isCustomRoute = (value) => prefixes.some((item) => value.startsWith(item));

function onhashchange() {
    const hash = window.location.hash;
    route = hash.length > 1 ? hash.substring(1) : 'extremes';

    if (isCustomRoute(route)) {
        sailnumber = null;
    } else {
        sailnumber = route;
        route = 'boat';
    }
}

onMount(() => {
    window.addEventListener('hashchange', onhashchange, false);
    onhashchange();
    return () => window.removeEventListener('hashchange', onhashchange, false);
});

$: {
    if (sailnumber && !isCustomRoute(sailnumber)) {
        window.location.hash = sailnumber;
    }
}
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#extremes">ORC sailboat data (2025)</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {#if !sailnumber || (sailnumber && !sailnumber.startsWith('compare'))}
                    <li class="nav-item d-block-md">
                        <BoatSelect bind:sailnumber />
                    </li>
                {/if}
                <li class="nav-item"><a href="#compare-{sailnumber || ''}" class="nav-link">Compare boats</a></li>
                <li class="nav-item"><a href="#customplot" class="nav-link">Plot custom CSV</a></li>
            </ul>

            <div class="d-flex navbar-text">
                <a href="https://github.com/jieter/orc-data/">GitHub</a>,
                <a href="https://orc.org/index.asp?id=44">Data &copy; ORC.org</a>
            </div>
            &nbsp;
        </div>
    </div>
</nav>

{#if route == 'extremes'}
    <Extremes bind:sailnumber />
{:else if route == 'customplot'}
    <CustomPlot />
{:else if route.startsWith('compare')}
    <Compare />
{:else if route.startsWith('type')}
    <Table q={decodeURIComponent(route.substring(5))} />
{:else}
    <Boat {sailnumber} />
{/if}
