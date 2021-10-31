<script>
import { onMount } from 'svelte';

import Boat from './components/Boat.svelte';
import BoatSelect from './components/BoatSelect.svelte';
import Compare from './components/Compare.svelte';
import CustomPlot from './components/CustomPlot.svelte';
import Extremes from './components/Extremes.svelte';

export let route = 'extremes';
export let sailnumber;

function onhashchange() {
    const hash = window.location.hash;

    route = hash.length > 1 ? hash.substring(1) : undefined;

    if (['extremes', 'customplot', 'compare'].some((val) => route.startsWith(val))) {
        sailnumber = null;
    } else {
        sailnumber = route;
        route = 'boat';
    }
}

onMount(() => {
    window.addEventListener('hashchange', onhashchange, false);
    return () => window.removeEventListener('hashchange', onhashchange, false);
});

$: {
    if (sailnumber && !['extremes', 'customplot', 'compare'].some((val) => sailnumber.startsWith(val))) {
        window.location.hash = sailnumber;
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
                {#if !sailnumber || (sailnumber && !sailnumber.startsWith('compare'))}
                    <li class="nav-item d-block-md">
                        <BoatSelect bind:sailnumber />
                    </li>
                {/if}
                <li class="nav-item"><a href="#compare" class="nav-link">Compare boats</a></li>
                <li class="nav-item"><a href="#customplot" class="nav-link">Plot custom CSV</a></li>
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
{#if route == 'extremes'}
    <Extremes bind:sailnumber />
{:else if route == 'customplot'}
    <CustomPlot />
{:else if route.startsWith('compare')}
    <Compare />
{:else}
    <Boat {sailnumber} />
{/if}
