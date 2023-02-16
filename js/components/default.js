export default class Element {
    constructor(options) {
        this.options = {};
        this.options.parent = options.parent ?? document.body;
        this.options.element = options.element ?? 'div';
        this.options.htmlContent = options.htmlContent ?? '';
        this.options.classNames = options.classNames ? [].concat(options.classNames) : [];

        this.parent = this.options.parent;
        this.element = document.createElement(this.options.element);
        this.element.innerHTML = this.options.htmlContent;
        this.options.classNames.forEach(className => {
            this.element.classList.add(className);
        });

        this.parent.appendChild(this.element);
        this.callback = () => {};
        this.element.onclick = this.click.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    destroy() {
        this.element.onclick = null;
        this.element.remove();
    }

    click(e) {
        this.callback(e);
    }
}