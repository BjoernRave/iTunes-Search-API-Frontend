import { shallow } from "enzyme";
import React from "react";
import App from "../App";
import SearchBar from "../SearchBar";
import { Header } from "semantic-ui-react";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it("shows a search box", () => {
  expect(wrapped.find(SearchBar).length).toEqual(1);
});

it("shows a header", () => {
  expect(wrapped.find(Header).length).toEqual(1);
});
