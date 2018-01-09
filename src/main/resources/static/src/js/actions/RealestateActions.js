import dispatcher from "../dispatcher";

export function addRealestate(body){
        var self = this;
        $.ajax({
        url: 'http://localhost:8089/realestate',
        data: {},
        context: this,
        dataType: 'json',
        type: 'POST',
        //headers: {
         //   "Authorization": "Bearer " + token 
          //}
        }).done( (data) => {
            dispatcher.dispatch({
                type: "CREATE_REALESTATE",
                body: {
                    title: data[0].title,
                    dateTime: data[0].dateTime
                 },
            });
        });
}

export function getAllRealestates(token){
    $.ajax({
        url: 'http://localhost:8089/realestate',
        //data: {},
        context: this,
        dataType: 'json',
        type: 'GET',
        //headers: {
        //    "Authorization": "Bearer " + token 
         // }
        }).done( (data) => {
            dispatcher.dispatch({
                type: "GET_ALL_REALESTATES",
                body: data,
            });
        });

}