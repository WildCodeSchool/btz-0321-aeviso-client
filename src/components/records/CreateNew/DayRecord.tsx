import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import { project, records } from '../../../API/requests';
import { useUserFromStore } from '../../../store/user.slice';
import Spinner from '../../Spinner';
import { useForm } from 'react-hook-form';

interface IDayRecord {
  newDate: Date;
  setDayActive: Dispatch<SetStateAction<boolean>>;
  selectedProject: string;
}

function DayRecord({ newDate, setDayActive, selectedProject }: IDayRecord): JSX.Element {
  const { user } = useUserFromStore();
  const { register, handleSubmit, watch } = useForm<IRecord>();
  // const [isMatin, setIsMatin] = useState('text-white border border-white rounded-xl px-12 py-4 hover:bg-darkGreen');
  // const [isAp, setIsAp] = useState(
  //   'text-white border border-white rounded-xl px-12 py-4 sm:ml-5 mt-5 hover:bg-darkGreen'
  // );
  // const [isAllDay, setIsAllDay] = useState(
  //   'text-white border border-white rounded-xl px-12 py-4 sm:ml-5 mt-5 hover:bg-darkGreen'
  // );
  console.log(watch('timeslot'));
  const handleClose = () => {
    setDayActive(true);
  };
  const { isLoading, error, data } = useQuery<Project, AxiosError>(['project', selectedProject], () =>
    project.getOne(selectedProject)
  );

  const date = newDate.toISOString();

  // const handleMatin = () => {
  //   setIsMatin('text-white rounded-xl px-12 py-4 bg-customGreen');
  // };

  // const handleAp = () => {
  //   setIsAp('text-white rounded-xl px-12 py-4 sm:ml-5 mt-5 bg-customGreen');
  // };

  // const handleAllDay = () => {
  //   setIsAllDay('text-white rounded-xl px-12 py-4 sm:ml-5 mt-5 bg-customGreen');
  // };

  const { mutate } = useMutation(records.post);
  const onSubmit = (data: IRecord) => {
    const { timeslot, comment } = data;
      const record = {
        userId: user.id,
        projectId: selectedProject,
        date,
        timeslot,
        comment,
      };
      mutate(record);
    }


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex items-center mx-4 mt-5 justify-between">
        <h1 className="text-white font-bold text-2xl">{data?.name}</h1>
        <h1 className="text-white">{newDate.toLocaleDateString()}</h1>
      </div>
      <button onClick={handleClose}>Retour</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 flex flex-col sm:flex-row mx-4">
          {/* <button onClick={handleMatin} className={isMatin}>
            Matin
          </button> */}
          <label
            className={`text-white text-center rounded-xl px-12 py-4   ${
           ? ' bg-customGreen' : 'border border-white hover:bg-customGreen'
            }`}
          >
            Matin
            <input className="hidden" type="radio" {...register('timeslot')} id="morning" value="morning"></input>
          </label>

          <label>
            Après Midi
            <input type="radio" {...register('timeslot')} id="afternoon" value="afternoon"></input>
          </label>
          <label>
            Journée
            <input type="radio" {...register('timeslot')} id="fullday" value="fullday"></input>
          </label>
        </div>

        <div className="mt-10 sm:mt-2 mx-4">
          <label htmlFor="text" className="text-white text-xl">
            Comment
          </label>
          <textarea {...register('comment')} className="text-white bg-input rounded-xl mt-2 h-32 p-3" />
        </div>
        <button
          type="submit"
          className="text-white border border-white rounded-lg mb-10 mx-4  px-12 py-2 hover:bg-blue-300 mt-5 bg-darkGreen "
        >
          Valider
        </button>
      </form>
    </div>
  );
}

export default DayRecord;
