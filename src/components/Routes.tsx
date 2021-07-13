import React from 'react';
import { Route } from 'react-router-dom';
import User from './home/User';
import Company from './companies/Company';
import ProjectList from './project/ProjectList';
import HomePage from '../views/HomePage';
import Logout from '../components/navigation/Logout';
import ListsCompanies from './companies/ListsCompanies';
import FormResult from './records/Exporter/FormResult';
import Admin from './home/Admin';
import ExportRecords from './records/Exporter/ExportRecords';
import DetailsProjects from './companies/DetailsProjects';
import { useUserFromStore } from '../store/user.slice';
import Calendar from './records/CreateNew/Calendar';
import RecordsUser from './user/RecordsUser';
import Collaborators from './users/Collaborators';
import OneCollaborator from './users/OneCollaborator';
import CreateUpdateCompany from './companies/CreateUpdateCompany';

function Routes(): JSX.Element {
  const { user } = useUserFromStore();
  if (user?.role === 'ADMIN') {
    return (
      <>
        <Route exact path="/nouveaurapport" component={Calendar} />
        <Route exact path="/records/export" component={ExportRecords} />
        <Route path="/home" component={HomePage} />
        <Route path="/aeviso" component={Admin} />
        <Route exact path="/collaborateurs" component={Collaborators} />
        <Route path="/collaborateurs/oneuser/:id" component={OneCollaborator} />
        <Route exact path="/records/export/companies/:companyId/projects/:projectId" component={FormResult} />
        <Route path="/logout" component={Logout} />
        <Route />
      </>
    );
  }

  if (user?.role === 'USER') {
    return (
      <>
        <Route path="/home" component={HomePage} />
        <Route exact path="/aeviso" component={User} />
        <Route exact path="/projects/:projectId/records" component={RecordsUser} />
        <Route exact path="/logout" component={Logout} />
      </>
    );
  }

  if (user?.role === 'SUPERADMIN') {
    return (
      <>
        <Route path="/home" component={HomePage} />
        <Route exact path="/aeviso" component={ListsCompanies} />
        <Route exact path="/createclient" component={CreateUpdateCompany} />
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
