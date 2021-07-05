import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../views/HomePage';
import SuperAdmin from './home/SuperAdmin';
import ExportRecords from './records/Exporter/ExportRecords';
import ListsCompanies from './companies/ListsCompanies';
import FormResult from './records/Exporter/FormResult';
import { RootState } from '../assets/redux/store';
import { connect } from 'react-redux';
import Admin from './home/Admin';
import User from './home/User';

function Routes({ user }: { user?: UserReduxState }): JSX.Element {
  if (user?.role === 'ADMIN') {
    console.log(user?.id);
    console.log(user?.companyId);
    return (
      <>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/aeviso" component={Admin} />
        <Route exact path="/records/export" component={ExportRecords} />
      </>
    );
  }

  if (user?.role === 'USER') {
    return (
      <>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/aeviso" component={User} />
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
      </>
    );
  }

  return <Route exact path="/home" component={HomePage} />;
}
const mapStateToProps = (state: RootState) => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(Routes);
