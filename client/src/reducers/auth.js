import { AUTH, LOGOUT, ERROR } from "../constants/index";

const authReducer = (state = { authData: null, error: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload, error: false };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null, error: false };
    case ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default authReducer;
