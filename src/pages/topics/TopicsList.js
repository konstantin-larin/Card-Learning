import TopicItem from "./TopicItem";
export default class TopicsList extends HTMLElement{
    static tag = 'topics-list';
    constructor() {
        customElements.define(TopicItem.tag, TopicItem);
        super();
        this.isGenerated = false;
    }

    connectedCallback(){
        this.items = document.getElementsByTagName(TopicItem.tag);
        this.classList.add('topics-list', 'list');
    }
    generate(list = []){
        if(this.isGenerated) return;
        Array.from(this.items).forEach(item => {
            item.remove();
        });
        if(list.length === 0){
            this.querySelector('.topics-list-empty').classList.remove('d-none')
        } else{
            this.querySelector('.topics-list-empty').classList.add('d-none');
            for(let item of list){
                const topic = document.createElement(TopicItem.tag);
                this.append(topic);
                topic.setTopicModel({...item, save: false});
            }
        }
        this.isGenerated = true;
    }

    async refreshByCurrentTopic(){
        let topicItem = document.getElementById(window.currentTopic.id);

        // если нет добавляем
        if (!topicItem) {
            topicItem = document.createElement(TopicItem.tag);
            this.append(topicItem);
        }

        await topicItem.setTopicModel({...structuredClone(window.currentTopic), save: true});

        if(this.items.length > 0) {
            this.querySelector('.topics-list-empty').classList.add('d-none');
        }
    }
    removeItem(id){
        document.getElementById(id).remove();
        if(this.items.length === 0){
            this.querySelector('.topics-list-empty').classList.remove('d-none')
        }
    }
}
