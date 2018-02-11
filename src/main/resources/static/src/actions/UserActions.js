import dispatcher from "../dispatcher";
import * as RealestateAction from "../actions/RealestateActions";
import BASE_URL from "../constants";

export function login(user){
        var self = this;
        /* dispatcher.dispatch({
            type: "USER_EMAIL",
            body: user.email
            } 
        );*/
        var url = 'oauth/token';
        $.ajax({
        //url: 'http://localhost:8080/users/login',
        url: url,
        data: {
            "username": user.email,
            "password": user.password,
            "grant_type": "password"
        },      
        context: this,
        dataType: 'json',
        type: 'POST',
        crossDomain : true,
        headers: {
            //"Content-Type": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",            
            "Authorization": "Basic " + btoa("testjwtclientid:XY7kmzoNzl100"),
            //'Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));
            //"Access-Control-Allow-Origin": "http://localhost:8089",
            //headers.append('Access-Control-Allow-Credentials', 'true'
          }
        }).done( (data) => {
           /*  dispatcher.dispatch({
                type: "LOGIN",
                body: data
                }
            ); */
            const { access_token } = data;            
            getUserDetails(user.email, access_token);
            //RealEstateAction.getAllRealEstates(data.access_token)        
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log("errorThrown ", textStatus);
            
        });

}

export function getUserDetails(email, access_token){
    var self = this;
    var url = 'user/userdetails/' + email;
    var req = {
        url: url,
    type: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",        
        "Authorization": "Bearer " + access_token,
      }
    };
    $.ajax(req).done( (data) => {
        dispatcher.dispatch({
            type: "USER_DETAILS",
            body: data,
            access_token: access_token
            }
        );
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log("errorThrown ", textStatus);
    });

}

export function signup(user){
    var self = this;
    var url = 'oauth/token?grant_type=client_credentials';
    $.ajax({
    url: url,    
    type: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",            
        "Authorization": "Basic " + btoa("testjwtclientid:XY7kmzoNzl100"),
      }
    }).done( (data) => {
        const { access_token } = data;
        signupWithtoken(user, access_token);
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log("errorThrown ", errorThrown);
    });
    }

function signupWithtoken(user, token){
    
    const userReq =  JSON.stringify({
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            //grant_type: "client_credentials"
            });
            var url =  'user/signup';
            var requestObj={
                url:url,
                data: userReq,
                type: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                  },
                };
    $.ajax(requestObj).done( (data) => {
        dispatcher.dispatch({
            type: "SIGNUP",
            body: data,
            access_token: token
        });
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log("errorThrown ", errorThrown);        
        dispatcher.dispatch({
            type: "SIGNUP",
            body: false
        });
    });
}