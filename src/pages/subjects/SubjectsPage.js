import Page from "../Page/Page";
import "./subjects.css";
import SubjectsList from "./SubjectsList";
import SubjectsAddButton from "./SubjectsAddButton";
import CreateSubjectForm from "./CreateSubjectForm";

export default class SubjectsPage extends Page{
    static tag = 'subjects-page';
    constructor() {
        super();
        customElements.define(SubjectsList.tag, SubjectsList);
        customElements.define(SubjectsAddButton.tag, SubjectsAddButton, {extends: "button"});
        customElements.define(CreateSubjectForm.tag, CreateSubjectForm, {extends: "form"});
        // элемент создан
    }

    connectedCallback() {
        super.connectedCallback();
        // браузер вызывает этот метод при добавлении элемента в документ
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // вызывается при изменении одного из перечисленных выше атрибутов
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    async show(){
        const list = await window.dbAccess.getSubjects();
        this.querySelector('subjects-list').generate(list);
        super.show();
    }
}
