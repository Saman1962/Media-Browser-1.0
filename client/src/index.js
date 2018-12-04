import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";

let history = createBrowserHistory();
ReactDOM.render(
  <Router forceRefresh={true} history={history}>
    <Switch>
      <Route path="/:gallery/" component={App} />
      <Route path="/:gallery/:category/" component={App} />
      <Redirect from="*" to="/gallery" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
console.log("history", history);
registerServiceWorker();
export default history;
