import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { companies } from '../../../API/requests';
import { project } from '../../../API/requests';

function ExportRecords(): JSX.Element {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState<unknown>();

  const {
    isLoading: CompaniesIsLoading,
    error: CompaniesError,
    data: CompaniesData,
  } = useQuery<Company[], AxiosError>('companies', () => companies.getAll());
  const {
    isLoading: projectIsLoading,
    error: projectError,
    data: projectData,
  } = useQuery<Project[], AxiosError>('project', () => project.getAll());

  if (CompaniesIsLoading || projectIsLoading) {
    return <p className="text-white">Loading...</p>;
  }

  const error = CompaniesError || projectError;

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  console.log(result);
  return (
    <div className="bg-black h-full w-full text-white font-roboto rounded-xl shadow-mainShadow p-5">
      <form
        onSubmit={handleSubmit((rslt) => {
          setResult(rslt);
        })}
        className="flex flex-col"
        action="sumbit"
      >
        <div className="flex flex-col">
          <label className="mt-5 font-bold text-lg" htmlFor="select">
            1. Sélectionner une entreprise
          </label>
          <select
            {...register('namecompany')}
            className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
          >
            {CompaniesData?.map((company: Company) => {
              return <option key={company.id}>{company.name}</option>;
            })}
          </select>
        </div>

        <div className="flex flex-col">
          {' '}
          <label className="mt-5 font-bold text-lg" htmlFor="select">
            2. Sélectionner une projet
          </label>
          <select
            {...register('nameprojet')}
            className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
          >
            {projectData?.map((projet, index) => {
              return <option key={index}>{projet.name}</option>;
            })}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mt-5 font-bold text-lg" htmlFor="select">
            3. Sélectionner une date de début
          </label>
          <input
            {...register('Date1')}
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
            {...register('Date2')}
            className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
            type="date"
          />
          <Link to="/exportéunrapport">
            <input type="submit" className="focus:outline-none mt-5 w-4/12 rounded-sm bg-green" />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ExportRecords;
