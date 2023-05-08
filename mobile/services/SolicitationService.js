import axios from "axios";
import { getData } from "./StorageService";
import APIconstants from "../constants/APIconstants";

export default class SolicitationService {
  static async getAll() {
    const token = await getData("token");
    return axios({
      url: `${APIconstants.baseURL}/solicitation/get-all`,
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
  }

  static async reply(id,action) {
    const token = await getData("token");
    return axios({
      url: `${APIconstants.baseURL}/solicitation/reply`,
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        id,
        action
      },
    });
  }


  static async checkStatus(id) {
    const token = await getData("token");
    return axios({
      url: `${APIconstants.baseURL}/solicitation/get-book/` +id,
      method: "GET",
      headers: {
        Authorization: token,
      }
    });
  }
}
