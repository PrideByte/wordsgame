import Element from "./default.js";


export default class AlertMessage extends Element {
    constructor(options) {
        super({
            classNames: 'gameField__alert',
            htmlContent: options.msg ?? ''
        });
        this.element.onclick = null;

        this.type = options.type ?? 'empty';

        this.wait = options.wait ?? 1000;
        this.animationDuration = options.animationDuration ?? 1000;
        this.hideClass = 'gameField__alert-hide';

        this.fade = this.fade.bind(this);
    }

    fade() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.element.classList.add(this.hideClass);
                setTimeout(() => {
                    this.destroy();
                    resolve();
                }, this.animationDuration);
            }, this.wait);
        });
    }
}