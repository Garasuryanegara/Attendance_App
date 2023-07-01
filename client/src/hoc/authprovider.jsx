import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import axios from "axios";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUser() {
      await axios
        .get("http://localhost:2001/user/v3", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(token);
          console.log(res.data);
          if (token) {
            dispatch({ type: auth_types.login, payload: res.data });
          }
        });
    }

    fetchUser();
  }, []);
  return children;
}
