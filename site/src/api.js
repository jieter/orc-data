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

let _boats = {};

export function getBoat(sailnumber) {
    if (sailnumber in _boats) {
        return new Promise((resolve) => resolve(_boats[sailnumber]));
    } else {
        return fetch(`data/${sailnumber}.json`).then((response) => {
            _boats[sailnumber] = response.json();
            return _boats[sailnumber];
        });
    }
}

export function getExtremes() {
    return fetch('extremes.json').then((response) => response.json());
}
