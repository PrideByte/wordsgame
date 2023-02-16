import Element from "./default.js";

export default class Victory {
    constructor(parent, wordNode) {
        this.parent = parent;
        this.wordNode = wordNode;
        

        this.show();
    }

    show() {
        this.parent.appendChild(this.wordNode);
    }
}