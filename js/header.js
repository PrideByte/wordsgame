import Element from "./components/default.js";
import { setSettings, getSettings } from "./helpers.js";
import Modal from "./components/modal.js";

export default class Header extends Element {
    constructor() {
        super({
            parent: document.body,
            element: 'header',
            classNames: 'gameHeader'
        });
        if (!getSettings('theme')) {
            setSettings('theme', 'light');
        }
        this.theme = getSettings('theme');

        this.layout = this.layout.bind(this);

        this.layout();
    }

    layout() {
        this.menubtn = new Element({
            parent: this.element,
            element: 'div',
            classNames: 'gameHeader__menubtn',
            htmlContent: 'm'
        });
        
        const logo = new Element({
            parent: this.element,
            classNames: 'gameHeader__logo',
            htmlContent: 'Угадай слово!'
        });
        
        this.themebtn = new Element({
            parent: this.element,
            classNames: 'gameHeader__themebtn',
            htmlContent: (this.theme === 'dark') ? 'l' : 'd'
        });
        this.theme === 'dark' && document.body.classList.add('dark-theme');
        
        this.makeMenu();        

        this.menubtn.callback = this.showMenu.bind(this);
        this.themebtn.callback = this.themeSwitch.bind(this);
    }

    themeSwitch() {
        if (this.theme === 'light') {
            !document.body.classList.contains('dark-theme') && document.body.classList.add('dark-theme');
            this.theme = 'dark';
            this.themebtn.element.innerHTML = 'l';
        } else {
            document.body.classList.remove('dark-theme');
            this.theme = 'light';
            this.themebtn.element.innerHTML = 'd';
        }
        setSettings('theme', this.theme);
    }

    makeMenu() {
        this.menu = new Element({
            parent: this.element,
            element: 'nav',
            classNames: 'gameHeader__menu'
        });

        this.closebtn = new Element({
            parent: this.menu.element,
            classNames: 'gameHeader__menu-close',
            htmlContent: 'c'
        });

        const menuList = new Element({
            parent: this.menu.element,
            element: 'ul',
            classNames: 'gameHeader__menu-list'
        });

        this.stats = new Element({
            parent: menuList.element,
            element: 'li',
            classNames: 'gameHeader__menu-item',
            htmlContent: 'Статистика'
        });
        
        this.gameRules = new Element({
            parent: menuList.element,
            element: 'li',
            classNames: 'gameHeader__menu-item',
            htmlContent: 'Правила игры'
        });

        this.closebtn.callback = this.closeMenu.bind(this);
        this.stats.callback = this.showModal.bind(this, 'stats');
        this.gameRules.callback = this.showModal.bind(this, 'rules');
    }

    showMenu() {
        !this.menu.element.classList.contains('gameHeader__menu-opened') && this.menu.element.classList.add('gameHeader__menu-opened');
    }

    closeMenu() {
        this.menu.element.classList.remove('gameHeader__menu-opened');
    }

    showModal(type) {
        this.closeMenu();
        this.statsModal = new Modal(this.element, type);
    }
}