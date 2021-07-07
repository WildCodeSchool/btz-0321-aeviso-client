import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { project, records } from '../../../API/requests';
import { useUserFromStore } from '../../../store/user.slice';
import Spinner from '../../Spinner';
import { useForm } from 'react-hook-form';

interface IDayRecord {
  newDate: Date;
  selectedProject: string;
}

interface IData {
  timeslot: 'morning' | 'afternoon' | 'fullday';
  comment: string;
}

function DayRecord({ newDate, selectedProject }: IDayRecord): JSX.Element {
  const { user } = useUserFromStore();
  const { register, handleSubmit, watch } = useForm();

  const { isLoading, error, data } = useQuery<Project, AxiosError>(['project', selectedProject], () =>
    project.getOne(selectedProject)
  );

  const isTimeslot = watch('timeslot');

  const date = newDate.toISOString();

  const { mutate } = useMutation(records.post);
  const onSubmit = (data: IData) => {
    const { timeslot, comment } = data;
    const record = {
      userId: user.id,
      projectId: selectedProject,
      date,
      comment,
    };
    if (timeslot === 'fullday') {
      mutate({ ...record, timeslot: 'MORNING' });
      mutate({ ...record, timeslot: 'AFTERNOON' });
      return;
    }
    mutate({ ...record, timeslot: timeslot === 'morning' ? 'MORNING' : 'AFTERNOON' });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex text-black dark:text-white items-center mx-4 mt-5 sm:mt-20 justify-between">
        <h1 className="font-bold text-2xl">{data?.name}</h1>

        <h1>{newDate.toLocaleDateString()}</h1>
      </div>
      <form className="sm:mt-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 flex flex-col sm:flex-row mx-4">
          <label
            className={`text-center rounded-xl px-12 py-4   ${
              isTimeslot === 'morning' ? ' bg-customGreen' : 'border border-white hover:bg-customGreen'
            }`}
          >
            Matin
            <input className="hidden" type="radio" {...register('timeslot')} id="morning" value="morning"></input>
          </label>

          <label
            className={`text-center rounded-xl px-12 py-4 sm:ml-10   ${
              isTimeslot === 'afternoon' ? ' bg-customGreen' : 'border border-white hover:bg-customGreen'
            }`}
          >
            Après Midi
            <input className="hidden" type="radio" {...register('timeslot')} id="afternoon" value="afternoon"></input>
          </label>
          <label
            className={` text-center rounded-xl px-12 py-4 sm:ml-10   ${
              isTimeslot === 'fullday'
                ? ' bg-customGreen'
                : 'border border-black dark:border-white shadow-buttonShadow hover:text-white hover:border-white hover:bg-customGreen'
            }`}
          >
            Journée
            <input type="radio" className="hidden" {...register('timeslot')} id="fullday" value="fullday"></input>
          </label>
        </div>

        <div className="flex flex-col mt-10 sm:mt-10  mx-4">
          <label htmlFor="text" className="text-white text-xl">
            Comment
          </label>
          <textarea {...register('comment')} className=" bg-input rounded-xl mt-2 h-32 p-3" />
        </div>
        <button
          type="submit"
          className="text-white shadow-buttonShadow rounded-lg mb-10 sm:mt-10 mx-4  px-12 py-2 bg-customGreen mt-5"
        >
          Valider
        </button>
      </form>
    </div>
  );
}

export default DayRecord;
