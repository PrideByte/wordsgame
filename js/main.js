import game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameVersion = 'v2.1';
    if (JSON.parse(localStorage.getItem('version')) !== gameVersion) {
        localStorage.clear();
        localStorage.setItem('version', JSON.stringify(gameVersion));
    }
    let g = new game(document.body);
});