import React from 'react';
import { Route } from 'react-router-dom';
import ProjectList from './project/projectListe';
import UniqueProject from './project/uniqueProject';
import Vite from './Vite';

function Routes() {
  return (
    <>
      <Route exact path="/">
        <Vite />
      </Route>
      <Route exact path="/projects" component={ProjectList} />
      <Route path="/projects/:id" component={UniqueProject} />
    </>
  );
}

export default Routes;
