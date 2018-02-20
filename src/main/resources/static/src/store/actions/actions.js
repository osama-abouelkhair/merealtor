import axios from 'axios';
import qs from 'qs';

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';

const dispatchLogin = (access_token, user) => {

    return {
        type: LOGIN,
        user,
        access_token
    };
};

const dispatchSignup = (user) => {
    return {
        type: SIGNUP,
        user
    }
}

export const login = (email, password) => {
    return dispatch => {
        let data = {
            username: email,
            password: password,
            grant_type: 'password'
        };
        return axios.post('oauth/token', qs.stringify(data),
            {
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                    Authorization: "Basic " + btoa("testjwtclientid:XY7kmzoNzl100")
                }
            }).then(tokenResponse => {
                console.log(tokenResponse);
                return axios.get('/user/userdetails/' + email,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Bearer " + tokenResponse.data.access_token
                        }
                    }).then(userResponse => {
                        console.log(userResponse.data);
                        dispatch(dispatchLogin(tokenResponse.data.access_token, userResponse.data));
                    });
            });
    };
};

export const signup = user => {
    return dispatch => {
        let data = {
            grant_type: 'client_credentials'
        };
        return axios.post('oauth/token', qs.stringify(data),
            {
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                    Authorization: "Basic " + btoa("testjwtclientid:XY7kmzoNzl100")
                }
            }).then(tokenResponse => {
                console.log(tokenResponse);
                return axios.post('/user/signup', user,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenResponse.data.access_token
                    }
                }).then(userResponse => {
                    console.log(userResponse);
                    dispatch(dispatchSignup(userResponse.data));
                });
        });
    };
};
