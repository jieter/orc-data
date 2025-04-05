<script>
import { zip } from 'd3-array';
import { curveCardinal, lineRadial, symbol, symbolDiamond } from 'd3-shape';
import { getContext } from 'svelte';
import { DEG2RAD, vmg2sog } from '../util.js';

/* Component to render VPP data for a boat. */
export let vpp;

let { rScale, index } = getContext('polarplot').getScale();

const deg2rad = (degrees, vmg) => [degrees * DEG2RAD, vmg2sog(degrees, vmg)];

function seriesFromVpp(vpp) {
    const vpp_angles = vpp.angles.map((d) => d * DEG2RAD);
    let run_data = [];

    const vpp_data = vpp.speeds.map(function (windspeed, i) {
        var series = zip(
            vpp_angles,
            vpp.angles.map((angle) => vpp[angle][i]),
        ).filter((a) => a[1] > 0);

        if (vpp.beat_angle) {
            series.unshift(deg2rad(vpp.beat_angle[i], vpp.beat_vmg[i]));
        }
        if (vpp.run_angle) {
            const run = deg2rad(vpp.run_angle[i], -vpp.run_vmg[i]);
            series.push(run);
            run_data.push(run);
        }
        return series.sort((a, b) => a[0] - b[0]);
    });
    return { vpp: vpp_data, run: run_data };
}

$: data = seriesFromVpp(vpp);

const line = lineRadial()
    .angle((d) => d[0])
    .radius((d) => rScale(d[1]))
    .curve(curveCardinal.tension(0.5));
</script>

<!-- Curves for each true wind speed -->
{#each data.vpp as tws, i}
    <path class="line series-{index} tws-{vpp.speeds[i]}" d={line(tws)} stroke-width="2" />
{/each}
<!-- VMG diamonds -->
{#each data.run as [rad, vmg], i}
    <path
        class="vmg-run series-{index} tws-{vpp.speeds[i]}"
        d={symbol(symbolDiamond, 32)()}
        transform="translate({rScale(vmg) * Math.sin(rad)}, {rScale(vmg) * -Math.cos(rad)})"
        stroke-width="1" />
{/each}
