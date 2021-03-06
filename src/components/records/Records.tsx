import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { records } from '../../API/requests';
import CardTitle from '../CardTitle';
import RecordPreview from './RecordPreview';
import Spinner from '../Spinner';

function Records(): JSX.Element {
  const { isLoading, error, data } = useQuery<IRecord[], AxiosError>('records', () => records.getAll(10));

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="text-black dark:text-white font-roboto">
      <div className="py-4 px-5 text-lg font-bold flex justify-between items-center shadow-inputShadow bg-white dark:bg-component sm:sticky sm:top-0">
        <CardTitle>Derniers rapports</CardTitle>
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
