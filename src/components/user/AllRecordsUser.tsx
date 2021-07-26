import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import { Link, useParams } from 'react-router-dom';

function AllRecordsUser(): JSX.Element {
  const { user: userFromStore } = useUserFromStore();
  const { id } = useParams<{ id: string | undefined }>();

  const userId = id ?? userFromStore.id;

  const { isLoading, error, data } = useQuery<IRecord[], AxiosError>(['record', userId], () =>
    user.getRecords(userId as string)
  );

  if (isLoading) {
    return <p>...</p>;
  }

  if (error) {
    <p>
      An error has occurred: {error.message}. Code: {error.code}
    </p>;
  }
  return (
    <div className="dark:bg-component h-full w-full bg-white sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow overflow-y-auto">
      <div className="py-4 px-3 text-lg font-bold flex items-center justify-between bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-2xl font-bold">Rapports</p>
        <Link to="/saisie">
          <p className="focus:outline-none sm:text-xs text-xs text-white bg-customBlue p-2 shadow-buttonShadow rounded-md flex items-center">
            Nouveau
          </p>
        </Link>
      </div>
      <div className="mx-4 mb-5">
        {data?.map((record) => {
          const date = new Date(record.date).toLocaleDateString();
          return (
            <div key={record.id} className="flex-row justify-around border-b mt-5 pb-2">
              <p className="font-bold text-sm">Rapport du {date}</p>
              {record.timeslot === 'AFTERNOON' && <p className="text-xs mt-1">{"Durée : 3h30 heures l'après midi"}</p>}
              {record.timeslot === 'MORNING' && <p className="text-xs mt-1">Durée : 3h30 heures le matin</p>}
              <p className="text-xs text-gray-400 truncate w-72 sm:w-96 mt-1" key={record.id}>
                {record.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllRecordsUser;
