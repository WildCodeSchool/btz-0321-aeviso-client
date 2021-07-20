import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { companies, jobs } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import { Link } from 'react-router-dom';

function InfoUser(): JSX.Element {
  const { user: userFromStore } = useUserFromStore();

  const {
    isLoading: jobsIsLoading,
    error: jobsError,
    data: jobsData,
  } = useQuery<Job, AxiosError>(['jobs', userFromStore.jobId], () => jobs.getOne(userFromStore.jobId as string));

  const {
    isLoading: companyIsLoading,
    error: companyError,
    data: companyData,
  } = useQuery<Company, AxiosError>(['jobs', userFromStore.companyId], () =>
    companies.getOne(userFromStore.companyId as string)
  );

  if (jobsIsLoading || companyIsLoading) {
    return <p>...</p>;
  }

  const error = jobsError || companyError;
  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="p-3 text-black dark:text-white text-lg  flex flex-col justify-start items-start bg-white dark:bg-component  sm:sticky sm:top-0 ">
      <div className="flex w-full justify-between">
        <p className="text-xl font-bold ">
          {userFromStore.firstName} {userFromStore.lastName}
        </p>
        <Link to="/reglages">
          <p className="focus:outline-none sm:text-xs font-bold text-xs p-2 text-white shadow-buttonShadow rounded-md bg-customBlue">
            Modifier mes informations
          </p>
        </Link>
      </div>
      <p className="mt-5 sm:mt-2 text-sm">Entreprise : {companyData?.name}</p>
      <p className="mt-2 text-sm">Email : {userFromStore.email}</p>
      <p className="mt-2 text-sm">Fonction : {jobsData?.label}</p>
    </div>
  );
}

export default InfoUser;
