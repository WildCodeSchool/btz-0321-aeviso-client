import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';

import { project, records } from '../../../API/requests';
import { useUserFromStore } from '../../../store/user.slice';
import Spinner from '../../Spinner';
import useModal from '../../../hooks/useModal';
import Modal from '../../Modal';
import ValidateFormButton from '../../ValidateFormButton';
import TimeSlotButton from './TimeSlotButton';
import { useRecordFromStore } from '../../../store/record.slice';

interface IDayRecord {
  selectedProject: string;
  handleClose: () => void;
}

interface IData {
  timeslot: 'morning' | 'afternoon' | 'fullday';
  comment: string;
}

function DayRecord({ selectedProject, handleClose }: IDayRecord): JSX.Element {
  const { user } = useUserFromStore();
  const { record, dispatchAddRecord, dispatchCreateRecord } = useRecordFromStore();
  const { isModal, setIsModal, message, setMessage } = useModal();

  const { register, handleSubmit, watch, setValue } = useForm();

  const end = new Date(record.date);
  end.setDate(end.getDate() + 1);

  const { isLoading: projectLoading, data } = useQuery<Project, AxiosError>(
    ['project', selectedProject],
    () => project.getOne(selectedProject),
    {
      enabled: Boolean(selectedProject),
    }
  );

  const { isLoading: recordLoading } = useQuery<IRecord[], AxiosError>(
    ['records', record.date],
    () => project.getUserRecords(selectedProject, user.id as string, record.date.toISOString(), end.toISOString()),
    {
      enabled: Boolean(selectedProject),
      onSuccess: (data) => {
        dispatchCreateRecord(data);
        if (data.length > 0) setValue('comment', data[0].comment);
      },
    }
  );

  const isTimeslot = watch('timeslot');

  const { mutate: postRecord } = useMutation(records.post, {
    onSuccess: (data) => {
      setMessage('Rapport créé');
      setIsModal(true);
      dispatchAddRecord(data);
      setValue('timeslot', '');
    },
    onError: () => {
      setMessage('Une erreur est survenue lors de la création');
      setIsModal(true);
    },
  });

  const onSubmit = (data: IData) => {
    const { timeslot, comment } = data;
    const dateToRecord = new Date(record.date);
    dateToRecord.setHours(dateToRecord.getHours() + 12);
    const newRecord = {
      userId: user.id,
      projectId: selectedProject,
      date: dateToRecord.toISOString(),
      comment,
    };
    if (timeslot === 'fullday') {
      postRecord({ ...newRecord, timeslot: 'MORNING' });
      postRecord({ ...newRecord, timeslot: 'AFTERNOON' });
      return;
    }
    postRecord({ ...newRecord, timeslot: timeslot === 'morning' ? 'MORNING' : 'AFTERNOON' });
    return;
  };

  if (projectLoading || recordLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {isModal && (
        <Modal
          title="Création de rapport"
          buttons={[
            {
              text: 'Valider',
              handleClick: () => {
                setIsModal(false);
                handleClose();
              },
            },
          ]}
        >
          {message}
        </Modal>
      )}
      <div className="flex flex-col text-black dark:text-white  mx-4 sm:mx-0 mt-5 sm:mt-20">
        <h1 className="font-bold text-xl sm:text-4xl">Projet : {data?.name}</h1>
        <h2 className="font-bold sm:text-2xl mt-2 sm:mt-5">{record.date.toLocaleDateString()}</h2>
      </div>
      <div className="w-full md:h-10 mt-5 mx-4 sm:mx-0 flex items-center">
        {record.records?.length > 0 ? (
          <p className="text-xl max-w-full">Vous avez enregistré {record.records.length} rapport(s) ce jour-là.</p>
        ) : (
          <p className="sm:text-lg max-w-full">
            Pour créer un rapport, veuillez sélectionner votre plage horaire du {record.date.toLocaleDateString()}.
          </p>
        )}
      </div>
      <div className="mt-5 sm:h-28 w-full flex flex-col sm:flex-row">
        <TimeSlotButton
          recordId={record.records?.find((record) => record.timeslot === 'MORNING')?.id as string}
          isActive={record.records?.find((record) => record.timeslot === 'MORNING') ? false : true}
          isTimeslot={isTimeslot}
          setValue={setValue}
          value="morning"
        >
          Matin
        </TimeSlotButton>

        <TimeSlotButton
          recordId={record.records?.find((record) => record.timeslot === 'AFTERNOON')?.id as string}
          isActive={record.records?.find((record) => record.timeslot === 'AFTERNOON') ? false : true}
          isTimeslot={isTimeslot}
          setValue={setValue}
          value="afternoon"
        >
          Après-midi
        </TimeSlotButton>

        <span className={record.records && record.records?.length > 0 ? 'hidden' : 'block'}>
          <TimeSlotButton
            isActive={record.records && record.records?.length > 0 ? false : true}
            isTimeslot={isTimeslot}
            setValue={setValue}
            value="fullday"
          >
            Jour entier
          </TimeSlotButton>
        </span>
      </div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-5  mx-4 sm:mx-0">
          <label htmlFor="text" className="text-white text-xl">
            Commentaire
          </label>
          <textarea
            {...register('comment')}
            className=" focus:outline-none bg-input shadow-inputShadow text-white rounded-md mt-2 h-52 p-3"
          />
          {isTimeslot ? (
            <ValidateFormButton text={record.records?.length > 0 ? 'Modifier' : 'Créer'} />
          ) : (
            <p className="my-5 font-bold sm:text-xl">
              {"Veuillez d'abord resélectionner vos crénaux horaire avant de modifier le rapport"}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default DayRecord;
