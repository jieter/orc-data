import { getRandomElement } from './util.js';

let _indexPromise;

export async function indexLoader() {
    _indexPromise = await fetch('index.json')
        .then((response) => response.json())
        .then((items) =>
            items.map(([sailnumber, name, type]) => ({
                sailnumber,
                name,
                type,
            })),
        );
    return await _indexPromise;
}

export async function getRandomBoat() {
    const index = await indexLoader();
    return getRandomElement(index).sailnumber;
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
