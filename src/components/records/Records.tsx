import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { records } from '../../API/requests';

import CardTitle from '../CardTitle';
import { Link } from 'react-router-dom';
import RecordPreview from './RecordPreview';
import Spinner from '../Spinner';

function Records(): JSX.Element {
  const { isLoading, error, data } = useQuery<IRecord[], AxiosError>('records', () => records.getAll(10));

  const loggedIn = true;

  if (loggedIn) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className=" text-white font-roboto">
      <div className="py-3 px-5 text-lg font-bold flex justify-between items-center bg-black sticky top-0">
        <CardTitle>Derniers rapports</CardTitle>

        <Link to="/records" className="p-2 bg-blue rounded-md text-xs font-light">
          Tous les rapports
        </Link>
      </div>
      {data?.map((record: IRecord, index) => (
        <RecordPreview
          key={record.id}
          record={record}
          isFirstElement={index === 0}
          isLastElement={index === data?.length - 1}
        />
      ))}
    </div>
  );
}

export default Records;
