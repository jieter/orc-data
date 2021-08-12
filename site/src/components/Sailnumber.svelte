<script>
export let number;

let display;

function formatNumber (sailnumber) {
    if (!sailnumber) {
        return;
    }
    if (sailnumber.substr(0, 3) == sailnumber.substr(4, 3)) {
        return sailnumber.substr(4);
    } else {
        return sailnumber;
    }
}

</script>

<span class="sailnumber">{formatNumber(number)}</span>
