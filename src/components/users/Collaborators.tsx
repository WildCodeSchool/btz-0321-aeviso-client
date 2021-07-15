import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { companies, user } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import MainComponentHeader from '../MainComponentHeader';
import Spinner from '../Spinner';
import CreateNewUser from './CreateUser';
import UserPreview from './UserPreview';

function Collaborators(): JSX.Element {
  const [isForm, setIsForm] = useState(false);
  const { register } = useForm();
  const { user: currentUser } = useUserFromStore();

  const { isLoading, error, data } = useQuery<User[], AxiosError>('users', () =>
    companies.getUsers(currentUser.companyId as string, 'USER')
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-lg shadow-buttonShadow dark:shadow-mainShadow sm:mx-0 overflow-y-auto">
      {isForm ? (
        <CreateNewUser setIsForm={setIsForm} mutationFn={user.create} />
      ) : (
        <div>
          <MainComponentHeader setIsForm={setIsForm} register={register} title="Collaborateurs" />

          <div className="sm:mt-7 mt-5 mx-3 sm:mx-8">
            {data?.map((user) => {
              return <UserPreview key={user.id} id={user.id as string} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Collaborators;
