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

        this.settingsbtn = document.createElement('div');
        this.settingsbtn.className = 'gameHeader__settingsbtn';
        this.settingsbtn.innerText = 'm';
        this.element.appendChild(this.settingsbtn);

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

    getSettings(param) {
        return JSON.parse(localStorage.getItem(param));
    }

    setSettings(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}