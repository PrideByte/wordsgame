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

        this.mainContext = mainContext;

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
        this.found = this.found.bind(this);
        this.setBgColor = this.setBgColor.bind(this);
        this.removeEvents = this.removeEvents.bind(this);
        this.clear = this.clear.bind(this);
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

    removeEvents() {
        this.buttons.forEach(el => {
            el.element.onclick = null;
        });
    }

    clear() {
        this.buttons.forEach((el, i) => {
            this.found(i, false);
            this.setBgColor(i, null);
            el.element.onclick = el.callback.bind(el);
        })
    }
}