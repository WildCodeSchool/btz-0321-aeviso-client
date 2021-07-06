import React from 'react';
import { Route } from 'react-router-dom';
import Users from '../components/frontTestRoads/user/Users';
import User from './frontTestRoads/user/User';
import Company from './company/Company';
import Professions from './professions/Professions';
import ProjectList from './project/ProjectList';
import HomePage from '../views/HomePage';
import Logout from '../components/navigation/Logout';
import SuperAdmin from './home/SuperAdmin';
import ExportRecords from './records/Exporter/ExportRecords';
import ListsCompanies from './companies/ListsCompanies';
import FormResult from './records/Exporter/FormResult';
import DetailsProjects from './company/DetailsProjects';

function Routes(): JSX.Element {
  return (
    <>
      <Route exact path="/aeviso" component={SuperAdmin} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/companies" component={ListsCompanies} />
      <Route exact path="/companies/:id" component={Company} />
      <Route exact path="/projects/:id" component={DetailsProjects} />
      <Route exact path="/projects" component={ProjectList} />
      <Route exact path="/users" component={Users} />
      <Route path="/users/:id" component={User} />
      <Route path="/professions" component={Professions} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/records/export/companies/:companyId/projects/:projectId" component={FormResult} />
      <Route exact path="/records/export" component={ExportRecords} />
    </>
  );
}

export default Routes;
