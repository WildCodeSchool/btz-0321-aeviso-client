import React from "react";
import { Route } from "react-router-dom";
import Professions from "../professions/Professions";
import User from "./User";
import Users from "./Users";
import Vite from "./Vite";

function Routes() {
  return (
    <>
      <Route exact path="/">
        <Vite />
      </Route>
      <Route path="/users" component={Users} />
      <Route path="/user/:id" component={User} />
      <Route path="/Professions">
        <Professions />
        </Route>
    </>
  );
}

export default Routes;
