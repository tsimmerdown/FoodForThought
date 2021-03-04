import { SET_SEARCH } from "../constants/index";

const search = (search = { query: null }, action) => {
  switch (action.type) {
    case SET_SEARCH:
      search.query = action.payload;
      return search;
    default:
      return search;
  }
};

export default search;
