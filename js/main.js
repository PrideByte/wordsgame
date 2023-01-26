import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => document.body.classList.add('transition'), 0);
    const gameVersion = 'v2.2';
    if (JSON.parse(localStorage.getItem('version')) !== gameVersion) {
        localStorage.clear();
        localStorage.setItem('version', JSON.stringify(gameVersion));
    }
    let g = new Game(document.body);
});