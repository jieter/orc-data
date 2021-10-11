<script>
import { afterUpdate } from 'svelte';

import { polarplot } from '../polarplot.js';

export let boat;
export let mirrored = false;

let container;
let plot;

afterUpdate(() => {
    if (!plot) {
        plot = polarplot(container, mirrored);
    }
    plot.render(boat);
});
</script>

<div bind:this={container} />
<svelte:window on:resize={() => plot && plot.resize()} />
