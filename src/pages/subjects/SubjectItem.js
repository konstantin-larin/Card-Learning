import colorMaker from "../../helpers/colorMaker";

export default class SubjectItem extends HTMLElement {
    static tag = 'subject-item';

    constructor() {
        super();
        this.isAdded = false;
        this.isListened = false;
    }

    connectedCallback() {
        this.classList.add("subject-item", 'list-item');
        this.dataset.func = 'choose';
        const nameElement = document.createElement('span');
        nameElement.classList.add('list-item-name');
        const buttons = document.createElement('div');
        buttons.classList.add('list-item-buttons');
        buttons.innerHTML = `
            <button data-func="edit" class="list-item-button">
                <?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 18.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Edit" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01l6.774-6.771
\tl6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932
\tc-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881
\tL5.68,17.217z"/>
</svg>

            </button>
            <button data-func="delete" class="list-item-button">
            <?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Trash" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
<path d="M3.389,7.113L4.49,18.021C4.551,18.482,6.777,19.998,10,20c3.225-0.002,5.451-1.518,5.511-1.979l1.102-10.908
\tC14.929,8.055,12.412,8.5,10,8.5C7.59,8.5,5.072,8.055,3.389,7.113z M13.168,1.51l-0.859-0.951C11.977,0.086,11.617,0,10.916,0
\tH9.085c-0.7,0-1.061,0.086-1.392,0.559L6.834,1.51C4.264,1.959,2.4,3.15,2.4,4.029v0.17C2.4,5.746,5.803,7,10,7
\tc4.198,0,7.601-1.254,7.601-2.801v-0.17C17.601,3.15,15.738,1.959,13.168,1.51z M12.07,4.34L11,3H9L7.932,4.34h-1.7
\tc0,0,1.862-2.221,2.111-2.522C8.533,1.588,8.727,1.5,8.979,1.5h2.043c0.253,0,0.447,0.088,0.637,0.318
\tc0.248,0.301,2.111,2.522,2.111,2.522H12.07z"/>
</svg>

</button>
        `

        this.append(nameElement, buttons);


        this.isAdded = true;
    }

    async setSubjectModel({id, name, bgColor, save = true}) {
        if(!this.isAdded){ throw new Error("Сначала добавьте элемент subject-item")}

        this._model = {id, name, bgColor};
        if (save) await window.dbAccess.putSubject(this._model);
        this.id = id;
        this.querySelector('.list-item-name').textContent = name;

        // ставим обработчики, причем единожды
        if(!this.isListened){
            this.isListened = true;
            this.onclick = async (e) => {
                const func = e.target.dataset.func;
                console.log(func);
                if (func) {
                    switch (func) {
                        case 'choose': {
                            window.currentSubject = structuredClone(this._model);
                            await window.toPage('thematics-page');
                            return
                        }
                        case 'edit': {
                            const subject = await window.dbAccess.getSubject(this.id)
                            window.currentSubject = structuredClone(subject);
                            window.openCreateSubjectForm();
                            return;
                        }
                        case 'delete': {
                            await window.dbAccess.deleteSubject(this.id);
                            this.closest('subjects-list').removeItem(this.id);
                            return;
                        }
                    }
                }
            }
            this.onmouseenter = () => {
                setTimeout(() => {
                    colorMaker.setBgColor(this._model.bgColor)
                }, 0)
            }
            this.onmouseleave = () => {
                setTimeout(() => {
                    colorMaker.setBgColor(colorMaker.lightColor);
                }, 0)
            }
        }
    }

}
