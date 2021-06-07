import React from 'react';
import { Route } from 'react-router-dom';
import Projects from './project/projects';
import User from './User';
import Users from './Users';
import Vite from './Vite';

function Routes() {
  return (
    <>
      <Route exact path="/">
        <Vite />
      </Route>
      <Route path="/users" component={Users} />
      <Route path="/user/:id" component={User} />
      <Route path="/project" component={Projects} />
    </>
  );
}

export default Routes;
