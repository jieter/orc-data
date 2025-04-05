<script>
export let vpp;
export let hover = () => {};

function clearHighlight() {
    hover(undefined);
}
</script>

<table class="table table-sm polar-table">
    <thead>
        <tr>
            <th>Wind velocity</th>
            {#each vpp.speeds as speed}
                <th class="tws-{speed}">{speed}kts</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Beat angle</td>
            {#each vpp.beat_angle as angle, i}
                <td class="tws-{vpp.speeds[i]}">{angle}°</td>
            {/each}
        </tr>
        <tr>
            <td>Beat VMG</td>
            {#each vpp.beat_vmg as speed, i}
                <td class="tws-{vpp.speeds[i]}">{speed.toFixed(2)}</td>
            {/each}
        </tr>
        {#each vpp.angles as angle}
            <tr class="twa-{angle}">
                <td>{angle}°</td>
                {#each vpp[angle] as speed, i}
                    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                    <td
                        class="tws-{vpp.speeds[i]}"
                        on:mouseover={() => {
                            hover({ tws: vpp.speeds[i], sog: speed, cog: angle });
                        }}
                        on:mouseout={clearHighlight}>{speed.toFixed(2)}</td>
                {/each}
            </tr>
        {/each}
        <tr>
            <td>Run VMG</td>
            {#each vpp.run_vmg as vmg, i}
                <td class="tws-{vpp.speeds[i]}">{vmg.toFixed(2)}</td>
            {/each}
        </tr>
        <tr>
            <td>Run angle</td>
            {#each vpp.run_angle as angle, i}
                <td class="tws-{vpp.speeds[i]}">{angle}°</td>
            {/each}
        </tr>
    </tbody>
</table>

<style>
.polar-table td {
    text-align: right;
}
</style>
