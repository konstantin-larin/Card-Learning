'use strict';
import '../../utils.css';
import "./Page.css";
export default class Page extends HTMLElement{
    static hideAllOtherPages(){
        document.querySelectorAll('.page').forEach(page => {
            page.hide();
        })
    }
    static  tag = 'page';
    constructor() {
        super();
        // элемент создан
        this.classList.add('page');
        this._transitionDuration = 0;
    }

    _setSmooth(bool){
        bool ? this.classList.add('page-smooth') : this.classList.remove('page-smooth');
        this._smooth = bool;
        if(bool){
            this._transitionDuration = parseFloat(getComputedStyle(this).transitionDuration) * 1000 + 100;
        }  else this._transitionDuration = 0;
    }
    isSmooth(){
        return this._smooth;
    }

    connectedCallback(){
    }


    static get observedAttributes() {
        return ['smooth'/* массив имён атрибутов для отслеживания их изменений */];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name){
            case 'smooth': {
                this._setSmooth(newValue === 'true');
                break;
            }
        }
    }

    async hide(){
        if(this.isSmooth()){
            return await new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.classList.add('opacity-0');
                }, 0);

                setTimeout(() => {
                    this.classList.add('d-none');
                    resolve();
                }, this._transitionDuration);
            })
        }
        this.classList.add('d-none');
        return Promise.resolve();
    }

    async show(){
        this.classList.remove('d-none');

        if(this.isSmooth()){
            return await new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.classList.remove('opacity-0');
                }, 0);

                setTimeout(() => {
                    console.log("Общая функция показа");
                    resolve();
                }, this._transitionDuration);
            })
        }
        return Promise.resolve();
    }
}
