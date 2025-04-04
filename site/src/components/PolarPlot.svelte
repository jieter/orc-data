<script>
import { afterUpdate } from 'svelte';

import { polarplot } from '../polarplot.js';

export let boats = [];

let container;
let plot;

afterUpdate(() => {
    if (!plot) {
        plot = polarplot(container);
    }
    if (boats) {
        let series = boats.filter((x) => x !== undefined).map((boat) => boat.vpp);
        plot.render(series);
    }
});
</script>

<div bind:this={container} />
<svelte:window on:resize={() => plot && plot.resize()} />
