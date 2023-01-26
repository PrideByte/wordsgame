import lexicon from './russian_nouns.js';
import letters from './buttons.js';
import letterButton from './button.js';
import { random } from './helpers.js';
import { Header } from './header.js';

class game {
    constructor(parent = document.body) {
        this.lexicon = lexicon;
        this.parent = parent;
        if (!this.getSettings('difficulty')) {
            this.setSettings('difficulty', 'medium');
        }
        this.difficulty = this.getSettings('difficulty');
        this.messages = [];
        this.input = [];
        this.buttons = [];
        if (!this.getSettings('seed')) {
            this.setSettings('seed', 100)
        }
        this.seed = Number(this.getSettings('seed'));
        this.stats = this.getSettings('stats') || [];
        if (!this.getSettings('startTime')) {
            this.setSettings('startTime', Date.now());
        }
        this.startTime = Number(this.getSettings('startTime'));
        this.attempts = Number(this.getSettings('attempts')) ?? 0;

        this.random = new random(this.seed);

        this.init = this.init.bind(this);
        this.main = this.main.bind(this);
        this.layout = this.layout.bind(this);
        this.keyboard = this.keyboard.bind(this);
        this.createGameFieldRow = this.createGameFieldRow.bind(this);
        this.showAlertMessage = this.showAlertMessage.bind(this);
        this.addStats = this.addStats.bind(this);

        this.init();
        this.layout();
        this.keyboard();
    }

    init() {
        this.dictionary = this.lexicon[this.difficulty].toLowerCase().split(',');
        this.word = this.dictionary[Math.floor(this.random.next() * this.dictionary.length)];
        this.wordLength = this.word.length;

        document.addEventListener('keydown', this.main);
    }

