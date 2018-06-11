export const deg2rad = Math.PI / 180;

export function vmg2sog (beat_angle, vmg) {
    return vmg / Math.cos(beat_angle * deg2rad);
};

export function round (x, n) {
    return n == null ? Math.round(x) : Math.round(x * (n = Math.pow(10, n))) / n;
};

export function getRandomElement (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};
