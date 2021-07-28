import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { jobs } from '../../API/requests';
import useModal from '../../hooks/useModal';
import Button from '../formComponents/Button';
import Modal from '../Modal';
import JobsHeader from './JobsHeader';

function JobsList(): JSX.Element {
  const [isModifying, setIsModifying] = useState('');

  const { setIsModal, setMessage, isModal, message } = useModal();

  const { refetch, data } = useQuery<Job[], AxiosError>('jobs', () => jobs.getAll(true));

  const { mutate: deleteJob } = useMutation(jobs.delete, {
    onSuccess: () => {
      setIsModal(true);
      setMessage('La fonction a bien été supprimée');
      refetch();
    },
  });

  const { mutate: modifyJob } = useMutation(jobs.update, {
    onSuccess: () => {
      setIsModal(true);
      setMessage('La nouvelle fonction a bien été modifiée');
      setIsModifying('');
      refetch();
    },
  });

  //createJob
  const { mutate: createJob } = useMutation(jobs.create, {
    onSuccess: () => {
      setIsModal(true);
      setMessage('La nouvelle fonction a bien été créée');
      refetch();
    },
  });

  const { register, getValues, setValue } = useForm();

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full w-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow sm:mx-0 overflow-y-auto relative">
      {isModal && (
        <Modal title="Tout s'est bien passé" buttons={[{ text: 'Valider', handleClick: () => setIsModal(false) }]}>
          {message}
        </Modal>
      )}
      <JobsHeader />

      <div className="p-2 px-4">
        <div className="flex flex-col py-4 sm:flex-row sm:items-end sm:justify-between  border-b border-gray-400">
          <label className="flex font-bold flex-col w-full sm:w-2/5 text-lg sm:text-xl">
            Créer une nouvelle fonction
            <input
              className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-10 sm:rounded-md w-full"
              {...register('newJob')}
            />
          </label>

          <Button
            handleClick={() => {
              createJob({ label: getValues('newJob') });
            }}
            color="green"
          >
            Valider
          </Button>
        </div>
        <h2 className="border-b border-gray-400 pb-2 font-bold text-xl mt-8">Liste des fonctions</h2>
      </div>
      <ul className="mx-5 mb-10">
        {data &&
          data.map((job) => {
            if (isModifying !== job.id) {
              return (
                <li
                  key={job.id}
                  className="flex flex-col sm:flex-row sm:w-full items-start sm:items-end justify-between"
                >
                  <button
                    className="text-lg sm:text-xl underline focus:outline-none mt-5 overflow-hidden overflow-ellipsis whitespace-nowrap min-h-full"
                    onClick={() => {
                      setValue('job', job.label);
                      setIsModifying(job.id);
                    }}
                  >
                    {job.label} {`(${job?.users?.length})`}
                  </button>
                  <Button
                    handleClick={() => deleteJob({ id: job.id })}
                    color={job?.users && job?.users?.length > 0 ? 'grey' : 'red'}
                    isDisabled={job?.users && job?.users?.length > 0 ? true : false}
                  >
                    Supprimer
                  </Button>
                </li>
              );
            }

            if (isModifying === job.id) {
              return (
                <li
                  key={job.id}
                  className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between mt-5 border-gray-100"
                >
                  <input
                    className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md w-full sm:w-1/2"
                    {...register('job')}
                  />
                  <div className="w-full flex sm:w-4/12 justify-end">
                    <Button
                      handleClick={() => modifyJob({ id: job.id, data: { label: getValues('job') } })}
                      color="green"
                    >
                      Modifier
                    </Button>
                    <Button handleClick={() => setIsModifying('')} color="red">
                      Annuler
                    </Button>
                  </div>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}

export default JobsList;
