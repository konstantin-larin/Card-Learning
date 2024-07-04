import CreateSubjectForm from "./pages/subjects/CreateSubjectForm";

import './index.css';
import "./vars.css";
import "./utils.css";
import "./reset.css";

import PreloaderPage from "./pages/preloader/PreloaderPage";
import SubjectsPage from "./pages/subjects/SubjectsPage";
import TopicsPage from "./pages/topics/TopicsPage";
import CardsPage from "./pages/cards/CardsPage";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import colorMaker from "./helpers/colorMaker";
import CreateTopicForm from "./pages/topics/CreateTopicForm";
import CreateCardForm from "./pages/cards/CreateCardForm";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";

customElements.define(ModalWindow.tag, ModalWindow);
customElements.define(PreloaderPage.tag, PreloaderPage);
customElements.define(SubjectsPage.tag, SubjectsPage);
customElements.define(TopicsPage.tag, TopicsPage);
customElements.define(CardsPage.tag, CardsPage);


// функция перехода между страницами
window.currentPageName = null;
const appTitle = document.getElementById('app-title');
const backRefBtn = document.getElementById("back-ref");
backRefBtn.onclick = () => {
    window.toPage(backRefBtn.dataset.prevPage);
}
window.toPage = async function (pageName) {
    if (window.currentPageName) {
        const currentPage = document.querySelector(window.currentPageName);
        const promise = currentPage.hide();
        await promise;
    }
    if (pageName) {
        const page = document.querySelector(pageName);
        switch (pageName) {
            case "preloader-page": {
                document.getElementById('header').classList.add('d-none');
                appTitle.textContent = '';
                backRefBtn.textContent = "";
                backRefBtn.dataset.prevPage = null;
                break;
            }
            case 'subjects-page': {
                colorMaker.setBgColor(colorMaker.lightColor);
                document.getElementById('header').classList.remove('d-none');
                document.getElementById('back-ref').classList.add('hidden');
                appTitle.textContent = 'Card Learning';
                backRefBtn.dataset.prevPage = 'preloader-page';
                break;
            }
            case "topics-page": {
                document.getElementById('header').classList.remove('d-none');
                document.getElementById('back-ref').classList.remove('hidden');
                appTitle.textContent = window.currentSubject?.name;
                backRefBtn.textContent = "К предметам";
                backRefBtn.dataset.prevPage = 'subjects-page';
                break;
            }
            case "cards-page": {
                document.getElementById('header').classList.remove('d-none');
                document.getElementById('back-ref').classList.remove('hidden');
                appTitle.textContent = window.currentTopic?.name;
                backRefBtn.textContent = "К темам";
                backRefBtn.dataset.prevPage = 'topics-page';
                break;
            }
        }

        window.currentPageName = pageName;

        await page.show();
    }
    return Promise.resolve();
}

window.toPage('preloader-page');


window.openCreateSubjectForm = function () {
    const form = document.createElement('form', {
        is: CreateSubjectForm.tag
    });

    form.classList.add('create-item-form');
    document.getElementById('modal-window').open(form);
}

window.openCreateTopicForm = function () {
    const form = document.createElement('form', {
        is: CreateTopicForm.tag
    });

    form.classList.add('create-item-form');
    document.getElementById('modal-window').open(form);
}

window.openCreateCardForm = async function (edit = false) {
    const form = document.createElement('form', {
        is: CreateCardForm.tag,
    });
    form.id = 'create-card-form'

    await document.getElementById('modal-window').open(form, {
        closeFunc() {
            form.blockEdit();
        }
    });

    await form.addEditor();
    // не предусмотрел - плохой код
    // это разрешение на редактирование, если создаешь новую карточку
    if (edit) {
        form.accessEdit();
    } else {
        form.blockEdit();
    }

}

