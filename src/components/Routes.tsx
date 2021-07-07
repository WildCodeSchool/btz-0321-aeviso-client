import React from 'react';
import { Route } from 'react-router-dom';
import User from './frontTestRoads/user/User';
import Company from './companies/Company';
import ProjectList from './project/ProjectList';
import HomePage from '../views/HomePage';
import Logout from '../components/navigation/Logout';
import SuperAdmin from './home/SuperAdmin';
import ListsCompanies from './companies/ListsCompanies';
import FormResult from './records/Exporter/FormResult';
import Admin from './home/Admin';
import ExportRecords from './records/Exporter/ExportRecords';
import DetailsProjects from './companies/DetailsProjects';
import { useUserFromStore } from '../store/user.slice';
import Calendar from './records/CreateNew/Calendar';

function Routes(): JSX.Element {
  const { user } = useUserFromStore();
  if (user?.role === 'ADMIN') {
    return (
      <>
        <Route exact path="/aeviso" component={Admin} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/nouveaurapport" component={Calendar} />
        <Route exact path="/records/export" component={ExportRecords} />
      </>
    );
  }

  if (user?.role === 'USER') {
    return (
      <>
        <Route exact path="/aeviso" component={User} />
        <Route exact path="/logout" component={Logout} />
      </>
    );
  }

  if (user?.role === 'SUPERADMIN') {
    return (
      <>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/aeviso" component={SuperAdmin} />
        <Route exact path="/clients" component={ListsCompanies} />
        <Route exact path="/records/export/companies/:companyId/projects/:projectId" component={FormResult} />
        <Route exact path="/records/export" component={ExportRecords} />
        <Route exact path="/clients/:id" component={Company} />
        <Route exact path="/projects/:id" component={DetailsProjects} />
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/logout" component={Logout} />
      </>
    );
  }

  return <Route exact path="/home" component={HomePage} />;
}

export default Routes;
