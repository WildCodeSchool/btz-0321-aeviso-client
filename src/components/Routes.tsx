import React from 'react';
import { Route } from 'react-router-dom';

import User from './User';
import Users from './Users';
import Professions from './professions/Professions';
import ProjectList from './project/ProjectList';
import UniqueProject from './project/UniqueProject';
import Vite from './Vite';

function Routes() {
  return (
    <>
      <Route exact path="/">
        <Vite />
      </Route>
      <Route exact path="/projects" component={ProjectList} />
      <Route path="/projects/:id" component={UniqueProject} />
      <Route exact path="/users" component={Users} />
      <Route path="/users/:id" component={User} />
      <Route path="/professions" component={Professions} />
    </>
  );
}

export default Routes;
