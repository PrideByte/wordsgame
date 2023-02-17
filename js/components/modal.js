import Element from "./default.js";
import Stats from "./stats_modal_inner.js";
import Rules from "./rules_modal_inner.js";
import Victory from "./victory_scene_inner.js";

export default class Modal extends Element {
    constructor(parent, type) {
        const options = {
            parent: parent,
            classNames: ['gameModal__wrapper', 'gameModal__wrapper-show']
        }
        super(options);

        const modalWindow = new Element({
            parent: this.element,
            classNames: 'gameModal'
        });

        this.closebtn = new Element({
            parent: modalWindow.element,
            element: 'div',
            classNames: 'gameModal__closebtn',
            htmlContent: 'c'
        });

        this.modalContent = new Element({
            parent: modalWindow.element,
            classNames: 'gameModal__content'
        });

        if (type === 'stats') {
            this.content = new Stats(this.modalContent.element);
        } else if (type === 'rules') {
            this.content = new Rules(this.modalContent.element);
        } else if (type === 'victory') {
            this.content = new Victory(this.modalContent.element);
        }

        this.closebtn.callback = this.closeModal.bind(this);
        this.callback = this.closeModal.bind(this);
    }

    closeModal(e) {
        if (e.target === this.element || e.target === this.closebtn.element) {
            this.closebtn.destroy();
            this.destroy();
        }
    }
}