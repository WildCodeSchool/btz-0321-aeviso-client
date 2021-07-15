import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import { Link } from 'react-router-dom';

function AllRecordsUser(): JSX.Element {
  const { user: userFromStore } = useUserFromStore();

  const { isLoading, error, data } = useQuery<IRecord[], AxiosError>(['record', userFromStore.id], () =>
    user.getRecords(userFromStore.id as string)
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
    <div className="dark:bg-component h-full bg-white sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
      <div className="py-6 px-6 text-lg font-bold flex items-center justify-between bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-3xl font-bold">Rapports</p>
        <Link to="/rapport/nouveau">
          <p className="focus:outline-none sm:text-base text-xs text-white bg-customBlue px-2 py-1 mt-5 sm:mt-0 sm:p-2 shadow-buttonShadow rounded-md flex items-center">
            Nouveau rapport
          </p>
        </Link>
      </div>
      <div className="mx-6">
        {data?.map((record) => {
          const date = new Date(record.date).toLocaleDateString();
          return (
            <div key={record.id} className="flex-row justify-around border-b mt-4 pb-2">
              <p className="font-bold text-lg">Rapport du {date}</p>
              {record.timeslot === 'AFTERNOON' && <p className="sm:text-sm">{"Durée : 3h30 heures l'après-midii"}</p>}
              {record.timeslot === 'MORNING' && <p className="sm:text-sm">Durée : 3h30 heures le matin</p>}
              <p className="sm:text-sm text-gray-400 truncate w-96" key={record.id}>
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
