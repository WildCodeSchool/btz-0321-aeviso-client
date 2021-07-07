import React from 'react';
import { Route } from 'react-router-dom';

import User from './frontTestRoads/user/User';
import Company from './companies/Company';
import ProjectList from './project/ProjectList';
import HomePage from '../views/HomePage';
import Logout from '../components/navigation/Logout';
import SuperAdmin from './home/SuperAdmin';
import ExportRecords from './records/Exporter/ExportRecords';
import ListsCompanies from './companies/ListsCompanies';
import FormResult from './records/Exporter/FormResult';
import Admin from './home/Admin';
import DetailsProjects from './companies/DetailsProjects';
import { useUserFromStore } from '../store/user.slice';
import Collaborators from './users/Collaborators';

function Routes(): JSX.Element {
  const { user } = useUserFromStore();
  if (user?.role === 'ADMIN') {
    return (
      <>
        <Route path="/home" component={HomePage} />
        <Route path="/aeviso" component={Admin} />
        <Route exact path="/clients/:id/collaborateurs" component={Collaborators} />
        <Route path="/logout" component={Logout} />
        <Route />
      </>
    );
  }

  if (user?.role === 'USER') {
    return (
      <>
        <Route path="/home" component={HomePage} />
        <Route path="/aeviso" component={User} />
        <Route path="/logout" component={Logout} />
      </>
    );
  }

  if (user?.role === 'SUPERADMIN') {
    return (
      <>
        <Route path="/home" component={HomePage} />
        <Route path="/aeviso" component={SuperAdmin} />
        <Route exact path="/clients" component={ListsCompanies} />
        <Route exact path="/records/export/companies/:companyId/projects/:projectId" component={FormResult} />
        <Route exact path="/records/export" component={ExportRecords} />
        <Route exact path="/clients/:id" component={Company} />
        <Route exact path="/projects/:id" component={DetailsProjects} />
        <Route exact path="/projects" component={ProjectList} />
        <Route path="/logout" component={Logout} />
      </>
    );
  }

  return <Route exact path="/home" component={HomePage} />;
}

export default Routes;
