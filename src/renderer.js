import CreateSubjectForm from "./pages/subjects/CreateSubjectForm";

const {ipcRenderer} = require('electron');

import './index.css';
import "./vars.css";
import "./utils.css";
import "./reset.css";

import PreloaderPage from "./pages/preloader/PreloaderPage";
import SubjectsPage from "./pages/subjects/SubjectsPage";
import ThematicsPage from "./pages/thematics/ThematicsPage";
import CardsPage from "./pages/cards/CardsPage";
import ModalWindow from "./components/ModalWindow/ModalWindow";

customElements.define(ModalWindow.tag, ModalWindow);
customElements.define(PreloaderPage.tag, PreloaderPage);
customElements.define(SubjectsPage.tag, SubjectsPage);
customElements.define(ThematicsPage.tag, ThematicsPage);
customElements.define(CardsPage.tag, CardsPage);



// функция перехода между страницами
window.currentPageName = null;
const appTitle = document.getElementById('app-title');
const backRefBtn = document.getElementById("back-ref");
backRefBtn.onclick = () => {
    window.toPage(backRefBtn.dataset.prevPage);
}
window.toPage= async function (pageName){
    if(window.currentPageName){
        const currentPage = document.querySelector(window.currentPageName);
        const promise = currentPage.hide();
        await promise;
    }
    if(pageName){
        const page= document.querySelector(pageName);
        switch (pageName) {
            case "preloader-page": {
                document.getElementById('header').classList.add('d-none');
                appTitle.textContent = '';
                backRefBtn.textContent = "";
                break;
            }
            case 'subjects-page': {
                document.getElementById('header').classList.remove('d-none');
                document.getElementById('back-ref').classList.add('hidden');
                appTitle.textContent = 'Card Learning';
                break;
            }
            case "thematics-page": {
                document.getElementById('header').classList.remove('d-none');
                document.getElementById('back-ref').classList.remove('hidden');
                appTitle.textContent = window.currentSubject?.title;
                backRefBtn.textContent = "К предметам";
                break;
            }
            case "cards-page": {
                document.getElementById('header').classList.remove('d-none');
                document.getElementById('back-ref').classList.remove('hidden');
                appTitle.textContent = window.currentThematic?.title;
                backRefBtn.textContent = "К темам";

            }
        }

        backRefBtn.dataset.prevPage = window.currentPageName;
        window.currentPageName = pageName;

        await page.show();
    }
    return Promise.resolve();
}

window.toPage('preloader-page');


window.openCreateSubjectForm = function (){
    const form = document.createElement('form', {
        is: CreateSubjectForm.tag
    });

    form.classList.add('create-item-form');
    document.getElementById('modal-window').open(form);
}
