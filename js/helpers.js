export class Random {
    constructor(seed = 1) {
        if (typeof seed !== 'number') {
            throw new Error('Parameter seed must be numeric');
        }
        this.a = 205;
        this.c = 29573;
        this.m = 139968;
        seed = seed >= this.m ? this.m - 1 : Math.abs(seed);
        this.x = seed;

        this.next = this.next.bind(this);
    }

    next() {
        this.x = (this.x * this.a + this.c) % this.m;
        return this.x / this.m;
    }
}

export function getSettings(param) {
    return JSON.parse(localStorage.getItem(param));
}

export function setSettings(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeSettings(param) {
    localStorage.removeItem(param);
}