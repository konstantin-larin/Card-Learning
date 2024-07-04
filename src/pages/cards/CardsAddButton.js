import colorMaker from "../../helpers/colorMaker";



export default class CardsAddButton extends HTMLButtonElement {
    static  tag = 'cards-add-button';
    constructor() {
        super();
    }
    connectedCallback(){
        this.onclick =  () => {
            // новый card
            window.currentCard = {
                id: +new Date() + '_card',
                name: "",
                description: "",
                info: "",

                id_topic: window.currentTopic.id,
            }

            window.openCreateCardForm(true);
        }
    }
}
