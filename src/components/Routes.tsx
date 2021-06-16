import React from 'react';
import { Route } from 'react-router-dom';
import Vite from './Vite';
import Users from './Users';
import User from './User';
import Companies from './company/Companies';
import Company from './company/Company';
import Professions from './professions/Professions';
import ProjectList from './project/ProjectList';
import UniqueProject from './project/UniqueProject';
import Records from './records/Records';
import OneRecord from './records/OneRecord';

function Routes() {
  return (
    <>
      <Route exact path="/">
        <Vite />
      </Route>
      <Route exact path="/companies" component={Companies} />
      <Route path="/companies/:id" component={Company} />
      <Route exact path="/projects" component={ProjectList} />
      <Route path="/projects/:id" component={UniqueProject} />
      <Route exact path="/users" component={Users} />
      <Route path="/users/:id" component={User} />
      <Route path="/professions" component={Professions} />
      <Route exact path="/records" component={Records} />
      <Route path="/records/:id" component={OneRecord} />
    </>
  );
}

export default Routes;
