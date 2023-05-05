import axios from "axios";

export default class UserService {
  static login(email, password) {
    return axios({
      url: "http://192.168.3.33:5000/user/login",
      method: "POST",
      data: {
        email,
        password,
      },
    });
  }

  static today() {
    return axios({
        url: "http://192.168.3.33:5000/user/today",
        method: "GET",
        
      });
  }
}
