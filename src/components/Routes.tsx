import React from 'react';
import { Route } from 'react-router-dom';

import SuperAdmin from './home/SuperAdmin';
import HomePage from '../views/HomePage';
import ListsCompanies from './companies/ListsCompanies';
import CreateCompany from './companies/CreateCompany';
import FormResult from './records/Exporter/FormResult';
import ExportRecords from './records/Exporter/ExportRecords';

function Routes(): JSX.Element {
  return (
    <>
      <Route exact path="/aeviso" component={SuperAdmin} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/clients" component={ListsCompanies} />
      <Route exact path="/clients/create" component={CreateCompany} />
      <Route exact path="/records/export/companies/:companyId/projects/:projectId" component={FormResult} />
      <Route exact path="/records/export" component={ExportRecords} />
    </>
  );
}

export default Routes;
