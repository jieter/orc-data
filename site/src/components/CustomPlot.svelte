<script>
import PolarPlot from './PolarPlot.svelte';
import { polarImport } from '../polar-csv.js';

let polar = `twa/tws;6;8;10;12;14;16;20
0;0;0;0;0;0;0;0

# This is the polar of ITA14800, which is not in the database anymore

# Zeros are not plotted, you can use this to add optimal beat/run angles for a
# specific wind speed. In this case, VMG must be converted to SOG:
#   SOG = VMG / cos(beat_angle)

# Beat angles
44.2;5.02;0;0;0;0;0;0
42.9;0;5.99;0;0;0;0;0
42.5;0;0;6.81;0;0;0;0
40.8;0;0;0;7.17;0;0;0
39.3;0;0;0;0;7.31;0;0
38.3;0;0;0;0;0;7.39;0
38.4;0;0;0;0;0;0;7.53

52;5.58;6.71;7.54;7.9;8.06;8.15;8.25
60;5.97;7.13;7.82;8.14;8.3;8.4;8.49
75;6.33;7.46;8.03;8.36;8.62;8.83;9.02
90;6.41;7.69;8.09;8.36;8.66;8.98;9.54
110;6.35;7.63;8.31;8.79;9.07;9.27;9.68
120;6.15;7.54;8.22;8.65;9.15;9.52;10.07
135;5.48;6.78;7.75;8.26;8.69;9.2;10.45
150;4.54;5.7;6.76;7.58;8.12;8.52;9.46

# Run angles
142.1;4.98;0;0;0;0;0;0
144.7;0;6.04;0;0;0;0;0
144.9;0;0;7.15;0;0;0;0
153.4;0;0;0;7.38;0;0;0
159.4;0;0;0;0;7.71;0;0
166.9;0;0;0;0;0;7.92;0
173.1;0;0;0;0;0;0;8.54`;

const EMPTY_BOAT = {
    speeds: [],
    angles: [],
};
let boat = EMPTY_BOAT;
let error = undefined;
$: {
    try {
        boat = polarImport(polar);
        error = undefined;
    } catch (e) {
        boat = EMPTY_BOAT;
        error = e;
    }
}
</script>

<div class="row">
    <div class="col-sm">
        {#if error}
            <div class="alert alert-warning" role="alert">
                {error}
            </div>
        {/if}
        <PolarPlot {boat} />
    </div>
    <div class="col-sm">
        <textarea class="plot-only" bind:value={polar} />
    </div>
</div>
