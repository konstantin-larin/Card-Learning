import CardItem from "./CardItem";
export default class CardsList extends HTMLElement{
    static tag = 'cards-list';
    constructor() {
        customElements.define(CardItem.tag, CardItem);
        super();
        this.isGenerated = false;
    }

    connectedCallback(){
        this.items = document.getElementsByTagName(CardItem.tag);
        this.classList.add('list', 'cards-list');
    }
    generate(list = []){
        if(this.isGenerated) return;
        Array.from(this.items).forEach(item => {item.remove()});
        if(list.length === 0){
            this.querySelector('.cards-list-empty').classList.remove('d-none')
        } else{
            this.querySelector('.cards-list-empty').classList.add('d-none');
            for(let item of list){
                const card = document.createElement(CardItem.tag);
                this.append(card);
                card.setCardModel({...item, save: false});
            }
        }
        this.isGenerated = true;
    }

    async refreshByCurrentCard(){
        let cardItem = document.getElementById(window.currentCard.id);

        // если нет добавляем
        if (!cardItem) {
            cardItem = document.createElement(CardItem.tag);
            this.append(cardItem);
        }


        await cardItem.setCardModel(structuredClone(window.currentCard));

        if(this.items.length > 0) {
            this.querySelector('.cards-list-empty').classList.add('d-none');
        }
    }
    removeItem(id){
        document.getElementById(id).remove();
        if(this.items.length === 0){
            this.querySelector('.cards-list-empty').classList.remove('d-none')
        }
    }
}
