<script>
import { index } from '../api.js';
export let q;

$: window.location.hash = `type-${encodeURIComponent(q)}`;

function filterByType(boats, q) {
    return boats.filter(({ type }) => type?.toLowerCase().includes(q.toLowerCase()));
}
$: boats = filterByType($index, q);
</script>

<div class="container">
    Boats with type containing: <input type="text" bind:value={q} />

    <div class="row">
        <div class="col-sm-8">
            <table class="table table-striped table-hover">
                <tr><th>Sailnumber</th><th>Name</th><th>Type</th></tr>
                <tbody>
                    {#each boats as { sailnumber, name, type }}
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
</div>

<style>
input {
    width: 100px;
    border: 1px solid #aaa;
    border-radius: 4px;
}
</style>
