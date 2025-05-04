<svelte:options accessors />

<script>
import { scaleLinear } from 'd3-scale';
import { symbol, symbolCircle } from 'd3-shape';

import VppCurves from './VppCurves.svelte';
import { DEG2RAD } from '../util.js';
export let boats = [];

let windowInnerHeight, windowInnerWidth;
let container;
let width = 300;
$: if (windowInnerWidth && container) {
    width = container.offsetWidth;
}
let height = 700;
$: if (windowInnerHeight && windowInnerWidth && container) {
    height = Math.min(width * 1.8, windowInnerHeight - 60);
}
$: radius = Math.min(height / 1.8 - 20, width) - 25;
$: rScale.range([0, radius]);

// Scale for the r axis, mapping SOG to plot coordinates
$: rScale = scaleLinear().domain([0, 10]).range([0, radius]);

const sogs = [2, 4, 6, 8, 10, 12, 14, 16];
const maxSogLabel = 10;
const angles = [0, 45, 52, 60, 75, 90, 110, 120, 135, 150, 165];

let highlight = undefined;
export const hover = (_newHighlight) => {
    highlight = _newHighlight;
};
$: container?.offsetWidth;
</script>

<svelte:window bind:innerHeight={windowInnerHeight} bind:innerWidth={windowInnerWidth}/>
<div bind:this={container}>
    <svg width={width} {height}>
        <g transform="translate(10, 300)">
            <!-- Speed rings -->
            {#each sogs as sog}
                <g class="r axis sog-{sog}">
                    <circle r={rScale(sog)}></circle>
                    {#if sog <= maxSogLabel}
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
            {#each boats as boat, index}
                {#if boat}
                    <VppCurves vpp={boat.vpp} {index} {rScale} />
                {/if}
            {/each}
            {#if highlight}
                <path
                    class="highlight tws-{highlight.tws}"
                    d={symbol(symbolCircle, 80)()}
                    transform="translate({rScale(highlight.sog) * Math.sin(highlight.cog * DEG2RAD)}, {rScale(
                        highlight.sog,
                    ) * -Math.cos(highlight.cog * DEG2RAD)})"
                    transition="400ms"
                    stroke-width="1" />
            {/if}
        </g>
    </svg>
</div>
