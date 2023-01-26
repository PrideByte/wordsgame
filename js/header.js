export class Header {
    constructor() {
        if (!this.getSettings('theme')) {
            this.setSettings('theme', 'light');
        }
        this.theme = this.getSettings('theme');

        this.layout = this.layout.bind(this);

        this.layout();
    }

    layout() {
        this.element = document.createElement('header');
        this.element.className = 'gameHeader';
        document.body.prepend(this.element);
        
        this.menubtn = document.createElement('div');
        this.menubtn.className = 'gameHeader__menubtn';
        this.menubtn.innerText = 'm';
        this.element.appendChild(this.menubtn);
        
        this.logo = document.createElement('div');
        this.logo.className = 'gameHeader__logo';
        this.logo.innerHTML = 'Угадай слово!';
        this.element.appendChild(this.logo);
        
        this.themebtn = document.createElement('div');
        this.themebtn.className = 'gameHeader__themebtn';
        if (this.theme === 'dark') {
            document.body.classList.add('dark-theme');
            this.themebtn.innerText = 'l';
        } else {
            this.themebtn.innerText = 'd';
        }
        this.element.appendChild(this.themebtn);
        
        this.makeMenu();        

        this.menubtn.onclick = this.showMenu.bind(this);
        this.themebtn.onclick = this.themeSwitch.bind(this);
    }

    themeSwitch() {
        if (this.theme === 'light') {
            !document.body.classList.contains('dark-theme') && document.body.classList.add('dark-theme');
            this.theme = 'dark';
            this.themebtn.innerText = 'l';
        } else {
            document.body.classList.remove('dark-theme');
            this.theme = 'light';
            this.themebtn.innerText = 'd';
        }
        this.setSettings('theme', this.theme);
    }

    makeMenu() {
        this.menu = document.createElement('nav');
        this.menu.className = 'gameHeader__menu';

        this.closebtn = document.createElement('div');
        this.closebtn.className = 'gameHeader__menu-close';
        this.closebtn.innerText = 'c';
        this.menu.appendChild(this.closebtn);

        this.menuList = document.createElement('ul');
        this.menuList.className = 'gameHeader__menu-list';

        this.stats = document.createElement('li');
        this.stats.className = 'gameHeader__menu-item';
        this.stats.innerText = 'Статистика';
        this.menuList.appendChild(this.stats);
        
        this.howto = document.createElement('li');
        this.howto.className = 'gameHeader__menu-item';
        this.howto.innerText = 'Правила игры';
        this.menuList.appendChild(this.howto);

        this.menu.appendChild(this.menuList);
        this.element.appendChild(this.menu);

        this.closebtn.onclick = this.closeMenu.bind(this);
        this.stats.onclick = this.showStats.bind(this);
        this.howto.onclick = this.showModal.bind(this);
    }

    showMenu() {
        !this.menu.classList.contains('gameHeader__menu-opened') && this.menu.classList.add('gameHeader__menu-opened');
    }

    closeMenu() {
        this.menu.classList.remove('gameHeader__menu-opened');
    }

    showStats() {
        console.log('Статы');
    }

    showModal() {
        this.closeMenu();

        this.modalWrapper = document.createElement('div');
        this.modalWrapper.className = 'gameModal__wrapper';

        this.modal = document.createElement('div');
        this.modal.className = 'gameModal';

        this.closeModalbtn = document.createElement('div');
        this.closeModalbtn.innerText = 'c';
        this.closeModalbtn.className = 'gameModal__closebtn';
        this.modal.appendChild(this.closeModalbtn);

        this.modalContent = document.createElement('div');
        this.modalContent.className = 'gameModal__content';

        const header = document.createElement('h2');
        header.className = 'gameModal__title';
        header.innerText = 'Правила игры:';
        this.modalContent.appendChild(header);

        const description = document.createElement('p');
        description.className = 'gameModal__description';
        description.innerHTML = `Необходимо угадать слово. Каждое слово должно быть существительным из 5 букв.<br>
        Цвет каждой буквы изменится после ввода, что облегчит дальнейшее угадывание.`;
        this.modalContent.appendChild(description);

        const examplesTitle = document.createElement('h3');
        examplesTitle.innerText = 'Примеры:';
        examplesTitle.className = 'gameModal__subtitle';
        this.modalContent.appendChild(examplesTitle);

        const examples = document.createElement('ul');
        examples.className = 'gameModal__exampleList';
        examples.innerHTML = `<li class='gameModal__example'>
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
        </li>`;
        this.modalContent.appendChild(examples);

        const breakLine = document.createElement('hr');
        breakLine.className = 'gameModal__line';
        this.modalContent.appendChild(breakLine);

        const descriptionSecondary = document.createElement('p');
        descriptionSecondary.className = 'gameModal__description';
        descriptionSecondary.innerHTML = `Помните, что одна и та же буква может встретиться в слове несколько раз.`;
        this.modalContent.appendChild(descriptionSecondary);

        const examplesTitle2 = document.createElement('h3');
        examplesTitle2.innerText = 'Примеры:';
        examplesTitle2.className = 'gameModal__subtitle';
        this.modalContent.appendChild(examplesTitle2);

        const examples2 = document.createElement('ul');
        examples2.className = 'gameModal__exampleList';
        examples2.innerHTML = `<li class='gameModal__example'>
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
        </li>`;
        this.modalContent.appendChild(examples2);

        this.modal.appendChild(this.modalContent);
        this.modalWrapper.appendChild(this.modal);
        this.element.appendChild(this.modalWrapper);

        this.closeModalbtn.onclick = this.closeModal.bind(this);
        this.modalWrapper.onclick = this.closeModal.bind(this);
    }

    closeModal(e) {
        if (e.target === this.modalWrapper || e.target === this.closeModalbtn) {
            this.closeModalbtn.onclick = null;
            this.modalWrapper.onclick = null;
            this.modalWrapper.remove();
        }
    }

    getSettings(param) {
        return JSON.parse(localStorage.getItem(param));
    }

    setSettings(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}