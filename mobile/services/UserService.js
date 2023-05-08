import axios from "axios";
import APIconstants from "../constants/APIconstants";

export default class UserService {
  static login(email, password) {
    return axios({
      url: `${APIconstants.baseURL}/user/login`,
      method: "POST",
      data: {
        email,
        password,
      },
    });
  }


}
