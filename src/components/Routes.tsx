import React from 'react';
import { Route } from 'react-router-dom';
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
    </>
  );
}

export default Routes;
