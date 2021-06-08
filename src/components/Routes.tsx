import React from 'react';
import { Route } from 'react-router-dom';
import Vite from './Vite';
import Users from './Users';
import User from './User';
import Companies from './company/Companies';
import Company from './company/Company';

function Routes() {
  return (
    <>
      <Route exact path="/" component={Vite} />
      <Route path="/users" component={Users} />
      <Route path="/user/:id" component={User} />
      <Route path="/companies" component={Companies} />
      <Route path="/companies/:id" component={Company} />
    </>
  );
}

export default Routes;
