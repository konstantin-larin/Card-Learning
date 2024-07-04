import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";

const ipcRenderer = require('electron/renderer').ipcRenderer;

export default class CreateCardForm extends HTMLFormElement {
    static tag = 'create-card-form';

    constructor() {
        super();
    }

    async addEditor() {
        this.description = new EditorJS({
            holder: document.getElementById('card-description'),
            placeholder: "Введите описание карточки",
            minHeight: 0,
            tools: {
                paragraph: {
                    class: Paragraph,
                }
            },
            data: window.currentCard.description,
            readOnly: true,
        });
        await new Promise((resolve, reject) => {
            this.description.isReady.then(() => {
                this.info = new EditorJS({
                    readOnly: true,
                    holder: document.getElementById('card-inner'),
                    placeholder: "Информация",
                    minHeight: 50,
                    tools: {
                        paragraph: {
                            class: Paragraph,
                        },
                        image: {
                            class: Image,
                            config: {
                                uploader: {
                                    uploadByFile(file) {
                                        return new Promise((resolve, reject) => {
                                            const reader = new FileReader();
                                            reader.onload = async (event) => {
                                                const base64Data = event.target.result.split(',')[1]; // Извлекаем base64 данные
                                                const fileName = `${Date.now()}-${file.name}`; // Уникальное имя файла

                                                try {
                                                    const filePath = await ipcRenderer.invoke('save-image', base64Data, fileName);
                                                    resolve({
                                                        success: 1,
                                                        file: {
                                                            url: filePath
                                                        }
                                                    });
                                                } catch (error) {
                                                    reject(new Error('Ошибка загрузки изображения'));
                                                }
                                            };
                                            reader.readAsDataURL(file);
                                        });
                                    }
                                }
                            }
                        }
                    },
                    data: window.currentCard.info
                });
                this.info.isReady.then(() => {
                    resolve();
                });
            });
        });
        return Promise.resolve();
    }

    async connectedCallback() {
        this.disabled = true;
        this.classList.add('create-card-form');

        this.saveBtn = document.createElement('button');
        this.saveBtn.textContent = 'Сохранить';
        this.saveBtn.classList.add('button', 'save-button', 'card-save-button', 'd-none');
        this.parentElement.append(this.saveBtn);

        this.saveBtn.onclick = () => {
            this.save();
        }

        this.buttons = document.createElement('div');
        this.buttons.classList.add('card-buttons');
        this.buttons.innerHTML = `
            <button class="card-buttons-button" data-func="delete">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
<path d="M3.389,7.113L4.49,18.021C4.551,18.482,6.777,19.998,10,20c3.225-0.002,5.451-1.518,5.511-1.979l1.102-10.908
\tC14.929,8.055,12.412,8.5,10,8.5C7.59,8.5,5.072,8.055,3.389,7.113z M13.168,1.51l-0.859-0.951C11.977,0.086,11.617,0,10.916,0
\tH9.085c-0.7,0-1.061,0.086-1.392,0.559L6.834,1.51C4.264,1.959,2.4,3.15,2.4,4.029v0.17C2.4,5.746,5.803,7,10,7
\tc4.198,0,7.601-1.254,7.601-2.801v-0.17C17.601,3.15,15.738,1.959,13.168,1.51z M12.07,4.34L11,3H9L7.932,4.34h-1.7
\tc0,0,1.862-2.221,2.111-2.522C8.533,1.588,8.727,1.5,8.979,1.5h2.043c0.253,0,0.447,0.088,0.637,0.318
\tc0.248,0.301,2.111,2.522,2.111,2.522H12.07z"/>
</svg>

</button>
            <button class="card-buttons-button" data-func="edit">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">
<path d="M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01l6.774-6.771
\tl6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932
\tc-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881
\tL5.68,17.217z"/>
</svg>
</button>
<button class="card-buttons-button" data-func="readonly">
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 18.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
<path d="M10,4.4C3.439,4.4,0,9.232,0,10c0,0.766,3.439,5.6,10,5.6c6.56,0,10-4.834,10-5.6C20,9.232,16.56,4.4,10,4.4z M10,14.307
\tc-2.455,0-4.445-1.928-4.445-4.307c0-2.379,1.99-4.309,4.445-4.309c2.455,0,4.444,1.93,4.444,4.309
\tC14.444,12.379,12.455,14.307,10,14.307z M10,10c-0.407-0.447,0.663-2.154,0-2.154c-1.228,0-2.223,0.965-2.223,2.154
\tc0,1.189,0.995,2.154,2.223,2.154c1.227,0,2.223-0.965,2.223-2.154C12.223,9.453,10.346,10.379,10,10z"/>
</svg>
</button>

        `;
        this.buttons.onclick = async (e) => {
            const func = e.target.dataset.func;
            if (func) {
                if (func === 'delete') {
                    await window.dbAccess.deleteCard(window.currentCard.id);
                    document.getElementById('cards-list').removeItem(window.currentCard.id);
                    this.parentElement.close();
                    this.blockEdit();
                }
                if (func === 'edit') {
                    this.accessEdit();
                }
                if (func === 'readonly') {
                    this.blockEdit();

                }
            }
        }
        this.parentElement.append(this.buttons);
        this.innerHTML = `            
            <input class="card-name-input" name="cardNameInput" value="${window.currentCard.name}" placeholder="Название карточки..." required>
            <div id="card-description" class="card-description"></div>         
            <div id="card-inner" class="card-inner"></div>
        `;

        return Promise.resolve();
    }

    disconnectedCallback() {
        this.buttons.remove();
        this.saveBtn.remove();
    }

    blockEdit() {
        this.buttons.querySelector('[data-func="edit"]').classList.remove('d-none');
        this.buttons.querySelector('[data-func="readonly"]').classList.add('d-none');

        this.description.readOnly.toggle(true).then(() => {
            this.info.readOnly.toggle(true).then(() => {
                this.elements.cardNameInput.disabled = true;
                this.disabled = true;
                this.saveBtn.classList.add('d-none');
            })
        })
    }

    accessEdit() {
        this.buttons.querySelector('[data-func="readonly"]').classList.remove('d-none');
        this.buttons.querySelector('[data-func="edit"]').classList.add('d-none');

        this.description.readOnly.toggle(false).then(() => {
            this.info.readOnly.toggle(false).then(() => {
                this.elements.cardNameInput.disabled = false;
                this.disabled = false; //разрешаем редактирование
                this.saveBtn.classList.remove('d-none');
            })
        })
    }

    async save() {
        if (this.disabled) return;
        this.disabled = true;

        const formData = new FormData(this);
        const name = formData.get("cardNameInput");
        const description = await this.description.saver.save();
        const info = await this.info.saver.save();
        if (name.length > 0) {
            window.currentCard.name = name;
            window.currentCard.description = description;
            window.currentCard.info = info;
            await document.querySelector("cards-list").refreshByCurrentCard();

            document.getElementById('modal-window').close();

        } else {
            this.elements.cardNameInput.reportValidity();
        }


        this.disabled = false;
    }
}


// case 'delete': {
//     await window.dbAccess.deleteCard(this.id);
//     this.closest('cards-list').removeItem(this.id);
//     setTimeout(() => {
//     }, 0);
//     return;
// }

// case 'edit': {
//     const card = await window.dbAccess.getCard(this.id)
//     window.currentCard = structuredClone(card);
//     window.openCreateCardForm();
//     return;
// }
