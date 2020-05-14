import { axiosCall } from "../apiCall";

export function adminRequest(api, data = {}, usetoken = true) {
  let method = "post";
  let url = "";
  let config = {};

  switch (api) {
    //get all admins
    case "retrieveAll":
      method = "post";
      url = "retrieve";
      data = {};
      usetoken = true;
      break;

    //get admin by id
    case "retrieveByID":
      method = "post";
      url = "retrieve/" + data._id;
      data = { id: data._id };
      usetoken = true;
      break;

    default:
      break;
  }

  return axiosCall(method, url, config, data, usetoken);
}
