import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { jobs, user } from '../../API/requests';
import Modal from '../Modal';
import Spinner from '../Spinner';
interface Params {
  id: string;
}

function OneCollaborator(): JSX.Element {
  const { id } = useParams<Params>();

  const { isLoading: userLoading, error: userError, data } = useQuery<User>(['user', id], () => user.getOne(id));

  const jobId = data?.jobId;

  const {
    isLoading: jobLoading,
    error: jobError,
    data: job,
  } = useQuery(['job', jobId], () => jobs.getOne(jobId as string));
  console.log(data);
  console.log(job);

  const loading = jobLoading || userLoading;
  const error = userError || jobError;
  if (loading) {
    return <Spinner />;
  }
  if (error)
    return (
      <Modal title="Erreur" buttons={[{ text: 'OK' }]}>
        Une erreur est survenue
      </Modal>
    );

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5 overflow-y-auto">
      <div className="flex  font-bold text-2xl sm:text-4xl">
        <p className="mr-2">{data?.lastName} /</p>
        <p>{data?.firstName}</p>
      </div>
      <div className="mt-5 sm:mt-10 border-b border-gray-300 pb-2">
        <p className=" text-xl font-bold">Email</p>
        <p className="">{data?.email}</p>
      </div>
      <div className="mt-5 sm:mt-10 border-b border-gray-300 pb-2">
        <p className=" text-xl font-bold">Poste</p>
        <p>{job?.label}</p>
      </div>
      <div className="mt-5 sm:mt-10 border-b border-gray-300 pb-2">
        <p className=" text-xl font-bold">Base Hebdomadaire</p>
        {data?.weeklyBasis === 'h35' ? <p>35 heures</p> : <p>39 heures</p>}
      </div>
      <div className="flex flex-col sm:flex-row w-full justify-between sm:mt-10">
        <button className="focus:outline-none text-white shadow-buttonShadow mt-5 w-full sm:w-4/12 py-2 sm:h-12 sm:rounded-md rounded-lg bg-customGreen ">
          Modifier
        </button>
        <button className="focus:outline-none text-white shadow-buttonShadow mt-5 w-full sm:w-4/12 py-2 sm:h-12 sm:rounded-md rounded-lg bg-customRed">
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default OneCollaborator;
