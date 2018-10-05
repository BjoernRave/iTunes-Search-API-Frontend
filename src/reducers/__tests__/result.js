import { FETCH_RESULTS } from "../../actions/types";
import resultsReducer from "../results";

it("handles actions of type FETCH_RESULTS", () => {
  const action = {
    type: FETCH_RESULTS,
    payload: { testkey: "testdata" }
  };

  const newState = resultsReducer([], action);

  expect(newState).toEqual({ testkey: "testdata" });
});

it("handles action with unknown type", () => {
  const newState = resultsReducer([], { type: "LKAFDSJLKAFD" });

  expect(newState).toEqual([]);
});
