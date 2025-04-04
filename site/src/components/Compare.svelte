<script>
import { onMount } from 'svelte';

import BoatSelect from './BoatSelect.svelte';
import LineLegend from './LineLegend.svelte';
import PolarPlot from './PolarPlot.svelte';
import Sailnumber from './Sailnumber.svelte';
import { getBoat } from '../api.js';

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

                    <tr>
                        <td>Name</td>
                        <td>{boatA?.name}</td>
                        <td>{boatB?.name}</td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>{boatA?.boat.type}</td>
                        <td>{boatB?.boat.type}</td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td>{boatA?.boat.year}</td>
                        <td>{boatB?.boat.year}</td>
                    </tr>
                    <tr>
                        <td>LOA</td>
                        <td>{boatA?.boat.sizes.loa}m</td>
                        <td>{boatB?.boat.sizes.loa}m</td>
                    </tr>
                    <tr>
                        <td>Beam</td>
                        <td>{boatA?.boat.sizes.beam}m</td>
                        <td>{boatB?.boat.sizes.beam}m</td>
                    </tr>
                    <tr>
                        <td>Draft</td>
                        <td>{boatA?.boat.sizes.draft}m</td>
                        <td>{boatB?.boat.sizes.draft}m</td>
                    </tr>
                    <tr>
                        <td>Displacement</td>
                        <td>{boatA?.boat.sizes.displacement}t</td>
                        <td>{boatB?.boat.sizes.displacement}t</td>
                    </tr>
                    <tr><td colspan="3" class="separator"></td></tr>
                    <tr>
                        <td>Main</td>
                        <td>{boatA?.boat.sizes.main}m<sup>2</sup></td>
                        <td>{boatB?.boat.sizes.main}m<sup>2</sup></td>
                    </tr>
                    <tr>
                        <td>Genoa</td>
                        <td>{boatA?.boat.sizes.genoa}m<sup>2</sup></td>
                        <td>{boatB?.boat.sizes.genoa}m<sup>2</sup></td>
                    </tr>
                    <tr>
                        <td>Spinnaker</td>
                        <td>{boatA?.boat.sizes.spinnaker}m<sup>2</sup></td>
                        <td>{boatB?.boat.sizes.spinnaker}m<sup>2</sup></td>
                    </tr>
                    <tr>
                        <td>Asym spinnaker</td>
                        <td>{boatA?.boat.sizes.spinnaker_asym}m<sup>2</sup></td>
                        <td>{boatB?.boat.sizes.spinnaker_asym}m<sup>2</sup></td>
                    </tr>
                    <tr><td colspan="3" class="separator"></td></tr>

                    <tr>
                        <td>GPH</td>
                        <td>{boatA?.rating.gph}</td>
                        <td>{boatB?.rating.gph}</td>
                    </tr>
                    <tr>
                        <td>OSN</td>
                        <td>{boatA?.rating.osn}</td>
                        <td>{boatB?.rating.osn}</td>
                    </tr>
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
