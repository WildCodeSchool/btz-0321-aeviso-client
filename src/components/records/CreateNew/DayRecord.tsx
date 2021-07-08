import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { project, records } from '../../../API/requests';
import { useUserFromStore } from '../../../store/user.slice';
import Spinner from '../../Spinner';
import { useForm } from 'react-hook-form';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal';
import { useHistory } from 'react-router-dom';
import { getLocaleDate } from '../../../assets/date';

interface IDayRecord {
  newDate: Date;
  selectedProject: string;
}

interface IData {
  timeslot: 'morning' | 'afternoon' | 'fullday';
  comment: string;
}

function DayRecord({ newDate, selectedProject }: IDayRecord): JSX.Element {
  const history = useHistory();
  const { user } = useUserFromStore();
  const { register, handleSubmit, watch } = useForm();
  const { isModal, setIsModal, message, setMessage } = useModal();

  const {
    isLoading: projectLoading,
    error: projectError,
    data,
  } = useQuery<Project, AxiosError>(['project', selectedProject], () => project.getOne(selectedProject));

  const isTimeslot = watch('timeslot');
  const date = getLocaleDate(newDate).toISOString();
  // const { mutate, error } = useMutation<unknown, AxiosError>(() => records.delete(id), {
  //     onSuccess: () => history.push(`/records`),
  //   });
  // const { mutate } = useMutation(recordData.put);
  const { mutate } = useMutation(records.post, {
    onSuccess: () => {
      setMessage('Votre rapport à bien été éffectuer');
      setIsModal((prevState) => !prevState);
    },
  });
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
  const end = new Date(getLocaleDate(newDate));
  end.setDate(end.getDate() + 1);
  const {
    isLoading: recordLoading,
    error: recordError,
    data: recordData,
  } = useQuery<IRecord[], AxiosError>(['records', user.id], () =>
    project.getRecords(selectedProject, user.id as string, date, end.toISOString())
  );
  console.log(newDate);
  console.log(recordData);

  const error = recordError || projectError;
  if (projectLoading || recordLoading) {
    return <Spinner />;
  }
  if (isModal)
    return (
      <Modal
        title="Authentification"
        buttons={
          data || recordData
            ? [{ text: 'ok', handleClick: () => history.push('./') }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal((prevState) => !prevState) }]
        }
      >
        {message}
      </Modal>
    );

  if (error) {
    return (
      <p>
        An error as occurred : {error.message}. code:{error.code}
      </p>
    );
  }

  return (
    <div>
      <div className="flex text-black dark:text-white items-center mx-4 mt-5 sm:mt-20 justify-between">
        <h1 className="font-bold text-sm sm:text-4xl">Projet : {data?.name}</h1>

        <h1 className="font-bold sm:text-2xl">{newDate.toLocaleDateString()}</h1>
      </div>
      <form className="sm:mt-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 flex flex-col sm:flex-row mx-4">
          <label
            className={`text-black dark:text-white text-center rounded-xl px-12 py-4  ${
              isTimeslot === 'morning'
                ? ' bg-customGreen text-white'
                : 'border border-black dark:border-white hover:bg-customGreen'
            }`}
          >
            Matin
            <input className="hidden" type="radio" {...register('timeslot')} id="morning" value="morning"></input>
          </label>

          <label
            className={`text-black dark:text-white  text-center rounded-xl px-12 py-4 sm:ml-10 mt-5   ${
              isTimeslot === 'afternoon'
                ? ' bg-customGreen text-white'
                : 'border border-black dark:border-white hover:bg-customGreen'
            }`}
          >
            Après Midi
            <input className="hidden" type="radio" {...register('timeslot')} id="afternoon" value="afternoon"></input>
          </label>
          <label
            className={` text-black dark:text-white  text-center rounded-xl px-12 py-4 sm:ml-10 mt-5   ${
              isTimeslot === 'fullday'
                ? ' bg-customGreen text-white'
                : 'border border-black dark:border-white shadow-buttonShadow hover:text-white hover:border-white hover:bg-customGreen'
            }`}
          >
            Journée
            <input type="radio" className="hidden" {...register('timeslot')} id="fullday" value="fullday"></input>
          </label>
        </div>

        <div className="flex flex-col mt-10 sm:mt-10  mx-4">
          <label htmlFor="text" className="text-white text-xl">
            Commentaire
          </label>
          <textarea
            {...register('comment')}
            className=" bg-input shadow-inputShadow text-white rounded-xl mt-2 h-32 p-3"
          />
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
