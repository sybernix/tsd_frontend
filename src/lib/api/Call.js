import axios from "axios";
import { AppConstent } from "./../global/AppConstent";

class Call {

    static Request(type, token, data) {
        let method = "post";
        let url = "";
        let config = {};
        if(token != null) {
            config =  { Authorization: 'bearer ' + token, Content: "application/json"}            
        }
        if(data == null) {
            data = {};
        }

        switch (type) {
            case "login" : 
                url = AppConstent.LOGIN_API;
                data =  { userID: data.username, password: data.password }; 
                break;
            case "validate" : 
                url = AppConstent.VALIDATE_API;
                break;
            default: break;
        }

        return axios({
            method: method,
            url: url,
            headers : config,
            data: data
          }).then(function(response){
              return response; 
          }).catch(function (error) { 
              throw Error(error)
          });  
    }

}

export default Call;
