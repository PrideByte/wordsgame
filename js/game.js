import Element from './components/default.js';
import Header from './header.js';
import { Random, getSettings, setSettings, removeSettings } from './helpers.js';
import lexicon from './russian_nouns.js';
import AlertMessage from './components/alert.js';
import Row from './components/gameRow.js';
import Keyboard from './components/keyboard.js';
import Modal from './components/modal.js';

class Game extends Element {
    constructor(parent = document.body) {
        const header = new Header();

        super({
            paren: parent,
            classNames: 'gameWrapper'
        });
        this.element.onclick = null;

        if (!getSettings('difficulty')) {
            setSettings('difficulty', 'medium');
        }
        this.difficulty = getSettings('difficulty');

        this.lexicon = lexicon[this.difficulty] ?? lexicon['medium'];
        this.dictionary = this.lexicon.toLowerCase().split(',');

        this.messages = [];

        this.gameFieldWrapper = new Element({
            parent: this.element,
            classNames: 'gameField__wrapper'
        });
        this.gameFieldWrapper.element.onclick = null;

        this.init = this.init.bind(this);
        this.main = this.main.bind(this);
        this.layout = this.layout.bind(this);
        this.keyboard = this.keyboard.bind(this);
        this.createGameFieldRow = this.createGameFieldRow.bind(this);
        this.showAlertMessage = this.showAlertMessage.bind(this);
        this.addStats = this.addStats.bind(this);
        this.backspaceClick = this.backspaceClick.bind(this);
        this.enterClick = this.enterClick.bind(this);

        this.init();
        this.keyboard();
    }

    init() {
        this.stats = getSettings('stats') || [];

        if (!getSettings('seed')) {
            setSettings('seed', 500);
        }
        this.seed = Number(getSettings('seed'));

        this.random = new Random(this.seed);

        if (!getSettings('startTime')) {
            setSettings('startTime', Date.now());
        }
        this.startTime = Number(getSettings('startTime'));

        this.attempts = Number(getSettings('attempts')) ?? 0;

        this.input = [];

        this.word = this.dictionary[Math.floor(this.random.next() * this.dictionary.length)];
        this.wordLength = this.word.length;

        document.addEventListener('keydown', this.main);

        this.layout();
    }

    layout() {
        this.gameField = new Element({
            parent: this.gameFieldWrapper.element,
            classNames: 'gameField'
        });
        this.gameField.element.onclick = null;

        this.createGameFieldRow();
    }

    createGameFieldRow() {
        this.currentRow = new Row(this.gameField.element, this.wordLength);

        this.gameField.element.scrollTop = this.gameField.element.scrollHeight;
    }

    keyboard() {
        this.gameKeyboard = new Keyboard(this.element, this);
    }

    main(e) {
        ////////////////BACKSPACE/////////////////
        if (e.key.toLowerCase() === 'backspace') {
            this.backspaceClick();
            return;
        }
        ////////////////ENTER/////////////////
        if (e.key.toLowerCase() === 'enter') {
            this.enterClick();
            return;
        }
        ////////////////А-Я/////////////////
        if (/^[а-яА-Я]$/i.test(e.key)) {
            if (this.input.length < this.wordLength) {
                this.currentRow.setText(this.input.length, e.key.toUpperCase());
                this.input.push(e.key.toLowerCase());
            }
            return;
        }
        ////////////////OTHER/////////////////
        if (/^[^а-яА-Я]$/i.test(e.key)) {
            this.showAlertMessage('Только буквы А-Я!', 'Language alert');
            return;
        }
    }

    showAlertMessage(message, type) {
        if (this.messages.filter(el => el.type === type).length !== 0) {
            return;
        }

        const alertMessage = new AlertMessage({
            msg: message,
            wait: 2000,
            animationDuration: 1000,
            type: type
        });
        this.messages.push(alertMessage);

        alertMessage.fade().then(() => this.messages = this.messages.filter(el => el !== alertMessage));
    }

    enterClick() {
        if (this.input.length === this.wordLength) {
            if (!lexicon.hard.includes(this.input.join(''))) {
                this.showAlertMessage('Такого слова нет!', 'Wrong word');
                return;
            }
            let wordCopy = this.word.split('');
            let inputCopy = this.input.slice();
            for (let i = 0; i < inputCopy.length; i++) {
                const currentLetter = this.gameKeyboard.index(inputCopy[i]);
                if (!this.gameKeyboard.found(currentLetter)) {
                    this.gameKeyboard.setBgColor(currentLetter, 'var(--clr-wrong)');
                }
                this.currentRow.setBgColor(i, 'var(--clr-wrong)');
                if (inputCopy[i] === wordCopy[i]) {
                    this.gameKeyboard.found(currentLetter, true);
                    this.gameKeyboard.setBgColor(currentLetter, 'var(--clr-found)');
                    wordCopy[i] = '-';
                    inputCopy[i] = '*';
                    this.currentRow.setBgColor(i, 'var(--clr-found)');
                    continue;
                }
            }
            for (let i = 0; i < inputCopy.length; i++) {
                if (wordCopy.includes(inputCopy[i])) {
                    const currentLetter = this.gameKeyboard.index(inputCopy[i]);
                    if (!this.gameKeyboard.found(currentLetter)) {
                        this.gameKeyboard.setBgColor(currentLetter, 'var(--clr-alert)');
                    }
                    wordCopy[wordCopy.indexOf(inputCopy[i])] = '-';
                    inputCopy[i] = '*';
                    this.currentRow.setBgColor(i, 'var(--clr-alert)');
                    continue;
                }
            }

            if (this.input.join('') !== this.word) {
                this.attempts++;
                setSettings('attempts', this.attempts);
                this.createGameFieldRow();
                this.input.length = 0;
            } else {
                this.removeEvents();
                this.attempts++;
                this.addStats();
                this.attempts = 0;
                setSettings('attempts', 0);
                removeSettings('startTime');
                this.seed = this.random.x;
                setSettings('seed', this.seed);
                this.showAlertMessage('Победа!', 'Victory alert');
                this.currentRow.victoryAnimation().then(() => {
                    this.victory = new Modal(document.body, 'victory');
                    this.victory.content.newGamebtn.callback = () => {
                        this.victory.destroy();
                        this.gameField.destroy();
                        this.gameKeyboard.clear();
                        this.init();
                    }
                });
            }
        }
    }

    backspaceClick() {
        if (this.input.length >= 1) {
            this.currentRow.setText(this.input.length - 1, '');
            this.input.pop();
        }
    }

    removeEvents() {
        document.removeEventListener('keydown', this.main);
        this.gameKeyboard.removeEvents();
    }

    addStats() {
        this.stats.push({
            id: this.stats.length,
            seed: this.seed,
            word: this.word,
            attempts: this.attempts,
            time: Date.now() - this.startTime
        });
        setSettings('stats', this.stats);
    }
}

export default Game;