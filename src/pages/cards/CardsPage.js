import Page from "../Page/Page";
import "./cards.css";
import CardsList from "./CardsList";
import CardsAddButton from "./CardsAddButton";
import CreateCardForm from "./CreateCardForm";

export default class SubjectsPage extends Page{
    static tag = 'cards-page';
    constructor() {
        super();
        customElements.define(CardsList.tag, CardsList);
        customElements.define(CardsAddButton.tag, CardsAddButton, {extends: "button"});
        customElements.define(CreateCardForm.tag, CreateCardForm, {extends: "form"});
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
        const list = await window.dbAccess.getCardsByTopic(window.currentTopic.id);
        this.querySelector('cards-list').isGenerated = false;
        this.querySelector('cards-list').generate(list);
        super.show();
    }
}
