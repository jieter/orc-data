<script>
import { afterUpdate } from 'svelte';

import { scaleLinear } from 'd3-scale';

import { curveCardinal, lineRadial, symbol, symbolCircle, symbolDiamond } from 'd3-shape';

import VppSeries from './VppSeries.svelte';
export let boats = [];

let container;

const radius = 300;
const r = scaleLinear().domain([0, 10]).range([0, radius]);

const sogs = [2, 4, 6, 8, 10, 12, 14, 16];
const angles = [0, 45, 52, 60, 75, 90, 110, 120, 135, 150, 165];
</script>

<div bind:this={container}>
    <svg width={radius + 30} height={radius * 2 + 10}>
        <g transform="translate(10, 300)">
            <g>
                {#each sogs as sog}
                    <g class="r axis sog-{sog}">
                        <circle r={r(sog)}></circle>
                        {#if sog <= 10}
                            <text y={-r(sog) - 2} transform="rotate(25)" text-anchor="middle">
                                {sog} kts
                            </text>
                        {/if}
                    </g>
                {/each}
            </g>
            <g class="a axis">
                {#each angles as angle}
                    <g transform="rotate({angle - 90})">
                        <line x1={r(0)} x2={r(10)} />
                        <text class="xlabel" x={r(10) + 5} y={0} text-anchor="start" alignment-baseline="middle">
                            {angle}°
                        </text>
                    </g>
                {/each}
            </g>
            {#each boats as boat}
                {#if boat}
                    <VppSeries vpp={boat.vpp} {r} />
                {/if}
            {/each}
        </g>
    </svg>
</div>
<!-- <svelte:window on:resize={() => plot && plot.resize()} /> -->
