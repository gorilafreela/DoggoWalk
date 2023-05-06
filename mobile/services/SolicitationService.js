import axios from "axios";
import StorageService from "./StorageService";

export default class SolicitationService {
  static async getAll(email, password) {
    const token = await StorageService.getData('token');
    return axios({
      url: "http://192.168.3.33:5000/solicitation/get-all",
      method: "POST",
      data: {
        email,
        password,
      },
      headers: {
        Authorization: token,
      }
    });
  }
}
