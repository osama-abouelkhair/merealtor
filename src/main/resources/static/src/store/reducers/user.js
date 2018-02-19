
import * as actionTypes from '../actions/actions';

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
        return {
            ...state,
            user: action.user,
            access_token: action.access_token,
        }
    }
    return state;
};

export default reducer;