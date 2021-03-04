import { GET_RECIPES } from "../constants/index";

const recipeReducer = (recipes = [], action) => {
  switch (action.type) {
    case GET_RECIPES:
      return action.payload;
    default:
      return recipes;
  }
};

export default recipeReducer;
