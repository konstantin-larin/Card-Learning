import "./ModalWindow.css";

export default class ModalWindow extends HTMLElement{
    static tag = 'modal-window';
    constructor() {
        super();
        this.classList.add('modal-window', 'd-none');
        this.content = null;
    }

    connectedCallback(){
        const closeElement = document.createElement('button');
        closeElement.classList.add('modal-window-close');
        closeElement.innerHTML =  `
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="20" x2="80" y2="80" stroke="black" stroke-width="4"/>
            <line x1="20" y1="80" x2="80" y2="20" stroke="black" stroke-width="4"/>
        </svg>
        `
        closeElement.onclick = this.close.bind(this);
        this.append(closeElement);
    }
    async addContent(content){
        this.appendChild(content);
        this.content = content;
    }

    removeContent(){
        if(this.content){
            this.closeFunc();
            this.content.remove();
            delete  this.closeFunc;
            delete this.content;
        }
    }

    async open(content = null, {
        closeFunc = () => {
        }
    } = {}){
        this.closeFunc = closeFunc;
        if(content) await this.addContent(content);
        this.classList.remove("d-none");
    }
    close(){
        this.removeContent();
        this.classList.add('d-none');
    }
}
