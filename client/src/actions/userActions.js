import { AUTH, ERROR, LOGOUT } from "../constants";
import * as api from "../api/index";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });
    history.push("/home");
  } catch (error) {
    dispatch({ type: ERROR });
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, payload: data });
    history.push("/home");
  } catch (error) {
    console.log(error);
  }
};

export const googleSignIn = (result, token) => async (dispatch) => {
  try {
    dispatch({ type: AUTH, payload: { result, token } });
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (history) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
