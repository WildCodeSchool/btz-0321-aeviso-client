import React, { useState } from 'react';
import Picker from './Picker';
import DayRecord from './DayRecord';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useUserFromStore } from '../../../store/user.slice';

function Calendar(): JSX.Element {
  const { user } = useUserFromStore();
  const { register, watch } = useForm();
  const history = useHistory();
  const selectedProject = watch('project');
  const [dayActive, setDayActive] = useState<boolean>(true);
  const handleClose = () => {
    if (dayActive === false) {
      setDayActive(true);
    } else {
      history.goBack();
    }
  };

  return (
    <div className="flex flex-col dark:bg-component bg-white border-2 dark:border-componentBorder h-full w-11/12 sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow sm:mx-0 mx-4 sm:px-10 overflow-y-auto">
      <div className="flex sm:items-end items-center w-full justify-between px-4 sm:px-0">
        <h1 className="font-bold text-2xl sm:text-3xl mr-5 sm:mx-0 mt-3 sm:mt-5">Effectuer une saisie</h1>
        {dayActive === false || user.role === 'USER' ? (
          <button
            className="text-white bg-customGreen mt-4 sm:mt-0 py-1 px-6 rounded-md shadow-buttonShadow"
            onClick={handleClose}
          >
            Retour
          </button>
        ) : (
          ''
        )}
      </div>
      {dayActive ? (
        <Picker setDayActive={setDayActive} register={register} />
      ) : (
        <DayRecord selectedProject={selectedProject} handleClose={handleClose} />
      )}
    </div>
  );
}

export default Calendar;
