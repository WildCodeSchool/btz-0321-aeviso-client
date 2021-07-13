import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, user } from '../../../API/requests';
import { useHistory } from 'react-router-dom';
import SelectCompany from './SelectCompany';
import SelectProject from './SelectProject';
import SelectDate from './SelectDate';
import Spinner from '../../Spinner';
import { useUserFromStore } from '../../../store/user.slice';

function ExportRecords(): JSX.Element {
  const { user: userStore } = useUserFromStore();
  const { register, handleSubmit, watch } = useForm();
  const history = useHistory();
  let companySelect = watch('company');

  if (userStore.role === 'ADMIN') {
    companySelect = userStore.companyId;
  }

  const {
    isLoading: companiesIsLoading,
    error: companiesError,
    data: companiesData,
  } = useQuery<Company[], AxiosError>('companies', () => companies.getAll(), {
    enabled: userStore.role === 'SUPERADMIN',
  });

  const {
    isLoading: projectIsLoading,
    error: projectError,
    data: projectData,
    refetch,
  } = useQuery<Project[], AxiosError>('project', () => user.getProjects(userStore.id as string), {
    enabled: Boolean(companySelect),
  });

  useEffect(() => {
    if (companySelect) {
      refetch();
    }
  }, [companySelect]);

  if (companiesIsLoading || projectIsLoading) {
    return <Spinner />;
  }

  const error = companiesError || projectError;

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5">
      <form
        onSubmit={handleSubmit((data) => {
          const start = new Date(data.start).toISOString();
          const end = new Date(data.end).toISOString();
          history.push(`/records/export/companies/${data.company}/projects/${data.project}?&start=${start}&end=${end}`);
        })}
        className="flex flex-col pb-2"
        action="sumbit"
      >
        <h1 className="sm:text-5xl  text-3xl font-bold">Exporter un Rapport</h1>
        <h2 className="sm:text-base text-sm mt-3">{`Attention vous devez obligatoirement remplir tous les champs afin d'exporter un rapport`}</h2>
        {!companiesIsLoading && <SelectCompany register={register} companiesData={companiesData} />}
        <SelectProject register={register} projectData={projectData} />
        <SelectDate register={register} />
      </form>
    </div>
  );
}

export default ExportRecords;
