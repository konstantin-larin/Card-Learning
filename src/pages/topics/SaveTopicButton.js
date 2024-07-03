export default class SaveTopicButton extends HTMLButtonElement{
    static tag = 'save-topic-button';
    constructor() {
        super();
    }

    connectedCallback(){
        this.onclick = this.form.save.bind(this.form);
    }
}
