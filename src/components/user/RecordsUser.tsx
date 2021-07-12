import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { project } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

import Spinner from '../Spinner';
import SearchInput from '../SearchInput';

function RecordsUser(): JSX.Element {
  const { user: userFromStore } = useUserFromStore();
  const { projectId } = useParams<{ projectId: string }>();
  const history = useHistory();

  const { register, watch } = useForm();

  const searchInput = watch('search');

  const {
    isLoading: recordsIsLoading,
    error: recordsError,
    data: recordsData,
  } = useQuery<IRecord[], AxiosError>(['records', { id: projectId }, userFromStore.id], () =>
    project.getUserRecords(projectId, userFromStore.id as string)
  );

  const {
    isLoading: projectIsLoading,
    error: projectError,
    data: projectData,
  } = useQuery<Project, AxiosError>(['projects', { id: projectId }], () => project.getOne(projectId));

  if (projectIsLoading || recordsIsLoading) {
    return <Spinner />;
  }

  const error = projectError || recordsError;

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="grid   grid-cols-1 grid-rows-2 gap-5 h-full w-full text-white">
      <div className="sm:col-start-1 sm:row-start-1 sm:row-end-5 col-start-1  border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <div className="text-black dark:text-white">
          <div className="py-4 px-5 text-lg font-bold flex justify-between items-center bg-white dark:bg-component  sm:sticky sm:top-0 ">
            <p className="text-2xl font-bold"></p>
            <p></p>
          </div>
          <div className="py-4 px-5 text-lg font-bold flex items-center justify-between bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
            <div className="flex flex-row">
              <p className="text-2xl font-bold">Rapports / {projectData?.name}</p>
              <SearchInput register={register} name="search" />
            </div>
            <button
              onClick={history.goBack}
              className="focus:outline-none border px-5 py-1 rounded-md shadow-buttonShadow ml-2 bg-customGreen text-white"
            >
              Retour
            </button>
          </div>
          {recordsData
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
                  <p> {record.timeslot}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default RecordsUser;
