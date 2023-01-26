export class Stats {
    constructor(parent) {
        this.element = parent;
        if (!this.getSettings('stats')) {
            this.stats = [];
        } else {
            this.stats = this.getSettings('stats');
        }
        console.log(this.stats);

        this.showModal = this.showModal.bind(this);

        this.showModal();
    }

    showModal() {
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

        const rowHeader = document.createElement('ul');
        rowHeader.className = 'gameModal__row-header';
        rowHeader.innerHTML = `<li class='gameModal__row-item gameModal__row-id'>ID</li>
        <li class='gameModal__row-item gameModal__row-seed'>SEED</li>
        <li class='gameModal__row-item gameModal__row-word'>СЛОВО</li>
        <li class='gameModal__row-item gameModal__row-tries'>ПОП...</li>
        <li class='gameModal__row-item gameModal__row-time'>ВРЕМЯ</li>`;
        this.modalContent.appendChild(rowHeader);

        this.stats.forEach(el => {
            const time = new Date(el.time);
            const timeLine = `${time.getUTCDate(time) - 1}D:${time.getUTCHours(time)}H:${time.getUTCMinutes(time)}M:${time.getUTCSeconds(time)}S`;
            const row = document.createElement('div');
            row.className = 'gameModal__row';
            row.innerHTML = `<li class='gameModal__row-item gameModal__row-id'>${el.id}</li>
                <li class='gameModal__row-item gameModal__row-seed'>${el.seed}</li>
                <li class='gameModal__row-item gameModal__row-word'>${el.word.toUpperCase()}</li>
                <li class='gameModal__row-item gameModal__row-tries'>${el.attempts}</li>
                <li class='gameModal__row-item gameModal__row-time'>${timeLine}</li>`;
            this.modalContent.appendChild(row);
        });
        

        

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