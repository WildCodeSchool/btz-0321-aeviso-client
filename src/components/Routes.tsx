import React from 'react';
import { Route } from 'react-router-dom';
import User from './home/User';
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
import RecordsUser from './user/RecordsUser';
import Collaborators from './users/Collaborators';
<<<<<<< HEAD
import CreateNewUser from './users/CreateUser';
import UpdateUserPanelUser from './user/UpdateUserPanelUser';
=======
import OneCollaborator from './users/OneCollaborator';
>>>>>>> 404b1e03a3a6db2c9dec39a2a2068568c9ed3036

function Routes(): JSX.Element {
  const { user } = useUserFromStore();
  if (user?.role === 'ADMIN') {
    return (
      <>
        <Route path="/home" component={HomePage} />
        <Route path="/aeviso" component={Admin} />
        <Route exact path="/collaborateurs" component={Collaborators} />
        <Route path="/collaborateurs/oneuser/:id" component={OneCollaborator} />
        <Route path="/logout" component={Logout} />
        <Route />
      </>
    );
  }

  if (user?.role === 'USER') {
    return (
      <>
        <Route exact path="/aeviso" component={User} />
        <Route exact path="/projects/:projectId/records" component={RecordsUser} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/modifications" component={UpdateUserPanelUser} />
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
