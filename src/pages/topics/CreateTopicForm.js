import SaveTopicButton from "./SaveTopicButton";
import 'huebee/huebee.css';
import Huebee from "huebee";
import colorMaker from "../../helpers/colorMaker";

export default class CreateTopicForm extends HTMLFormElement {
    static tag = 'create-topic-form';

    constructor() {
        super();
        if (!customElements.get(SaveTopicButton.tag)) {
            customElements.define(SaveTopicButton.tag, SaveTopicButton, {extends: "button"});
        }
    }

    connectedCallback() {
        this.classList.add('create-topic-form');
        this.innerHTML = `
             <fieldset>
                    <label for="topicNameInput">Название темы:</label>          
                    <input type="text" id="topicNameInput"  name="topicNameInput" value="${window.currentTopic.name}" required>
             </fieldset>                                    
             <fieldset>
             <label for="topicCardsColorInput">Цвет карточек:</label>
                 <input id="topicCardsColorInput" name="topicCardsColorInput" value="${window.currentTopic.cardsColor}" readonly style="text-align: center; cursor: pointer;">
             </fieldset>
                        
              <button type="button" class="button save-button" is="${SaveTopicButton.tag}">Сохранить</button>
        `

        document.getElementById("topicNameInput").onkeydown = (e) => {
            if(e.key === 'Enter'){
                e.preventDefault();
                if(e.target.value.length > 0){
                    this.save();
                }
            }
        }
        const hueb = new Huebee(document.getElementById('topicCardsColorInput'), {
            customColors: [ '#C25', '#E62', '#EA0', '#19F', '#333' ],
            saturations: 1,
            shades: 7,
            setBGColor: true,
            setText: false,  // Отключает установку текста в поле ввода
        });

        hueb.on('change', (val) => {
            document.getElementById('topicCardsColorInput').value = val;
        });
    }

    async save() {
        if(this.disabled) return;
        this.disabled = true;

        const formData = new FormData(this);
        const name = formData.get("topicNameInput")
        const cardsColor = formData.get("topicCardsColorInput");

        if (name.length > 0) {
            window.currentTopic.name = name;
            window.currentTopic.cardsColor = cardsColor;
            colorMaker.setCardsColor(cardsColor);
            await document.querySelector("topics-list").refreshByCurrentTopic();

            document.getElementById('modal-window').close();

        } else {
            this.elements.topicNameInput.reportValidity();
        }


        this.disabled = false;
    }
}
