import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";

ReactDOM.render(
  <Router forceRefresh={true}>
    <div>
      <Route path="/:gallery/" component={App} />
      <Route path="/:gallery/:category" component={App} />
      <Redirect from="*" to="/gallery/" />
    </div>
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
