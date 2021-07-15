import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { project } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import { useForm } from 'react-hook-form';

import Spinner from '../Spinner';
import SearchInput from '../SearchInput';
import { Link } from 'react-router-dom';
import Plus from '../../../media/icons/Plus.svg';

function RecordsUser({ projectId }: { projectId: string }): JSX.Element {
  const { user: userFromStore } = useUserFromStore();

  const { register, watch } = useForm();

  const searchInput = watch('search');

  const {
    isLoading: recordsIsLoading,
    error: recordsError,
    data: recordsData,
  } = useQuery<IRecord[], AxiosError>(['records', { id: projectId }, userFromStore.id], () =>
    project.getUserRecords(projectId, userFromStore.id as string)
  );

  if (recordsIsLoading) {
    return <Spinner />;
  }

  const error = recordsError;

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="text-black dark:text-white mt-10">
      <div className="flex w-full justify-between items-center sm:items-start">
        <p className="text-3xl font-bold mb-6">Mes rapports</p>
        <Link to="/rapport/nouveau">
          <p className="focus:outline-none px-5 py-1 rounded-md shadow-buttonShadow ml-2 bg-customBlue text-white">
            Nouveau <img src={Plus} alt="Icône plus" className="p-1 rounded-full h-5 w-5 sm:h-6 sm:w-6" />
          </p>
        </Link>
      </div>
      <SearchInput register={register} name="search" />

      <div className="mt-5">
        {recordsData
          ?.filter((record) => {
            const included = record.comment.toLowerCase().includes(searchInput?.toLowerCase());
            return searchInput ? included : true;
          })
          ?.map((record) => {
            const date = new Date(record.date).toLocaleDateString();
            return (
              <div key={record.id} className="flex-row justify-around border-b mt-4 pb-2">
                <p className="font-bold text-lg">Rapport du {date}</p>
                {record.timeslot === 'AFTERNOON' && <p className="sm:text-sm">{"Durée : 3h30 heures l'après-midii"}</p>}
                {record.timeslot === 'MORNING' && <p className="sm:text-sm">Durée : 3h30 heures le matin</p>}
                <p className="sm:text-sm text-gray-400" key={record.id}>
                  Commentaire : {record.comment}
                </p>
              </div>
            );
          })}
        {recordsData?.length === 0 && (
          <p className="mt-5 text-2xl font-bold text-mainBg text-opacity-70">{'Aucun rapport sur ce projet'}</p>
        )}
      </div>
    </div>
  );
}

export default RecordsUser;
