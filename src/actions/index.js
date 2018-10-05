import { FETCH_RESULTS } from "./types";
import axios from "axios";

export function fetchResults(query) {
  query = query.replace(/ /g, "+");
  const results = axios
    .get(`https://itunes.apple.com/search?media=music&term=${query}`)
    .then(data => data.data.results);

  return {
    type: FETCH_RESULTS,
    payload: results
  };
}
