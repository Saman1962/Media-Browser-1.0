import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";

ReactDOM.render(
  <Router>
    <div>
      <Redirect from="/gallery/" to="/gallery" />
      <Route
        exact
        path="/gallery"
        render={props => <App key={props.location.key} {...props} />}
      />
      <Route
        exact
        path="/gallery/:category"
        render={props => <App {...props} />}
      />
    </div>
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
