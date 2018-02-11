import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class CategoryStore extends EventEmitter {
    constructor(){
        super();
        this.categories = [];
    }

    addCategory(body) {
        //const date = new Date().toDateString();
        const { title } = body;
        const { dateTime } = body;
        this.categories.push({
            title,
            dateTime,
        })

        this.emit("change");
    }

    handleAllCategories(body){

        this.categories = body;
        this.emit("change");
    }

    getAll(){
        return this.categories;
    }

    handleActions(action) {
        console.log("Category Store Recieved ", action);
        switch(action.type) {
            case "CREATE_CATEGORY": {
                this.addCategory(action.body);
                break;
            } 
            case "GET_ALL_CATEGORIES":{
                console.log("get all " + action.body)
                this.handleAllCategories(action.body)
                break;
            } 
        }
    }
}

const categoryStore = new CategoryStore;
dispatcher.register(categoryStore.handleActions.bind(categoryStore));
window.dispatcher = dispatcher;
export default CategoryStore;