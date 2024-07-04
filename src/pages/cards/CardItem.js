export default class CardItem extends HTMLElement {
    static tag = 'card-item';

    constructor() {
        super();
        this.isAdded = false;
        this.isListened = false;
    }

    connectedCallback() {
        this.classList.add("card-item", 'list-item');

        this.isAdded = true;
    }

    async setCardModel({id, name, description= '', info= '', id_topic, save = true}) {
        if (!this.isAdded) {
            throw new Error("Сначала добавьте элемент card-item")
        }

        this.dataset.name = name;
        this._model = {id, name, info, description, id_topic};

        if (save) await window.dbAccess.putCard(this._model);
        this.id = id;
        this.dataset.name = name;

        // ставим обработчики, причем единожды
        if (!this.isListened) {
            this.isListened = true;
            this.onclick = async (e) => {
                window.currentCard = structuredClone(this._model);
                await window.openCreateCardForm();
            }
        }
    }

}