    main(e) {
        ////////////////BACKSPACE/////////////////
        if (e.key === 'Backspace') {
            this.backspaceClick(this);
            return;
        }
        ////////////////ENTER/////////////////
        if (e.key === 'Enter') {
            this.enterClick(this);
            return;
        }
        ////////////////А-Я/////////////////
        if (/^[а-яА-Я]$/i.test(e.key)) {
            if (this.input.length < this.wordLength) {
                this.currentRow.children[this.input.length].innerText = e.key.toUpperCase();
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

    layout() {
        const header = new Header();
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'gameWrapper';
        this.gameFieldWrapper = document.createElement('div');
        this.gameFieldWrapper.className = 'gameField__wrapper';
        this.gameField = document.createElement('div');
        this.gameField.className = 'gameField';
        this.gameFieldWrapper.appendChild(this.gameField);
        this.wrapper.appendChild(this.gameFieldWrapper);
        this.parent.appendChild(this.wrapper);

        this.createGameFieldRow();
    }

    keyboard() {
        this.gameKeyboard = document.createElement('div');
        this.gameKeyboard.className = 'gameKeyboard';
        this.wrapper.appendChild(this.gameKeyboard);
        let keyboardRow = document.createElement('div');
        keyboardRow.className = 'gameKeyboard__line';
        this.gameKeyboard.appendChild(keyboardRow);
        letters.forEach(el => {
            if (el === '*') {
                keyboardRow = document.createElement('div');
                keyboardRow.className = 'gameKeyboard__line';
                this.gameKeyboard.appendChild(keyboardRow);
                return;
            }
            const button = new letterButton(keyboardRow, el, !/[а-яА-Я]/i.test(el));
            const that = this;
            button.callback = function (e) {
                if (this.control && this.letter.toLowerCase() === 'enter') {
                    that.enterClick(that);
                    return;
                }
                if (this.control && this.letter.toLowerCase() === 'backspace') {
                    that.backspaceClick(that);
                    return;
                }
                if (that.input.length < that.wordLength) {
                    that.currentRow.children[that.input.length].innerText = this.letter.toUpperCase();
                    that.input.push(this.letter.toLowerCase());  
                }
            }
            this.buttons.push(button);
        });
    }

    createGameFieldRow() {
        this.currentRow = document.createElement('div');
        this.currentRow.className = 'gameField__row';
        this.gameField.appendChild(this.currentRow);

        for (let i = 0; i < this.wordLength; i++) {
            const letterInRow = document.createElement('div');
            letterInRow.className = 'gameField__letter';
            this.currentRow.appendChild(letterInRow);
        }

        this.gameField.scrollTop = this.gameField.scrollHeight;
    }

    showAlertMessage(message, type) {
        if (this.messages.filter(el => el.dataset.type === type).length !== 0) {
            return;
        }
        const alertMessage = document.createElement('div');
        alertMessage.className = 'gameField__alert';
        alertMessage.innerText = message;
        alertMessage.dataset.type = type;
        document.body.appendChild(alertMessage);
        this.messages.push(alertMessage);
        setTimeout(() => {
            alertMessage.classList.add('gameField__alert-hide');
            setTimeout(() => {
                this.messages = this.messages.filter(el => el !== alertMessage);
                alertMessage.classList.remove('gameField__alert-hide');
                alertMessage.remove();
            }, 1000);
        }, 2000);
    }

    enterClick(_that = this) {
        if (_that.input.length === _that.wordLength) {
            if (!_that.lexicon.hard.includes(_that.input.join(''))) {
                _that.showAlertMessage('Такого слова нет!', 'Wrong word');
                return;
            }
            let wordCopy = _that.word.split('');
            let inputCopy = _that.input.slice();
            for (let i = 0; i < inputCopy.length; i++) {
                const currentLetter = _that.buttons.filter(el => el.letter === inputCopy[i])[0];
                if (!currentLetter.found) {
                    currentLetter.element.style.backgroundColor = 'var(--clr-wrong)';
                }
                _that.currentRow.children[i].style.backgroundColor = 'var(--clr-wrong)';
                if (inputCopy[i] === wordCopy[i]) {
                    currentLetter.found = true;
                    currentLetter.element.style.backgroundColor = 'var(--clr-found)';
                    wordCopy[i] = '-';
                    inputCopy[i] = '*';
                    _that.currentRow.children[i].style.backgroundColor = 'var(--clr-found)';
                    continue;
                }
            }
            for (let i = 0; i < inputCopy.length; i++) {
                if (wordCopy.includes(inputCopy[i])) {
                    const currentLetter = _that.buttons.filter(el => el.letter === inputCopy[i])[0];
                    if (!currentLetter.found) {
                        currentLetter.element.style.backgroundColor = 'var(--clr-alert)'
                    }
                    wordCopy[wordCopy.indexOf(inputCopy[i])] = '-';
                    inputCopy[i] = '*';
                    _that.currentRow.children[i].style.backgroundColor = 'var(--clr-alert)';
                    continue;
                }
            }

            if (_that.input.join('') !== _that.word) {
                _that.attempts++;
                _that.setSettings('attempts', _that.attempts);
                _that.createGameFieldRow();
                _that.input.length = 0;
            } else {
                _that.removeEvents(_that);
                _that.attempts++;
                _that.addStats();
                _that.attempts = 0;
                _that.setSettings('attempts', 0);
                _that.removeSettings('startTime');
                _that.seed = _that.random.x;
                _that.setSettings('seed', _that.seed);
                _that.showAlertMessage('Победа!', 'Victory alert');
            }
        }
    }

    backspaceClick(_that) {
        if (_that.input.length >= 1) {
            _that.currentRow.children[_that.input.length - 1].innerText = '';
            _that.input.pop();
        }
    }

    removeEvents(_that) {
        document.removeEventListener('keydown', _that.main);
        _that.buttons.forEach(el => el.element.onclick = null);
    }

    addStats() {
        this.stats.push({
            id: this.stats.length,
            seed: this.seed,
            word: this.word,
            attempts: this.attempts,
            time: Date.now() - this.startTime
        });
        this.setSettings('stats', this.stats);
    }

    getSettings(param) {
        return JSON.parse(localStorage.getItem(param));
    }

    setSettings(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeSettings(param) {
        localStorage.removeItem(param);
    }
}

export default game;