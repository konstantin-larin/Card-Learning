import ColorMaker from "../../helpers/colorMaker";



export default class SubjectsAddButton extends HTMLButtonElement {
    static  tag = 'subjects-add-button';
    constructor() {
        super();
    }
    connectedCallback(){
        this.onclick =  () => {
            // новый subject
            window.currentSubject = {
                id: +new Date() + '_subject',
                name: "",
                bgColor: ColorMaker.currentBgColor,
            }

            window.openCreateSubjectForm();
        }
    }
}
