import { axiosCall } from "./apiCall";

export function loginRequest(api, data = {}, usetoken = true) {
  let method = "post";
  let url = "";
  let config = {};

  switch (api) {
    case "login":
      method = "post";
      url = "login";
      data = { username: data.username, password: data.password };
      usetoken = false;
      break;

    case "verifyToken":
      method = "post";
      url = "login/verifyToken";
      data = { token: data.token };
      usetoken = true;
      break;

    default:
      break;
  }
  return axiosCall(method, url, config, data, usetoken);
}
