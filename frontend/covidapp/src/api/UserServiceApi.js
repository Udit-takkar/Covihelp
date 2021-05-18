import axios from "axios";
import jwt_decode from "jwt-decode";

// for user JWT storage
export const TOKEN_SESSION_ATTRIBUTE_NAME = "token";
export const TOKEN_HEADER_LENGTH = 7;

class UserServiceApi {
  getUserToken() {
    let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    if (token === null) return "";
    return token.slice(TOKEN_HEADER_LENGTH);
  }
}

export default new UserServiceApi();
