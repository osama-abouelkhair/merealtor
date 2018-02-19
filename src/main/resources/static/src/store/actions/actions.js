import axios from 'axios';
import qs from 'qs';

export const LOGIN = 'LOGIN';
/*
var authOptions = {
  method: 'POST',
  url: 'http://10.254.147.184:7777/auth/oauth/token',
  data: qs.stringify(data),
  headers: {
      'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
      'Content-Type': 'application/x-www-form-urlencoded'
  },
  json: true
};
return dispatch => {
  return axios(authOptions)
  .then(function(response){
    console.log(response.data);
    console.log(response.status);
  })
  .catch(function(error){
    console.log(error);
  });
  */
export const dispatchLogin = (access_token, user) => {

    return {
        type: LOGIN,
        user,
        access_token
    };
};
export const login = (email, password) => {
    return dispatch => {
        let data = {
            username: email,
            password: password,
            grant_type: 'password'
        }
        return axios.post('oauth/token', qs.stringify(data),
            {headers:{
                'Content-Type': "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa("testjwtclientid:XY7kmzoNzl100")
            }
            }).then(tokenResponse => {
                console.log(tokenResponse);
                return axios.get('/user/userdetails/' + email,
                   {headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + tokenResponse.data.access_token
                    }}).then(userResponse => {
                        console.log(userResponse.data);
                        dispatch(dispatchLogin(tokenResponse.data.access_token, userResponse.data));
                    }
                    );

            });
        ;
    };
};

export const login2 = (email, password) => {
    return dispatch => {
        return () => {
            let data = {
                username: email,
                password: password,
                grant_type: 'password'
            };
            let headers = {
                'Content-Type': "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa("testjwtclientid:XY7kmzoNzl100")
            };
            axios.post('oauth/token', data, headers)
                .then(response => {
                    console.log(response);
                    return () => {
                        let { access_token } = response;
                        let headers = {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Bearer " + access_token
                        };
                        axios.get('/user/userdetails/' + email, headers)
                            .then(user => {
                                console.log(user);
                                dispatch(dispatchLogin(access_token, user));
                            }
                            );
                    };
                });
        };
    };
};

// let getOuthReq = {
//     method: 'POST',
//     url: 'ouath/token',
//     data: {
//         username: email,
//         password: password,
//         grant_type: 'password'
//     },
//     headers: {
//         'Content-Type': "application/x-www-form-urlencoded",
//         Authorization: "Basic " + btoa("testjwtclientid:XY7kmzoNzl100")
//     },
//     json: true,
// };

// let userDetailsReq = {
//     method: 'GET',
//     url: '/user/userdetails/' + email,
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": "Bearer " + access_token,
//     }

// };

const getOuth = (dispatch, email, password) => {



    axios.post('ouath/token', data)
    // var url = '/oauth/token';
    // $.ajax({
    //     url: url,
    //     data: {
    //         "username": email,
    //         "password": password,
    //         "grant_type": "client_credentials"
    //     },
    //     context: this,
    //     dataType: 'json',
    //     type: 'POST',
    //     crossDomain: true,
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "Authorization": "Basic " + btoa("testjwtclientid:XY7kmzoNzl100"),
    //     }
    // }).done((data) => {
    //     console.log(data);
    //     const { access_token } = data;
    //     getUserDetails(dispatch, email, access_token);
    // }).fail(function (jqXHR, textStatus, errorThrown) {
    //     console.log("errorThrown ", errorThrown);

    // });
}

const getUserDetails = (dispatch, email, access_token) => {
    var url = '/user/userdetails/' + email;
    var req = {
        url: url,
        type: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + access_token,
        }
    };
    $.ajax(req)
        .done((data) => {
            console.log(data);
            dispatch(dispatchLogin(access_token, data));
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("errorThrown ", textStatus);
        });

}