export const DEG2RAD = Math.PI / 180;

export function vmg2sog(beat_angle, vmg) {
    return vmg / Math.cos(beat_angle * DEG2RAD);
}
export function round(x, n) {
    return n == null ? Math.round(x) : Math.round(x * (n = Math.pow(10, n))) / n;
}
export function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function zeros(n) {
    return Array.apply(null, new Array(n)).map(() => 0.0);
}

export function int(n) {
    return parseInt(n, 10);
}

export function float(n) {
    return +n;
}
