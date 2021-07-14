import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { companies } from '../../API/requests';
import Spinner from '../Spinner';
import { useUserFromStore } from '../../store/user.slice';
import Collaborators from '../users/Collaborators';
import Calendar from '../records/CreateNew/Calendar';
import ExportRecords from '../records/Exporter/ExportRecords';

function Admin(): JSX.Element {
  const { user } = useUserFromStore();

  const id = user?.companyId;
  const [company, setCompany] = useState<Company | null>(null);

  const { isLoading, error } = useQuery<Company, AxiosError>(['company', id], () => companies.getOne(id as string), {
    onSuccess: (data) => {
      setCompany(data);
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        An error has occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div className="h-full">
      <div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-2 gap-5 h-full">
        <div className="sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <h1 className="text-black dark:text-white text-lg sm:text-2xl font-roboto font-bold">{company?.name}</h1>
          <p className="text-black dark:text-white">ADMIN</p>
        </div>
        <div className="sm:col-start-1 sm:row-start-2 sm:row-end-4 col-start-1 row-start-2 border-2 dark:border-componentBorder  bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <ExportRecords />
        </div>
        <div className="sm:col-start-2 mb-10 sm:mb-0 sm:col-end-3 sm:row-start-1 sm:row-end-4 row-start-3 row-end-4 col-start-1 border-2 dark:border-componentBorder  bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow  mx-4 sm:mx-0">
          <Collaborators />
        </div>
      </div>
    </div>
  );
}
export default Admin;
