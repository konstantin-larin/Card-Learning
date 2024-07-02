export default class SaveSubjectButton extends HTMLButtonElement{
    static tag = 'save-subject-button';
    constructor() {
        super();
    }

    connectedCallback(){
        this.onclick = this.form.save.bind(this.form);
    }
}
