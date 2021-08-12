import { getRandomElement } from './util.js';

function matchBoat(boat, needle) {
    needle = needle.toLowerCase();

    for (var i in boat) {
        if (!boat[i]) {
            continue;
        }
        var value = boat[i].toLowerCase();

        if (value.indexOf(needle) !== -1) {
            return true;
        }
    }
    return false;
}

let _index;
async function indexLoader() {
    if (!_index) {
        _index = await fetch('index.json').then((response) => response.json());
    }
    return _index;
}

export async function getRandomBoat() {
    const index = await indexLoader();
    return getRandomElement(index)[0];
}

export async function filterBoats(query) {
    const index = await indexLoader();

    return index.filter((boat) => matchBoat(boat, query));
}
