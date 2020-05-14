import { axiosCall } from "../apiCall";

import { teacherRequest } from "./TeacherApi";
import { parentRequest } from "./ParentApi";
import { studentRequest } from "./StudentApi";
import { adminRequest } from "./AdminApi";

export function contactRequest(api, data = {}, usetoken = true) {
  let method = "post";
  let url = "";
  let config = {};

  switch (api) {
    //get all contacts
    case "retrieve":
      method = "post";
      url = "m/" + data.userType + "/retrieve";
      data = {};
      usetoken = true;
      break;

    //add
    case "add":
      data._id = undefined;
      method = "post";
      url = "m/" + data.userType + "/add";
      data.userType = undefined;
      data = data;
      usetoken = true;
      break;

    //update
    case "update":
      method = "post";
      url = "m/" + data.userType + "/update/" + data._id;
      data.userType = undefined;
      data = data;
      usetoken = true;
      break;

    //get by id
    case "retrieveByID":
      method = "post";
      url = "m/" + data.userType + "/retrieve/" + data._id;
      data.userType = undefined;
      data = { id: data._id };
      usetoken = true;
      break;

    //search
    case "find":
      method = "post";
      url = "m/" + data.userType + "/find";
      data = { name: data.name, value: data.value };
      usetoken = true;
      break;

    default:
      break;
  }

  return axiosCall(method, url, config, data, usetoken);
}
