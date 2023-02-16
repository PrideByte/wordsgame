import { getSettings } from "../helpers.js";
import Element from "./default.js";

export default class Rules {
    constructor(parent) {
        this.parent = parent;

        this.show();
    }

    show() {
        const header = new Element({
            parent: this.parent,
            element: 'h2',
            classNames: 'gameModal__title',
            htmlContent: 'Правила игры:'
        });

        const description = new Element({
            parent: this.parent,
            element: 'p',
            classNames: 'gameModal__description',
            htmlContent: `Необходимо угадать слово. Каждое слово должно быть существительным из 5 букв.<br>
            Цвет каждой буквы изменится после ввода, что облегчит дальнейшее угадывание.`
        });

        const examplesTitle = new Element({
            parent: this.parent,
            element: 'h3',
            classNames: 'gameModal__subtitle',
            htmlContent: 'Примеры:'
        });

        const examples = new Element({
            parent: this.parent,
            element: 'ul',
            classNames: 'gameModal__exampleList',
            htmlContent: `<li class='gameModal__example'>
                <ul class='gameModal__example-word'>
                    <li class='gameModal__example-letter gameModal__example-inplace'>С</li>
                    <li class='gameModal__example-letter'>Л</li>
                    <li class='gameModal__example-letter'>О</li>
                    <li class='gameModal__example-letter'>В</li>
                    <li class='gameModal__example-letter'>О</li>
                </ul>
                <p class='gameModal__example-wordDesc'>Буква "С" есть в угадываемом слове и находится на своем месте.</p>
            </li>
            <li class='gameModal__example'>
                <ul class='gameModal__example-word'>
                    <li class='gameModal__example-letter'>В</li>
                    <li class='gameModal__example-letter'>А</li>
                    <li class='gameModal__example-letter'>Л</li>
                    <li class='gameModal__example-letter gameModal__example-inword'>Е</li>
                    <li class='gameModal__example-letter'>Т</li>
                </ul>
                <p class='gameModal__example-wordDesc'>Буква "Е" есть в угадываемом слове, но находится не на своем месте.</p>
            </li>
            <li class='gameModal__example'>
                <ul class='gameModal__example-word'>
                    <li class='gameModal__example-letter'>К</li>
                    <li class='gameModal__example-letter gameModal__example-wrong'>А</li>
                    <li class='gameModal__example-letter'>Н</li>
                    <li class='gameModal__example-letter gameModal__example-wrong'>А</li>
                    <li class='gameModal__example-letter'>Т</li>
                </ul>
                <p class='gameModal__example-wordDesc'>Буквы "А" нет в угадываемом слове.</p>
            </li>`
        });

        const hr = new Element({
            parent: this.parent,
            element: 'hr',
            classNames: 'gameModal__line'
        });

        const description2 = new Element({
            parent: this.parent,
            element: 'p',
            classNames: 'gameModal__description',
            htmlContent: `Помните, что одна и та же буква может встретиться в слове несколько раз.`
        });

        const examplesTitle2 = new Element({
            parent: this.parent,
            element: 'h3',
            classNames: 'gameModal__subtitle',
            htmlContent: 'Примеры:'
        });

        const examples2 = new Element({
            parent: this.parent,
            element: 'ul',
            classNames: 'gameModal__exampleList',
            htmlContent: `<li class='gameModal__example'>
                <ul class='gameModal__example-word'>
                    <li class='gameModal__example-letter'>К</li>
                    <li class='gameModal__example-letter gameModal__example-inplace'>А</li>
                    <li class='gameModal__example-letter'>Н</li>
                    <li class='gameModal__example-letter gameModal__example-inplace'>А</li>
                    <li class='gameModal__example-letter'>Т</li>
                </ul>
                <p class='gameModal__example-wordDesc'>Буквы "А" есть в угадываемом слове и обе находятся на своем месте.</p>
            </li>
            <li class='gameModal__example'>
                <ul class='gameModal__example-word'>
                    <li class='gameModal__example-letter gameModal__example-inplace'>К</li>
                    <li class='gameModal__example-letter'>А</li>
                    <li class='gameModal__example-letter'>С</li>
                    <li class='gameModal__example-letter gameModal__example-inword'>К</li>
                    <li class='gameModal__example-letter'>А</li>
                </ul>
                <p class='gameModal__example-wordDesc'>Первая буква "К" есть в угадываемом слове и находится на своем месте. Вторая буква есть в слове, но находится не на своем месте.</p>
            </li>
            <li class='gameModal__example'>
                <ul class='gameModal__example-word'>
                    <li class='gameModal__example-letter'>К</li>
                    <li class='gameModal__example-letter gameModal__example-wrong'>А</li>
                    <li class='gameModal__example-letter'>Р</li>
                    <li class='gameModal__example-letter'>Т</li>
                    <li class='gameModal__example-letter gameModal__example-inplace'>А</li>
                </ul>
                <p class='gameModal__example-wordDesc'>Буква "А" всего одна в угадываемом слове и находится на своем месте.</p>
            </li>`
        });
    }
}