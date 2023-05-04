import axios from "axios";
import APIConstants from "../constants/APIConstants";
import LocalStorageService from "./LocalStorageService";

export default class UserService {
  static signup(email,password,fullname,role) {
    return axios({
      url: APIConstants.baseURL + "user/register",
      method: "POST",
      data: {
        email: email,
        password: password,
        fullname: fullname,
        role: role,
      },
    });
  }

  static login(email, password) {
    return axios({
      url: APIConstants.baseURL + "user/login",
      method: "POST",
      data: {
        email,
        password,
      },
    });
  }

  static getDetails() {
    return axios({
      url: APIConstants.baseURL + "user/details",
      method: "GET",
      headers: {
        Authorization: LocalStorageService.getToken(),
      },
    });
  }
}
