import Element from "./default.js";

export default class LetterButton extends Element {
    constructor(parent, letter, control = false) {
        const options = {};
        options.parent = parent;
        options.element = 'div';

        options.classNames = ['gameKeyboard__key'];
        control && options.classNames.push('gameKeyboard__key-special');
        if (/^[а-я]$/i.test(letter.toLowerCase())) {
            options.htmlContent = letter.toUpperCase();
        } else if (letter.toLowerCase() === 'backspace') {
            options.htmlContent = 'b';
        } else if (letter.toLowerCase() === 'enter') {
            options.htmlContent = 'e';
        }

        super(options);

        this.letter = letter;
        this.control = control;
        this.found = false;
    }
}