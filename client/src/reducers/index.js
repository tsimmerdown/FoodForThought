import { combineReducers } from "redux";

import authReducer from "./auth";
import recipeReducer from "./recipe";
import search from "./search";

export const reducers = combineReducers({ authReducer, recipeReducer, search });
