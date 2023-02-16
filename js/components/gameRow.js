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
}