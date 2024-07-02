import SaveSubjectButton from "./SaveSubjectButton";

export default class CreateSubjectForm extends HTMLFormElement {
    static tag = 'create-subject-form';

    constructor() {
        super();
        if (!customElements.get(SaveSubjectButton.tag)) {
            customElements.define(SaveSubjectButton.tag, SaveSubjectButton, {extends: "button"});
        }
    }

    connectedCallback() {
        this.classList.add('create-subject-form');
        this.innerHTML = `
             <fieldset>
                    <label for="subjectNameInput">Название предмета:</label>          
                    <input type="text" id="subjectNameInput"  name="subjectNameInput" value="${window.currentSubject.name}" required>
             </fieldset>                                    
             <fieldset>
             <label for="subjectBgColorInput">Цвет предмета:</label>
                 <input type="color" id="subjectBgColorInput" name="subjectBgColorInput" value="${window.currentSubject.bgColor}">
             </fieldset>
                        
              <button type="button" class="button save-button" is="${SaveSubjectButton.tag}">Сохранить</button>
        `

        document.getElementById("subjectNameInput").onkeydown = (e) => {
            if(e.key === 'Enter'){
                e.preventDefault();
                if(e.target.value.length > 0){
                    this.save();
                }
            }
        }
    }

    async save() {
        if(this.disabled) return;
        this.disabled = true;

        const formData = new FormData(this);
        const name = formData.get("subjectNameInput")
        const bgColor = formData.get("subjectBgColorInput");
        if (name.length > 0) {
            window.currentSubject.name = name;
            window.currentSubject.bgColor = bgColor;


            await document.querySelector("subjects-list").refreshByCurrentSubject();

            document.getElementById('modal-window').close();

        } else {
            this.elements.subjectNameInput.reportValidity();
        }


        this.disabled = false;
    }
}
