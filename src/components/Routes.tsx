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
import CreateUpdateProjects from './project/CreateUpdateProjects';
import Settings from './settings/Settings';
import CreateUpdateCompany from './companies/CreateUpdateCompany';
import ProjectsUser from './user/ProjectsUser';
import AllRecordsUser from './user/AllRecordsUser';
import JobsList from './jobs/JobsList';

function Routes(): JSX.Element {
  const { user } = useUserFromStore();
  if (user?.role === 'ADMIN') {
    return (
      <>
        <Route path="/connexion" component={HomePage} />
        <Route exact path="/" component={Admin} />
        <Route exact path="/saisie" component={Calendar} />
        <Route exact path="/rapport/exporter" component={ExportRecords} />
        <Route exact path="/projets" component={ProjectList} />
        <Route exact path="/projets/:id" component={DetailsProjects} />
        <Route exact path="/nouveau/projet" component={CreateUpdateProjects} />
        <Route exact path="/modifier/projets/:id" component={CreateUpdateProjects} />
        <Route exact path="/collaborateurs" component={Collaborators} />
        <Route path="/collaborateurs/:id" component={User} />
        <Route exact path="/exporter/:companyId/projets/:projectId" component={FormResult} />
        <Route exact path="/reglages" component={Settings} />
        <Route path="/deconnexion" component={Logout} />
      </>
    );
  }

  if (user?.role === 'USER') {
    return (
      <>
        <Route path="/connexion" component={HomePage} />
        <Route exact path="/" component={User} />
        <Route exact path="/projets/:id" component={DetailsProjects} />
        <Route exact path="/projets/:projectId/rapports" component={RecordsUser} />
        <Route exact path="/deconnexion" component={Logout} />
        <Route exact path="/mesprojets" component={ProjectsUser} />
        <Route exact path="/tousmesrapports" component={AllRecordsUser} />
        <Route exact path="/saisie" component={Calendar} />
        <Route exact path="/reglages" component={Settings} />
        <Route path="/deconnexion" component={Logout} />
      </>
    );
  }

  if (user?.role === 'SUPERADMIN') {
    return (
      <>
        <Route path="/connexion" component={HomePage} />
        <Route exact path="/" component={ListsCompanies} />
        <Route exact path="/client/nouveau" component={CreateUpdateCompany} />
        <Route exact path="/nouveau/projet/:companyId" component={CreateUpdateProjects} />
        <Route exact path="/exporter/:companyId/projets/:projectId" component={FormResult} />
        <Route exact path="/rapport/exporter" component={ExportRecords} />
        <Route exact path="/modifier/projets/:id" component={CreateUpdateProjects} />
        <Route exact path="/clients/:id" component={Company} />
        <Route exact path="/projets/:id" component={DetailsProjects} />
        <Route exact path="/projets" component={ProjectList} />
        <Route exact path="/fonctions" component={JobsList} />
        <Route exact path="/reglages" component={Settings} />
        <Route path="/deconnexion" component={Logout} />
      </>
    );
  }

  return <Route exact path="/connexion" component={HomePage} />;
}

export default Routes;
