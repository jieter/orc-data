<script>
export let series = 0;
const trueWindSpeeds = [4, 6, 8, 10, 12, 14, 16, 20, 24];
</script>

<svg width="130" height="20">
    {#each trueWindSpeeds as tws, i}
        <path class="line tws-{tws} series-{series}" d="M{i * 10},20L{(i + 4) * 10},0"></path>
    {/each}
</svg>
