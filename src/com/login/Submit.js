import React from "react";
import axios from "axios";
import { SubmissionError } from "redux-form";
import { AppConstent } from "../../lib/AppConstent";
import Cookies from 'js-cookie'

export default function Submit(values) {   
  return axios({
      method: 'post',
      url: AppConstent.LoginAPI,
      data: {
        userID: values.username,
        password: values.password
      }
    })
    .then(function (response) {
      let token = response.data.token;
      let exp = values.remember? 365 : 1;
      Cookies.set('infinity', token, { expires: exp });
      window.location.reload();     
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.response.data.message });
    });  
}