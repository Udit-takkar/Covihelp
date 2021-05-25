import axios from "axios";
import jwt_decode from "jwt-decode";

// for user JWT storage
export const TOKEN_SESSION_ATTRIBUTE_NAME = "token";
export const TOKEN_HEADER_LENGTH = 7;
const userUrl = "http://localhost:8000/api/users/";
class UserServiceApi {
  getUserToken() {
    let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    if (token === null) return "";
    return token.slice(TOKEN_HEADER_LENGTH);
  }
  isUserLoggedIn() {
    let user = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return false;
    }
    return true;
  }

  async getUserById(id) {
    try {
      const res = await axios.get(`${userUrl}${id}`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }
}

export default new UserServiceApi();
