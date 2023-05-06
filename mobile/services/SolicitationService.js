import axios from "axios";
import { getData } from "./StorageService";

export default class SolicitationService {
  static async getAll() {
    const token = await getData("token");
    return axios({
      url: "http://192.168.3.33:5000/solicitation/get-all",
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
  }

  static async reply(id,action) {
    const token = await getData("token");
    return axios({
      url: "http://192.168.3.33:5000/solicitation/reply",
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
}
