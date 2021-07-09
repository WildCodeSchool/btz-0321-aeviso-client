import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { project, records } from '../../../API/requests';
import { useUserFromStore } from '../../../store/user.slice';
import Spinner from '../../Spinner';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal';
import ValidateFormButton from '../../ValidateFormButton';
import TimeSlotButton from './TimeSlotButton';
import { useRecordContext } from '../../../Contexts/Record.context';

interface IDayRecord {
  selectedProject: string;
}

interface IData {
  timeslot: 'morning' | 'afternoon' | 'fullday';
  comment: string;
}

function DayRecord({ selectedProject }: IDayRecord): JSX.Element {
  const [isAlreadyRecorded, setIsAlreadyRecorded] = useState(false);

  const history = useHistory();
  const { date } = useRecordContext();

  const { user } = useUserFromStore();
  const { isModal, setIsModal, message, setMessage } = useModal();

  const { register, handleSubmit, watch, setValue } = useForm();
  const { refetchQueries } = useQueryClient();

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
    ['records', date],
    () => project.getRecords(selectedProject, user.id as string, date.toISOString() as string, end.toISOString()),
    {
      onSuccess: (data) => {
        if (data && data.length > 0) setIsAlreadyRecorded(true);
      },
    }
  );

  const isTimeslot = watch('timeslot');
  console.log(isTimeslot);

  const { mutate: postRecord } = useMutation(records.post, {
    onSuccess: () => {
      refetchQueries(['records', date]);
      setMessage('Votre rapport à bien été éffectué');
      setIsModal(true);
    },
    onError: () => {
      setMessage('Une erreur est survenue lors de la création');
      setIsModal((prevState) => !prevState);
    },
  });

  const onSubmit = (data: IData) => {
    console.log('submit');
    const { timeslot, comment } = data;
    const dateToRecord = new Date(date.setHours(12)).toISOString();
    const record = {
      userId: user.id,
      projectId: selectedProject,
      date: dateToRecord,
      comment,
    };
    if (timeslot === 'fullday') {
      postRecord({ ...record, timeslot: 'MORNING' });
      postRecord({ ...record, timeslot: 'AFTERNOON' });
      return;
    }
    postRecord({ ...record, timeslot: timeslot === 'morning' ? 'MORNING' : 'AFTERNOON' });
    return;
  };

  const error = recordError || projectError;
  if (projectLoading || recordLoading) {
    return <Spinner />;
  }
  if (isModal)
    return (
      <Modal
        title="Création de rappport"
        buttons={[
          {
            text: 'OK',
            handleClick: () => {
              setIsModal(false);
              history.push('/nouveaurapport');
            },
          },
        ]}
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
          <TimeSlotButton
            recordId={recordData?.find((record) => record.timeslot === 'MORNING')?.id as string}
            active={recordData?.find((record) => record.timeslot === 'MORNING') ? false : true}
            isTimeslot={isTimeslot}
            setValue={setValue}
            value="morning"
          >
            Matin
          </TimeSlotButton>

          <TimeSlotButton
            recordId={recordData?.find((record) => record.timeslot === 'AFTERNOON')?.id as string}
            active={recordData?.find((record) => record.timeslot === 'AFTERNOON') ? false : true}
            isTimeslot={isTimeslot}
            setValue={setValue}
            value="afternoon"
          >
            Après-midi
          </TimeSlotButton>

          <span className={recordData && recordData.length > 0 ? 'hidden' : 'block'}>
            <TimeSlotButton
              active={recordData && recordData.length > 0 ? false : true}
              isTimeslot={isTimeslot}
              setValue={setValue}
              value="fullday"
            >
              Jour entier
            </TimeSlotButton>
          </span>
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
