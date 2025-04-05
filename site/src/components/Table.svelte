<script>
import { indexLoader } from '../api.js';
export let q;

$: {
    if (q) {
        window.location.hash = `type-${encodeURIComponent(q)}`;
    }
}
</script>

<div class="container">
    Boats with type containing: <input type="text" bind:value={q} />
    {#await indexLoader()}
        Loading index...
    {:then options}
        <div class="row">
            <div class="col-sm-6">
                <table class="table table-striped table-hover">
                    <tr><th>Sailnumber</th><th>Name</th><th>Type</th></tr>
                    <tbody>
                        {#each options.filter(({ sailnumber, name, type }) => type
                                ?.toLowerCase()
                                .includes(q.toLowerCase())) as { sailnumber, name, type }}
                            <tr>
                                <td><a href="#{sailnumber}">{sailnumber}</a></td>
                                <td>{name}</td>
                                <td>{type}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/await}
</div>

<style>
input {
    width: 100px;
    border: 1px solid #aaa;
    border-radius: 4px;
}
</style>
