import {openDB} from "idb";

export default async function loadDB(){
    const db = await openDB('learning_materials', 1, {
        upgrade(db, oldVersion, newVersion, transaction, event) {
            db.createObjectStore('subjects', {keyPath: 'id'});
            db.createObjectStore('thematics', {keyPath: 'id'});
            db.createObjectStore('cards', {keyPath: 'id'});
        },
        blocked(currentVersion, blockedVersion, event) {
            // …
        },
        blocking(currentVersion, blockedVersion, event) {
            // …
        },
        terminated() {
            // …
        },
    });

    const dbAccess = {
    //     абстрактные методы управления бд, этот объект скрывает детали реализации, им могут пользоваться внешние компоненты
    }
    return dbAccess;
}
