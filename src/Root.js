import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxPromise from "redux-promise";
import reducers from "./reducers";

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(reduxPromise),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return <Provider store={store}>{children}</Provider>;
};
