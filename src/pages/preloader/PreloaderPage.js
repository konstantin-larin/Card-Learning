import Page from "../Page/Page";
import "./preloader.css";
import loadDB from "../../db";
import SubjectsPage from "../subjects/SubjectsPage";
export default class PreloaderPage extends Page{
    static  tag = 'preloader-page';
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

    async show(){

        const dbAccess = await loadDB();

        window.dbAccess = dbAccess;
        await super.show();
        window.toPage("subjects-page");
    }
}
