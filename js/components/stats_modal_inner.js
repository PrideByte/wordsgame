import { getSettings } from "../helpers.js";
import Element from "./default.js";

export default class Stats {
    constructor(parent) {
        this.parent = parent;
        if (!getSettings('stats')) {
            this.stats = [];
        } else {
            this.stats = getSettings('stats');
        }

        this.show();
    }

    show() {
        const rowHeader = new Element({
            parent: this.parent,
            element: 'ul',
            classNames: 'gameModal__row-header',
            htmlContent: `<li class='gameModal__row-item gameModal__row-id'>ID</li>
                <li class='gameModal__row-item gameModal__row-word'>СЛОВО</li>
                <li class='gameModal__row-item gameModal__row-tries'>ПОПЫТОК</li>
                <li class='gameModal__row-item gameModal__row-time'>ВРЕМЯ</li>`
        });

        this.stats.forEach(el => {
            const time = new Date(el.time);
            const timeLine = `${time.getUTCDate(time) - 1}Д:${time.getUTCHours(time)}Ч:${time.getUTCMinutes(time)}М:${time.getUTCSeconds(time)}С`;
            const row = new Element({
                parent: this.parent,
                classNames: 'gameModal__row',
                htmlContent: `<li class='gameModal__row-item gameModal__row-id'>${el.id}</li>
                    <li class='gameModal__row-item gameModal__row-word'>${el.word.toUpperCase()}</li>
                    <li class='gameModal__row-item gameModal__row-tries'>${el.attempts}</li>
                    <li class='gameModal__row-item gameModal__row-time'>${timeLine}</li>`
            });

            if (el.attempts <= 3) {
                row.element.style.backgroundColor = 'var(--clr-found)';
            } else if (el.attempts > 3 && el.attempts <= 6) {
                row.element.style.backgroundColor = 'var(--clr-alert)';
            } else {
                row.element.style.backgroundColor = 'var(--clr-wrong)';
            }
        });
    }
}