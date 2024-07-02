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
        async getSubjects(){
            const subjects = db.transaction("subjects", 'readwrite').objectStore("subjects");
            const allSubjects =  await subjects.getAll();
            return allSubjects;
        },

        async putSubject({
            id = +new Date() + '_subject',
            name= "Без названия",
            bgColor = "inherit",

                         }){
            const subject = {id, name, bgColor};
            const subjects = db.transaction("subjects", 'readwrite').objectStore("subjects");
            subjects.put(subject);
        },

        async getSubject(id){
            const subjects = db.transaction("subjects", 'readwrite').objectStore("subjects");
            return await subjects.get(id);
        },

        async deleteSubject(id){
            const subjects = db.transaction("subjects", 'readwrite').objectStore("subjects");
            return await subjects.delete(id);
        }

    //     абстрактные методы управления бд, этот объект скрывает детали реализации, им могут пользоваться внешние компоненты
    }
    return dbAccess;
}
