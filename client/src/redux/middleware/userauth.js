import axios from "axios";
import { auth_types } from "../types";

export function userLogin(account) {
  return async function (dispatch) {
    try {
      const token = await axios
        .post("http://localhost:2001/user/v2", account)
        .then((res) => res.data.token.token);
      console.log(token);
      const userData = await axios
        .get("http://localhost:2001/user/v3", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data);
      if (userData)
        dispatch({
          type: auth_types.login,
          payload: userData,
        });
      localStorage.setItem("token", token);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
}
