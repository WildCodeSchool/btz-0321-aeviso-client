import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { project } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Spinner from '../Spinner';
import SearchInput from '../SearchInput';

function RecordsUser(): JSX.Element {
  const { user: userFromStore } = useUserFromStore();
  const { projectId } = useParams<{ projectId: string }>();

  const { register, watch } = useForm();

  const searchInput = watch('search');

  const { isLoading, error, data } = useQuery<IRecord[], AxiosError>(
    ['records', { id: projectId }, userFromStore.id],
    () => project.getUserRecords(projectId, userFromStore.id as string)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="text-black dark:text-white">
      <div className="py-4 px-5 text-lg font-bold flex items-center justify-between bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-2xl font-bold">Rapports</p>
        <SearchInput register={register} name="search" />
      </div>
      {data
        ?.filter((record) => {
          const included = record.comment.toLowerCase().includes(searchInput?.toLowerCase());

          // at first mount searchInput is undefined,
          // so we use a ternary to ensure we have list at first render
          return searchInput ? included : true;
        })
        ?.map((record) => {
          return (
            <div key={record.id} className="flex-row justify-around mt-3 mx-4 border-b pb-2">
              <p className="font-bold" key={record.id}>
                {record.comment}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default RecordsUser;
