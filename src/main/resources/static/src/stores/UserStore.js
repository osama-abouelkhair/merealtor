import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
    constructor(){
        super();
        this.user = {
            fullName: "",
            email: "",
            access_token: ""
        } ;

        this.register = {
            status: false
        }
    };

    getToken() {
        const { token } = this.user;
        return this.user.access_token;
    };

    getUser(){
        console.log("user " + this.user.email);
        return this.user;
        
    };

    login(body) {
        //const date = new Date().toDateString();
        //const { name } = body;
        //const { email } = body;
        const { access_token } = body;
        this.user.access_token = access_token;
            
        
        console.log("login " + body);
        this.emit("change");
    };

    userDetails(body, access_token){
        const { fullName } = body;
        const { email } = body;
        this.user = {
            fullName,
            email,
            access_token
        };
        console.log("user details stores " + body);
        this.emit("change");
    }

    signupStatus(){
        if(this.user.name != undefined || this.user.name != ""){
            return true;
        }
        return false;
    };

    signup(body, access_token) {
        console.log("signup " + body);
        //this.register.status = status;
        const { fullName } = body;
        const { email } = body;
        this.user = {
            fullName,
            email,
            access_token
        };
        this.emit("change");
    };

    handleActions(action) {
        console.log("user login action Recieved ", action);
        switch(action.type) {
            case "LOGIN": {
                this.login(action.body);
                break;
            }
            case "SIGNUP": {
                this.signup(action.body, action.access_token);
                break;
            }
            case "USER_DETAILS": {
                this.userDetails(action.body, action.access_token);
                break;
            }
            case "USER_EMAIL": {
                this.user.email = action.body;
            }
        }
        console.log("user login action Recieved ", this.user.email);
        
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;