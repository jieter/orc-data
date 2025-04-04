<script>
import { onMount } from 'svelte';

import BoatSelect from './BoatSelect.svelte';
import LineLegend from './LineLegend.svelte';
import PolarPlot from './PolarPlot.svelte';
import Sailnumber from './Sailnumber.svelte';
import { getBoat } from '../api.js';
import { max } from 'd3-array';

let sailnumberA = undefined;
let sailnumberB = undefined;
let boatA = undefined;
let boatB = undefined;

let sailnumbers = [];
const PREFIX = 'compare-';
const SEPARATOR = '|';

onMount(() => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith(PREFIX)) {
        [sailnumberA, sailnumberB] = hash.substring(PREFIX.length).split(SEPARATOR);
    }
});

function updateUrl(sailnumbers) {
    if (sailnumbers.some((x) => x)) {
        window.location.hash = `${PREFIX}${sailnumbers.join(SEPARATOR)}`;
    }
    return sailnumbers;
}
async function loadBoatA(sailnumber) {
    if (sailnumber === undefined) {
        target = undefined;
        return;
    }
    boatA = await getBoat(sailnumber);
}
async function loadBoatB(sailnumber) {
    if (sailnumber === undefined) {
        target = undefined;
        return;
    }
    boatB = await getBoat(sailnumber);
}

$: sailnumbers = updateUrl([sailnumberA, sailnumberB]);
$: sailnumberA && loadBoatA(sailnumberA);
$: sailnumberB && loadBoatB(sailnumberB);

function topSpeed(boat) {
    if (!boat) {
        return;
    }
    const vpp = boat.vpp;
    return Math.max(...vpp.angles.map((angle) => Math.max(...vpp[angle])));
}
const rows = [
    { label: 'Name', value: (boat) => boat?.name },
    { label: 'Type', value: (boat) => boat?.boat.type },
    { label: 'Year', value: (boat) => boat?.boat.year },
    { label: 'Designer', value: (boat) => boat?.boat.designer },
    { label: 'Builder', value: (boat) => boat?.boat.builder },
    { separator: true },
    { label: 'LOA', value: (boat) => boat?.boat.sizes.loa, suffix: 'm' },
    { label: 'Beam', value: (boat) => boat?.boat.sizes.beam, suffix: 'm' },
    { label: 'Draft', value: (boat) => boat?.boat.sizes.draft, suffix: 'm' },
    { label: 'Displacement', value: (boat) => boat?.boat.sizes.displacement, suffix: 'kg' },
    { label: 'Wetted surface', value: (boat) => boat?.boat.sizes.wetted_surface, suffix: 'm<sup>2</sup>' },
    { separator: true },
    { label: 'Main', value: (boat) => boat?.boat.sizes.main, suffix: 'm<sup>2</sup>' },
    { label: 'Genoa', value: (boat) => boat?.boat.sizes.genoa, suffix: 'm<sup>2</sup>' },
    { label: 'Spinnaker', value: (boat) => boat?.boat.sizes.spinnaker, suffix: 'm<sup>2</sup>' },
    { label: 'Spinnaker&nbsp;asym', value: (boat) => boat?.boat.sizes.spinnaker_asym, suffix: 'm<sup>2</sup>' },
    { separator: true },
    { label: 'GPH', value: (boat) => boat?.rating.gph },
    { label: 'OSN', value: (boat) => boat?.rating.osn },
    { label: 'Top speed', value: topSpeed, suffix: 'kts' },
];
</script>

<div class="container-fluid">
    <div class="row p-2 row-cols-2">
        <div class="col">
            <BoatSelect bind:sailnumber={sailnumberA} />
        </div>
        <div class="col">
            <BoatSelect bind:sailnumber={sailnumberB} />
        </div>
    </div>
    <div class="row p-2 row-cols-2"></div>
    <div class="row p-2">
        <div class="col-sm-6">
            <PolarPlot boats={[boatA, boatB]} />
        </div>
        <div class="col-sm-4">
            <div class="row">
                <table>
                    <tr>
                        <th></th>
                        <td><LineLegend series={0} /></td>
                        <td><LineLegend series={1} /></td>
                    </tr>
                    <tr>
                        <td>Sailnumber</td>
                        <td>
                            <a href="#{sailnumberA}">
                                <Sailnumber number={sailnumberA} />
                            </a>
                        </td>
                        <td>
                            <a href="#{sailnumberB}">
                                <Sailnumber number={sailnumberB} />
                            </a>
                        </td>
                    </tr>
                    {#each rows as row}
                        {#if row.separator}
                            <tr><td colspan="3" class="separator"></td></tr>
                        {:else}
                            <tr>
                                <td>{@html row.label}</td>
                                <td class={row.suffix ? 'text-end' : ''}>
                                    {#if row.value(boatA)}
                                        {row.value(boatA)}{@html row.suffix || ''}
                                    {:else}
                                        -
                                    {/if}
                                </td>
                                <td class={row.suffix ? 'text-end' : ''}>
                                    {#if row.value(boatB)}
                                        {row.value(boatB)}{@html row.suffix || ''}
                                    {:else}
                                        -
                                    {/if}
                                </td>
                            </tr>
                        {/if}
                    {/each}
                </table>
            </div>
        </div>
    </div>
</div>

<style>
td.separator {
    border-bottom: 1px solid #000;
    height: 2px;
}
</style>
