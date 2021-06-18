import React, { FormEvent } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { records } from '../../API/requests';

import CardTitle from '../CardTitle';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput';
import { SearchCircleIcon } from '@heroicons/react/solid';
import RecordPreview from './RecordPreview';

function Records(): JSX.Element {
  const { isLoading, error, data } = useQuery<IRecord[], AxiosError>('records', () => records.getAll(5));

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="m-4 text-white">
      <div className="mb-4 md:mb-2 flex justify-between items-center">
        <CardTitle>Derniers rapports</CardTitle>

        <Link to="/records" className="p-2 bg-blue-500 rounded-md">
          Tous les rapports
        </Link>
      </div>

      <form action="" onSubmit={handleSubmit} className="flex items-center">
        <SearchInput />

        <button type="submit">
          <SearchCircleIcon className="h-12 ml-2" />
        </button>
      </form>

      {data?.map((record: IRecord, index) => (
        <RecordPreview key={record.id} record={record} isLastElement={index === data?.length - 1} />
      ))}
      {/*{data && (*/}
      {/*  <>*/}
      {/*    <h3 className="mb-6">Companies test</h3>*/}
      {/*    <div>*/}
      {/*      {recordsList.map((record) => {*/}
      {/*        return (*/}
      {/*          <div key={record.id} className="border border-black mb-2">*/}
      {/*            <Link to={`/records/${record.id}`}>*/}
      {/*              <p>*/}
      {/*                {record.user_id} {record.project_id} {record.step_id} {record.time_slot}*/}
      {/*              </p>*/}
      {/*            </Link>*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*    <CreateRecordsForm setRecordsList={setRecordsList} />*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
}

export default Records;
