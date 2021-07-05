import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../views/HomePage';
import SuperAdmin from './home/SuperAdmin';
import ExportRecords from './records/Exporter/ExportRecords';
import ListsCompanies from './companies/ListsCompanies';
import FormResult from './records/Exporter/FormResult';

function Routes(): JSX.Element {
  return (
    <>
      <Route exact path="/aeviso" component={SuperAdmin} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/clients" component={ListsCompanies} />
      <Route exact path="/records/export/companies/:companyId/projects/:projectId" component={FormResult} />
      <Route exact path="/records/export" component={ExportRecords} />
    </>
  );
}

export default Routes;
