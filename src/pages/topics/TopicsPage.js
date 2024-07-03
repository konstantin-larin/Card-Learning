import Page from "../Page/Page";
import "./topics.css";
import TopicsList from "./TopicsList";
import TopicsAddButton from "./TopicsAddButton";
import CreateTopicForm from "./CreateTopicForm";

export default class TopicsPage extends Page {
    static tag = 'topics-page'

    constructor() {
        super();
        customElements.define(TopicsList.tag, TopicsList);
        customElements.define(TopicsAddButton.tag, TopicsAddButton, {extends: "button"});
        customElements.define(CreateTopicForm.tag, CreateTopicForm, {extends: "form"});
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
        const list = await window.dbAccess.getTopicsBySubject(window.currentSubject.id);
        this.querySelector('topics-list').isGenerated = false;
        this.querySelector('topics-list').generate(list);
        super.show();
    }
}
