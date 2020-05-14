import axios from "axios";
import { getJWT } from "../global/helpers";
import { Config } from "../global/Config";

export function axiosCall(method, url, config, data, usetoken) {
  if (usetoken) {
    let JWT = getJWT();
    if (JWT.token != null) {
      config["Authorization"] = "bearer " + JWT.token;
    }
  }

  url = Config.BaseAddress + url;

  console.log(url);
  return axios({
    method: method,
    url: url,
    headers: config,
    data: data,
  });
}
