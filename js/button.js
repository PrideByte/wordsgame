export default class letterButton {
    constructor(parent, letter, control = false) {
        this.parent = parent;
        this.letter = letter;
        this.control = control;
        this.found = false;

        this.element = document.createElement('div');
        this.element.className = 'gameKeyboard__key';
        control && this.element.classList.add('gameKeyboard__key-special');
        if (/^[а-я]$/i.test(this.letter.toLowerCase())) {
            this.element.innerText = letter.toUpperCase();
        } else if (this.letter.toLowerCase() === 'backspace') {
            this.element.innerText = 'b';
        } else if (this.letter.toLowerCase() === 'enter') {
            this.element.innerText = 'e';
        }
            
        this.parent.appendChild(this.element);
        this.callback = () => {};
        this.element.onclick = this.click.bind(this);
    }

    click(e) {
        this.callback(e);
    }
}