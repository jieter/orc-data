import { derived, writable } from 'svelte/store';

import { getRandomElement } from './util.js';

export const index = writable([]);
export const indexSize = derived(index, (_index) => index.length);

fetch('index.json')
    .then((response) => response.json())
    .then((items) => {
        index.set(items.map(([sailnumber, name, type]) => ({ sailnumber, name, type })));
    });

export const randomBoat = derived(index, (_index) => {
    if (_index.length === 0) {
        return null;
    }
    return getRandomElement(_index).sailnumber;
});

let cache = {};

export function getBoat(sailnumber) {
    if (sailnumber in cache) {
        return new Promise((resolve) => resolve(cache[sailnumber]));
    } else {
        return fetch(`data/${sailnumber}.json`).then((response) => {
            cache[sailnumber] = response.json();
            return cache[sailnumber];
        });
    }
}

export function getExtremes() {
    return fetch('extremes.json').then((response) => response.json());
}
