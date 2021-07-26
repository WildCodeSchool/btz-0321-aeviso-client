import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

import { auth } from '../../API/requests';

import { useUserFromStore } from '../../store/user.slice';

import Spinner from '../Spinner';

function Logout(): JSX.Element | null {
  const { dispatchLogout } = useUserFromStore();

  const { isLoading, error } = useQuery<{ message: string }, AxiosError>('auth', auth.logout, {
    onSuccess: () => {
      dispatchLogout();

      history.push('/connexion');
    },
  });

  const history = useHistory();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        Error message: {error.message}. Error code: {error.code}
      </p>
    );
  }

  return null;
}

export default Logout;
