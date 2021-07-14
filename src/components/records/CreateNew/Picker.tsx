import React, { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import Spinner from '../../Spinner';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { user } from '../../../API/requests';
import { useUserFromStore } from '../../../store/user.slice';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useRecordFromStore } from '../../../store/record.slice';
import { getLocaleDate } from '../../../assets/date';

interface IPicker {
  setDayActive: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<FieldValues>;
}

function Picker({ setDayActive, register }: IPicker): JSX.Element {
  const { dispatchSelectDate } = useRecordFromStore();

  const handleChange = (date: Date) => {
    dispatchSelectDate(getLocaleDate(date));
    setDayActive(false);
  };

  const { user: userStore } = useUserFromStore();

  const { isLoading, error, data } = useQuery<Project[], AxiosError>(
    ['projects', userStore.id],
    () => user.getProjects(userStore.id as string),
    {
      enabled: Boolean(userStore.id),
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex w-full sm:mt-10 justify-between sm:items-end flex-col sm:flex-row"></div>
      <div className="mx-3 sm:mx-0 mt-5 ">
        <label className="font-bold sm:text-2xl mt-10" htmlFor="select">
          1. Sélectionner un projet
        </label>

        <select
          {...register('project', { value: data?.[0]?.id || '' })}
          className="focus:outline-none w-full text-black dark:text-gray-300 text-sm bg-white dark:bg-component border-b pt-3 pb-2 border-black dark:border-white"
        >
          {data?.map((project) => {
            return (
              <option value={project.id} key={project.id}>
                {project.name}
              </option>
            );
          })}
        </select>
      </div>
      <p className="font-bold sm:text-2xl mt-10">2. Pour créer un rapport sélectionnez une journée</p>
      <div className="flex mt-5 mb-10 w-12/12 bg-white  dark:bg-component rounded-xl">
        <Calendar onChange={handleChange} />
      </div>
    </div>
  );
}

export default Picker;
