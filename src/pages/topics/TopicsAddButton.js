import colorMaker from "../../helpers/colorMaker";



export default class TopicsAddButton extends HTMLButtonElement {
    static  tag = 'topics-add-button';
    constructor() {
        super();
    }
    connectedCallback(){
        this.onclick =  () => {
            // новый topic
            window.currentTopic = {
                id: +new Date() + '_topic',
                id_subject: window.currentSubject.id,
                name: "",
                cardsColor: colorMaker.currentCardsColor,
            }

            console.log("Добавляем", window.currentTopic);

            window.openCreateTopicForm();
        }
    }
}
