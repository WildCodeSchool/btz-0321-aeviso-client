import React from 'react';
import { Route } from 'react-router-dom';
import ProjectList from './project/ProjectListe';
import UniqueProject from './project/UniqueProject';
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
      <Route exact path="/projects" component={ProjectList} />
      <Route path="/projects/:id" component={UniqueProject} />
    </>
  );
}

export default Routes;
