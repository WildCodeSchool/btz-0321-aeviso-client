import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { project, records } from '../../../API/requests';
import { useUserFromStore } from '../../../store/user.slice';
import Spinner from '../../Spinner';
import { useForm } from 'react-hook-form';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal';
import { useHistory } from 'react-router-dom';
import ValidateFormButton from '../../ValidateFormButton';

interface IDayRecord {
  date: Date;
  selectedProject: string;
}

interface IData {
  timeslot: 'morning' | 'afternoon' | 'fullday';
  comment: string;
}

function DayRecord({ date, selectedProject }: IDayRecord): JSX.Element {
  const [isAlreadyRecorded, setIsAlreadyRecorded] = useState(false);

  const history = useHistory();
  const { user } = useUserFromStore();
  const { register, handleSubmit, watch, setValue } = useForm();
  const { isModal, setIsModal, message, setMessage } = useModal();

  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  const {
    isLoading: projectLoading,
    error: projectError,
    data,
  } = useQuery<Project, AxiosError>(['project', selectedProject], () => project.getOne(selectedProject));

  const {
    isLoading: recordLoading,
    error: recordError,
    data: recordData,
  } = useQuery<IRecord[], AxiosError>(
    ['records', user.id],
    () => project.getRecords(selectedProject, user.id as string, date.toISOString(), end.toISOString()),
    {
      onSuccess: (data) => {
        if (data && data.length > 0) setIsAlreadyRecorded(true);
        if (data.length === 1) return setValue('timeslot', data[0].timeslot.toLocaleLowerCase());
        if (data.length === 2) return setValue('timeslot', 'fullday');
      },
    }
  );

  const isTimeslot = watch('timeslot');

  const { mutate } = useMutation(records.post, {
    onSuccess: () => {
      setMessage('Votre rapport à bien été éffectué');
      setIsModal((prevState) => !prevState);
    },
  });

  const onSubmit = (data: IData) => {
    const { timeslot, comment } = data;
    const dateRecoded = new Date(date.setHours(12)).toISOString();
    const record = {
      userId: user.id,
      projectId: selectedProject,
      date: dateRecoded,
      comment,
    };
    if (timeslot === 'fullday') {
      mutate({ ...record, timeslot: 'MORNING' });
      mutate({ ...record, timeslot: 'AFTERNOON' });
      return;
    }
    mutate({ ...record, timeslot: timeslot === 'morning' ? 'MORNING' : 'AFTERNOON' });
  };

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

        <h2 className="font-bold sm:text-2xl">{date.toLocaleDateString()}</h2>
      </div>
      {isAlreadyRecorded && <p>Vous avez déja enregistré des données ce jour là</p>}
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
        <ValidateFormButton text={isAlreadyRecorded ? 'Modifier' : 'Créer'} />
      </form>
    </div>
  );
}

export default DayRecord;
