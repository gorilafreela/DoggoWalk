import axios from "axios";
import APIConstants from "../constants/APIConstants";
import LocalStorageService from "./LocalStorageService";

export default class SolicitationService {

  static book(to) {
    return axios({
      url: APIConstants.baseURL + "solicitation/book",
      method: "POST",
      headers: {
        Authorization: LocalStorageService.getToken(),
      },
      data: {
        to
      },
    });
  }

  static getAllAwaiting() {
    return axios({
      url: APIConstants.baseURL + "solicitation/get-awaiting",
      method: "GET",
      headers: {
        Authorization: LocalStorageService.getToken(),
      }
    });
  }

  static getAllProgress() {
    return axios({
      url: APIConstants.baseURL + "solicitation/get-all-progress",
      method: "GET",
      headers: {
        Authorization: LocalStorageService.getToken(),
      }
    });
  }

  static cancel(to) {
    return axios({
      url: APIConstants.baseURL + "solicitation/cancel",
      method: "POST",
      headers: {
        Authorization: LocalStorageService.getToken(),
      },
      data: {
        to
      },
    });
  }
 
  static checkStatus(id) {
    return axios({
      url: APIConstants.baseURL + "solicitation/get-book/" +id,
      method: "GET",
      headers: {
        Authorization: LocalStorageService.getToken(),
      }
    });
  }

}
