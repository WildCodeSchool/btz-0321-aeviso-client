import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../../API/requests';
import { useLocation, useHistory } from 'react-router-dom';
import FormResult from './FormResult';
import SelectCompany from './SelectCompany';
import SelectProject from './SelectProject';
import SelectDate from './SelectDate';

function ExportRecords(): JSX.Element {
  const query = new URLSearchParams(useLocation().search);
  const { register, handleSubmit, watch } = useForm();
  const history = useHistory();

  const companySelect = watch('company');

  const {
    isLoading: companiesIsLoading,
    error: companiesError,
    data: companiesData,
  } = useQuery<Company[], AxiosError>('companies', () => companies.getAll());

  const {
    isLoading: projectIsLoading,
    error: projectError,
    data: projectData,
    refetch,
    isIdle,
  } = useQuery<Project[], AxiosError>('project', () => companies.getAllProjects(companySelect), {
    enabled: Boolean(companySelect),
  });

  useEffect(() => {
    refetch();
  }, [companySelect]);

  if (companiesIsLoading || projectIsLoading || isIdle) {
    return <p className="text-white">Loading...</p>;
  }

  const error = companiesError || projectError;

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      {query.has('companyId') ? (
        <FormResult query={query} />
      ) : (
        <div className="bg-black h-full sm:w-full text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  py-5 sm:px-10 p-5">
          <form
            onSubmit={handleSubmit((data) => {
              const start = new Date(data.start).toISOString();
              const end = new Date(data.end).toISOString();
              history.push(`/export?companyId=${data.company}&projectId=${data.project}&start=${start}&end=${end}`);
            })}
            className="flex flex-col"
            action="sumbit"
          >
            <h1 className="sm:text-3xl  text-2xl font-bold">Exporter un Rapport</h1>
            <h2 className="sm:text-xl text-sm mt-3">{`Attention vous devez obligatoirement remplir tous les champs afin d'exporter un rapport`}</h2>
            <SelectCompany register={register} companiesData={companiesData} />
            <SelectProject register={register} projectData={projectData} />
            <SelectDate register={register} />
          </form>
        </div>
      )}
    </div>
  );
}

export default ExportRecords;
