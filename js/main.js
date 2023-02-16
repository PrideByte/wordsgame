import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => document.body.classList.add('transition'));
    const gameVersion = 'v2.2';
    if (JSON.parse(localStorage.getItem('version')) !== gameVersion) {
        localStorage.clear();
        localStorage.setItem('version', JSON.stringify(gameVersion));
    }
    let g = new Game(document.body);
});