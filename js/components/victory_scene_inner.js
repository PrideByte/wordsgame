import Element from "./default.js";

export default class Victory {
    constructor(parent) {
        this.parent = parent;
        this.parent.classList.add('gameModal__content-centered')

        this.show();
    }

    show() {
        const header = new Element({
            parent: this.parent,
            element: 'h2',
            classNames: 'gameModal__title',
            htmlContent: 'Победа!'
        });

        this.newGamebtn = new Element({
            parent: this.parent,
            element: 'div',
            classNames: 'gameModal__btn',
            htmlContent: 'Новая игра'
        });
    }
}