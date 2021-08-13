import { getRandomElement } from './util.js';

let _index;
export async function indexLoader() {
    if (!_index) {
        _index = await fetch('index.json').then((response) => response.json());
    }
    return _index;
}

export async function getRandomBoat() {
    const index = await indexLoader();
    return getRandomElement(index)[0];
}

export function getBoat(sailnumber) {
    return fetch(`data/${sailnumber}.json`).then((response) => response.json());
}

export function getExtremes() {
    return fetch('extremes.json').then((response) => response.json());
}
