import { fetchResults } from "../index";
import { FETCH_RESULTS } from "../types";

it("has the correct type", () => {
  const action = fetchResults("test");

  expect(action.type).toEqual(FETCH_RESULTS);
});
