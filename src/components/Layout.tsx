import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import Header from "./Header";
import Routes from "./Routes";

function Layout() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  );
}

export default Layout;
