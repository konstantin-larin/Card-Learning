import {openDB} from "idb";

export default async function loadDB(){
    const db = await openDB('learning_materials', 1, {
        upgrade(db, oldVersion, newVersion, transaction, event) {
            db.createObjectStore('subjects', {keyPath: 'id'});
            const topicStore = db.createObjectStore('topics', {keyPath: 'id'});
            topicStore.createIndex('id_subject', 'id_subject');
            const cardsStore = db.createObjectStore('cards', {keyPath: 'id'});
            cardsStore.createIndex('id_topic', 'id_topic');
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
        },

        async getTopicsBySubject(subjectId){
            const allTopics = await db.getAllFromIndex("topics", "id_subject", subjectId);
            return allTopics;
        },

        async putTopic({
                             id = +new Date() + '_topic',
                             name= "Без названия",
                             cardsColor = "inherit",
                             id_subject,

                         }){
            const topic = {id, name, cardsColor, id_subject};
            const topics = db.transaction("topics", 'readwrite').objectStore("topics");
            topics.put(topic);
        },

        async getTopic(id){
            const topics = db.transaction("topics", 'readwrite').objectStore("topics");
            return await topics.get(id);
        },

        async deleteTopic(id){
            const topics = db.transaction("topics", 'readwrite').objectStore("topics");
            return await topics.delete(id);
        }

    }
    return dbAccess;
}
