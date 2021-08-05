var deg2rad = Math.PI / 180;

module.exports = {
    deg2rad: deg2rad,

    vmg2sog: function(beat_angle, vmg) {
        return vmg / Math.cos(beat_angle * deg2rad);
    },
    round: function round(x, n) {
        return n == null ? Math.round(x) : Math.round(x * (n = Math.pow(10, n))) / n;
    }
};