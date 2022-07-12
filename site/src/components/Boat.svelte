<script>
import PolarPlot from './PolarPlot.svelte';
import PolarTable from './PolarTable.svelte';
import { polarExport } from '../polar-csv.js';
import { getBoat } from '../api.js';

export let sailnumber;

let boat;
let extended = false;

let sizes;
let rating;
let sails;

async function loadBoat(sailnumber) {
    boat = await getBoat(sailnumber);
    sizes = boat.boat.sizes;
    rating = boat.rating;
    sails = getSails();
}

$: sailnumber && loadBoat(sailnumber);

function getSails() {
    const sizes = boat.boat.sizes;
    const sails = [
        ['Main', sizes.main + 'm²'],
        ['Genoa', sizes.genoa + 'm²'],
    ];
    if (sizes.spinnaker > 0) {
        sails.push(['Spinnaker', sizes.spinnaker + 'm²']);
    }
    if (sizes.spinnaker_asym > 0) {
        sails.push(['Asym. spinnaker', sizes.spinnaker_asym + 'm²']);
    }
    return sails;
}
</script>

{#if boat}
    <div class="row p-2">
        <div class="col-sm">
            <PolarPlot {boat} />
        </div>
        <div class="col-sm">
            <h1>
                {#if boat.name}
                    {boat.name}
                {:else}
                    <span class="text-muted">Name unknown</span>
                {/if}
            </h1>

            <table class="table">
                <tr><th>Sail number</th><th>Type</th><th>Designer</th></tr>
                <tr><td>{boat.sailnumber}</td><td>{boat.boat.type}</td><td>{boat.boat.designer}</td></tr>
                <tr><th>Length</th><th>Beam</th><th>Draft</th><th>Displacement</th></tr>
                <tr>
                    <td>{sizes.loa} m</td>
                    <td>{sizes.beam} m</td>
                    <td>{sizes.draft} m</td>
                    <td>{sizes.displacement} kg</td>
                </tr>
                <tr>
                    {#each sails as [name, sail]}
                        <th>{name}</th>
                    {/each}
                </tr>
                <tr>
                    {#each sails as [name, sail]}
                        <td>{sail}</td>
                    {/each}
                </tr>

                <tr><th>GPH</th><th>OSH</th><th>Stability index</th></tr>
                <tr><td>{rating.gph}</td><td>{rating.osn}</td><td>{boat.boat.stability_index || '?'}</td></tr>
                <tr>
                    <th>Inshore TN</th><td colspan="3">{rating.triple_inshore.join(' ')}</td>
                </tr>
                <tr>
                    <th>Offshore TN</th><td colspan="3">{rating.triple_offshore.join(' ')}</td>
                </tr>
            </table>
            <PolarTable vpp={boat.vpp} />
            <h5>
                Polar (CSV)
                <small>
                    <label>
                        <input type="checkbox" bind:checked={extended} />
                        Extended CSV (including beat and run angles)
                    </label>
                </small>
            </h5>
            <textarea class:extended>{polarExport(boat, extended)} </textarea>
        </div>
    </div>
{/if}

<style>
th {
    color: #777;
    font-weight: 400;
}
</style>
