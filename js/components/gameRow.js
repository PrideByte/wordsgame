import Element from "./default.js";


export default class Row extends Element {
    constructor(parent, wordLength) {
        super({
            parent: parent,
            classNames: 'gameField__row'
        });
        this.element.onclick = null;

        for (let i = 0; i < wordLength; i++) {
            const letter = new Element({
                parent: this.element,
                classNames: 'gameField__letter'
            });
            letter.element.onclick = null;
            letter.element.style.setProperty('--index', i);
        }

        this.setBgColor = this.setBgColor.bind(this);
        this.setText = this.setText.bind(this);
    }

    setBgColor(elNumber, bgColor) {
        this.element.children[elNumber].style.backgroundColor = bgColor;
    }

    setText(elNumber, text) {
        this.element.children[elNumber].innerText = text;
    }

    victoryAnimation() {
        [...this.element.children].forEach(element => {
            element.classList.add('gameField__letter-victory');
        });
        return new Promise(resolve =>   
            this.element.children[this.element.children.length - 1].addEventListener('animationend', () => resolve('Animation ended'))
        );
    }
}