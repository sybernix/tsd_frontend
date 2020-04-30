import axios from "axios";
import { ApiBase, ApiClassPath }  from "../global/apiPath";
import Variables from "../../lib/global/Variables";

class Call {

    static Request(type, token, data, className = "") {
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
                url = ApiBase.LOGIN_API;
                data =  { id: data.username, password: data.password }; 
                break;
            case "validate" : 
                url = ApiBase.VALIDATE_API;
                break;
            case "retrieve" : 
                url = new ApiClassPath(className).RETRIEVE_API + data.id;
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
