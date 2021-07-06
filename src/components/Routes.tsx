import React from 'react';
import { Route } from 'react-router-dom';
import User from './frontTestRoads/user/User';
import Company from './company/Company';
import ProjectList from './project/ProjectList';
import HomePage from '../views/HomePage';
import Logout from '../components/navigation/Logout';
import SuperAdmin from './home/SuperAdmin';
import ExportRecords from './records/Exporter/ExportRecords';
import ListsCompanies from './companies/ListsCompanies';
import FormResult from './records/Exporter/FormResult';
import { RootState } from '../assets/redux/store';
import { connect } from 'react-redux';
import Admin from './home/Admin';

import DetailsProjects from './company/DetailsProjects';

function Routes({ user }: { user?: UserReduxState }): JSX.Element {
  if (user?.role === 'ADMIN') {
    return (
      <>
        <Route exact path="/aeviso" component={Admin} />
        <Route exact path="/logout" component={Logout} />
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
        <Route exact path="/aeviso" component={SuperAdmin} />
        <Route exact path="/clients" component={ListsCompanies} />
        <Route exact path="/records/export/companies/:companyId/projects/:projectId" component={FormResult} />
        <Route exact path="/records/export" component={ExportRecords} />
        <Route exact path="/companies/:id" component={Company} />
        <Route exact path="/projects/:id" component={DetailsProjects} />
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/logout" component={Logout} />
      </>
    );
  }

  return <Route exact path="/home" component={HomePage} />;
}

const mapStateToProps = (state: RootState) => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(Routes);
