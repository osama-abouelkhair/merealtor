
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    user: {
        email:'',
        fullName:''
    }
};

const reducer = (state = initialState, action) => {
    if(action.type === actionTypes.LOGIN) {
        console.log("[reducer] ", "LOGIN");
        console.log(state.email);
        console.log(state.password);    
        return updateObject(state, {
            user: action.user,
            access_token: action.access_token
        });          
    } else if (action.type === actionTypes.SIGNUP) {
        return updateObject(state, {
            user: action.user
        });
    }
    return state;
};

export default reducer;