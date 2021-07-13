import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

import { auth } from '../../API/requests';

import Spinner from '../Spinner';

function Logout(): JSX.Element {
  const { isLoading, error, data } = useQuery<{ message: string }, AxiosError>('auth', auth.logout);
  const history = useHistory();

  const [time, setTime] = useState(3);

  useEffect(() => {
    const timeout = setTimeout(() => setTime((prevTime) => prevTime - 1), 1000);

    if (time === 0) {
      history.push('/home');
    }

    return () => clearTimeout(timeout);
  }, [data, time]);

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

  return (
    <div className="h-screen w-screen bg-black bg-opacity-20 text-white">
      {"Vous allez être redirigé vers la page d'accueil dans"} {time} seconde{time > 1 && 's'}
    </div>
  );
}

export default Logout;
