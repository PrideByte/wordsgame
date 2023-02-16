import Element from "./default.js";
import LetterButton from './buttons.js';
import LETTERS from './../russian_letters.js';

export default class Keyboard extends Element {
    constructor(parent, mainContext) {
        super({
            parent: parent,
            classNames: 'gameKeyboard'
        });
        this.element.onclick = null;

        this.buttons = [];

        let keyboardRow = new Element({
            parent: this.element,
            classNames: 'gameKeyboard__line'
        });
        keyboardRow.element.onclick = null;

        LETTERS.forEach(el => {
            if (el === '*') {
                keyboardRow = new Element({
                    parent: this.element,
                    classNames: 'gameKeyboard__line'
                });
                keyboardRow.element.onclick = null;
                return;
            }

            const button = new LetterButton(keyboardRow.element, el, !/[а-яА-Я]/i.test(el));
            button.callback = function () {
                mainContext.main({key: this.letter.toLowerCase()});
            }
            this.buttons.push(button);
        });

        this.index = this.index.bind(this);
    }

    index(letter) {
        return this.buttons.indexOf(this.buttons.filter(el => el.letter === letter)[0]);
    }

    found(i, value = null) {
        if (value !== null) {
            this.buttons[i].found = value;
        }
        return this.buttons[i].found;
    }

    setBgColor(i, color) {
        this.buttons[i].element.style.backgroundColor = color;
    }
}