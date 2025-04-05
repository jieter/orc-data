<script>
import { scaleLinear } from 'd3-scale';
import { curveCardinal, lineRadial, symbol, symbolCircle, symbolDiamond } from 'd3-shape';
import { afterUpdate } from 'svelte';
import { getContext, setContext } from 'svelte';

import VppSeries from './VppSeries.svelte';
export let boats = [];

let container;

const radius = 300;
const rScale = scaleLinear().domain([0, 10]).range([0, radius]);

let index = 0;
setContext('polarplot', {
    getScale: () => {
        return { rScale, index: index++ };
    },
});
const sogs = [2, 4, 6, 8, 10, 12, 14, 16];
const angles = [0, 45, 52, 60, 75, 90, 110, 120, 135, 150, 165];
</script>

<div bind:this={container}>
    <svg width={radius + 30} height={radius * 2 + 10}>
        <g transform="translate(10, 300)">
            <!-- Speed rings -->
            {#each sogs as sog}
                <g class="r axis sog-{sog}">
                    <circle r={rScale(sog)}></circle>
                    {#if sog <= 10}
                        <text y={-rScale(sog) - 2} transform="rotate(25)" text-anchor="middle">
                            {sog} kts
                        </text>
                    {/if}
                </g>
            {/each}
            <!-- Course lines -->
            {#each angles as angle}
                <g class="a axis" transform="rotate({angle - 90})">
                    <line x1={rScale(0)} x2={rScale(10)} />
                    <text class="xlabel" x={rScale(10) + 5} y={0} text-anchor="start" alignment-baseline="middle">
                        {angle}°
                    </text>
                </g>
            {/each}
            {#each boats as boat}
                {#if boat}
                    <VppSeries vpp={boat.vpp} />
                {/if}
            {/each}
        </g>
    </svg>
</div>
<!-- <svelte:window on:resize={() => plot && plot.resize()} /> -->
