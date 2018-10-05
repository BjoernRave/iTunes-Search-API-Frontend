import { FETCH_RESULTS } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_RESULTS:
      return action.payload;

    default:
      return state;
  }
};
