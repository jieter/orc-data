<script>
export let vpp;
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
                <td class="tws-{vpp.speeds[i]}">{speed}</td>
            {/each}
        </tr>
        {#each vpp.angles as angle}
            <tr class="twa-{angle}">
                <td>{angle}°</td>
                {#each vpp['' + angle] as speed, i}
                    <td class="tws-{vpp.speeds[i]}">{speed}</td>
                {/each}
            </tr>
        {/each}
        <tr>
            <td>Run VMG</td>
            {#each vpp.run_vmg as vmg, i}
                <td class="tws-{vpp.speeds[i]}">{vmg}</td>
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
