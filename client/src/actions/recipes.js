import * as api from "../api/index";
import { GET_RECIPES } from "../constants/index";

export const getRecipes = (searchData) => async (dispatch) => {
  try {
    const { data } = await api.getAllRecipes(searchData);
    dispatch({ type: GET_RECIPES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
