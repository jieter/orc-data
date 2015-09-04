var deg2rad = Math.PI / 180;

module.exports = {
    deg2rad: deg2rad,

    vmg2sog: function (beat_angle, vmg) {
        return vmg / Math.cos(beat_angle * deg2rad);
    }
};
