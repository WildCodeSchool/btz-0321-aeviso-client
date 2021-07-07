import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

import { companies } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import Spinner from '../Spinner';
import UserPreview from './UserPreview';

function Collaborators(): JSX.Element {
  //   const history = useHistory();
  const { user } = useUserFromStore();

  const { isLoading, error, data } = useQuery<User[], AxiosError>('users', () =>
    companies.getUsers(user.companyId as string, 'USER')
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5">
      {data?.map((user) => {
        return <UserPreview key={user.id} id={user.id as string} />;
      })}
    </div>
  );
}

export default Collaborators;
