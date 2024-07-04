import SubjectItem from "./SubjectItem";
export default class SubjectsList extends HTMLElement{
    static tag = 'subjects-list';
    constructor() {
        customElements.define(SubjectItem.tag, SubjectItem);
        super();
        this.isGenerated = false;
    }

    connectedCallback(){
        this.items = document.getElementsByTagName(SubjectItem.tag);
        this.classList.add('list', 'subjects-list');
    }
    generate(list = []){
        if(this.isGenerated) return;
        Array.from(this.items).forEach(item => item.remove);
        if(list.length === 0){
            this.querySelector('.subjects-list-empty').classList.remove('d-none')
        } else{
            this.querySelector('.subjects-list-empty').classList.add('d-none');
            for(let item of list){
                const subject = document.createElement(SubjectItem.tag);
                this.append(subject);
                subject.setSubjectModel({...item, save: false});
            }
        }
        this.isGenerated = true;
    }

    async refreshByCurrentSubject(){
        let subjectItem = document.getElementById(window.currentSubject.id);

        // если нет добавляем
        if (!subjectItem) {
            subjectItem = document.createElement(SubjectItem.tag);
            this.append(subjectItem);
        }


        await subjectItem.setSubjectModel(structuredClone(window.currentSubject));

        if(this.items.length > 0) {
            this.querySelector('.subjects-list-empty').classList.add('d-none');
        }
    }
    removeItem(id){
        document.getElementById(id).remove();
        if(this.items.length === 0){
            this.querySelector('.subjects-list-empty').classList.remove('d-none')
        }
    }
}
