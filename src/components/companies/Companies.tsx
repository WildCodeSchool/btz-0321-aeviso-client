import React, { FormEvent } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';

import CardTitle from '../CardTitle';
import { Link } from 'react-router-dom';
import CompanyPreview from './CompanyPreview';
import SearchInput from '../SearchInput';
import { SearchCircleIcon } from '@heroicons/react/solid';

function Companies(): JSX.Element {
  const { isLoading, error, data } = useQuery<Company[], AxiosError>('companies', companies.getAll);

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
        <CardTitle>Clients</CardTitle>

        <Link to="/records" className="p-2 bg-blue-500 rounded-md">
          Tous les clients
        </Link>
      </div>

      <form action="" onSubmit={handleSubmit} className="flex items-center">
        <SearchInput />

        <button type="submit">
          <SearchCircleIcon className="h-12 ml-2" />
        </button>
      </form>
      <div className="h-full overflow-hidden">
        {data?.slice(0, 3)?.map((company: Company, index) => (
          <CompanyPreview key={company.id} company={company} isLastElement={index === data?.slice(0, 3)?.length - 1} />
        ))}
      </div>
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

export default Companies;
