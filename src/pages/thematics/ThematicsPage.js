import Page from "../Page/Page";

export default class ThematicsPage extends Page {
    static tag = 'thematics-page'

    constructor() {
        super();
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
}
