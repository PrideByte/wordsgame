export default class letterButton {
    constructor(parent, letter, control = false) {
        this.parent = parent;
        this.letter = letter;
        this.control = control;
        this.found = false;

        this.element = document.createElement('div');
        this.element.className = 'gameKeyboard__key';
        control && this.element.classList.add('gameKeyboard__key-special');
        this.element.innerText = letter.toUpperCase();
        this.parent.appendChild(this.element);
        this.callback = () => {};
        this.element.onclick = this.click.bind(this);
    }

    click(e) {
        this.callback(e);
    }
}