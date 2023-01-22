import game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    if (JSON.parse(localStorage.getItem('version')) !== 'v2') {
        localStorage.clear();
        localStorage.setItem('version', JSON.stringify('v2'));
    }
    let g = new game(document.body);
});