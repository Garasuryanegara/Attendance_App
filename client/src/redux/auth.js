import { auth_types } from "../redux/types";

const init = {
  email: "",
  full_name: "",
  username: "",
  Company_id: "",
  address: "",
};

const userReducer = (state = init, action) => {
  if (action.type == auth_types.login) {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type == auth_types.logout) {
    return init;
  }
  return state;
};

export default userReducer;
