import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { records } from '../../API/requests';

import CardTitle from '../CardTitle';
import { Link } from 'react-router-dom';
import RecordPreview from './RecordPreview';

function Records(): JSX.Element {
  const { isLoading, error, data } = useQuery<IRecord[], AxiosError>('records', () => records.getAll(10));

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className=" text-white font-roboto">
      <div className="py-5 px-5 text-lg font-bold flex justify-between items-center bg-black sm:sticky sm:top-0">
        <CardTitle>Derniers rapports</CardTitle>

        <Link to="/export" className="p-2 bg-blue rounded-md text-xs font-light">
          Exporter un rapport
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
