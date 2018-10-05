import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root from "./Root";
import App from "./components/App";
import Details from "./components/Details";
import "semantic-ui-css/semantic.min.css";
import "./normalize.css";

ReactDOM.render(
  <Root>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/songs" component={Details} />
      </Switch>
    </Router>
  </Root>,
  document.querySelector("#root")
);
