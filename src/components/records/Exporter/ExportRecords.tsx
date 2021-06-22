import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../../API/requests';
import { useLocation, useHistory } from 'react-router-dom';
import FormResult from './FormResult';

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
        <div className="bg-black h-full w-full text-white font-roboto rounded-xl shadow-mainShadow py-5 px-8">
          <form
            onSubmit={handleSubmit((data) => {
              const start = new Date(data.start).toISOString();
              const end = new Date(data.end).toISOString();
              history.push(`/export?companyId=${data.company}&projectId=${data.project}&start=${start}&end=${end}`);
            })}
            className="flex flex-col"
            action="sumbit"
          >
            <h1 className="text-3xl font-bold">Exporter un Projet</h1>
            <div className="flex flex-col">
              <label className="mt-5 font-bold text-lg" htmlFor="select">
                1. Sélectionner une entreprise
              </label>
              <select
                {...register('company')}
                className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
              >
                {companiesData?.map((company: Company) => {
                  return (
                    <option value={company.id} key={company.id}>
                      {company.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              {' '}
              <label className="mt-5 font-bold text-lg" htmlFor="select">
                2. Sélectionner une projet
              </label>
              <select
                {...register('project', { value: projectData?.[0]?.id || '' })}
                className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
              >
                {projectData?.map((project) => {
                  return (
                    <option value={project.id} key={project.id}>
                      {project.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mt-5 font-bold text-lg" htmlFor="select">
                3. Sélectionner une date de début
              </label>
              <input
                {...register('start', { required: true })}
                className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
                type="date"
              />
            </div>

            <div className="flex flex-col">
              {' '}
              <label className="mt-5 font-bold text-lg" htmlFor="select">
                4. Sélectionner une date de fin
              </label>
              <input
                {...register('end', { required: true })}
                className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
                type="date"
              />
              <input type="submit" className="focus:outline-none mt-5 w-4/12 rounded-sm bg-green" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ExportRecords;
