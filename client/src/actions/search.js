import * as api from "../api/index";
import { SET_SEARCH } from "../constants/index";

export const setSearch = (query) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH, payload: query });
  } catch (error) {
    console.log(error);
  }
};
