import React, { useState } from 'react';
import Picker from './Picker';
import DayRecord from './DayRecord';
import { useForm } from 'react-hook-form';

function Calendar(): JSX.Element {
  const { register, watch } = useForm();
  const selectedProject = watch('project');
  const [dayActive, setDayActive] = useState<boolean>(true);
  const handleClose = () => {
    setDayActive(true);
  };

  return (
    <div className="flex flex-col dark:bg-component bg-white border-2 dark:border-componentBorder h-full w-11/12 sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow sm:mx-0 mx-4 sm:px-10 overflow-y-auto">
      <div className="flex items-end w-full justify-between px-4">
        <h1 className="font-bold text-2xl sm:text-5xl sm:mx-0 mt-3 sm:mt-10">Créer un nouveau rapport</h1>
        {dayActive === false ? (
          <button className="text-white bg-customGreen py-1 px-6 rounded-sm shadow-buttonShadow" onClick={handleClose}>
            Retour
          </button>
        ) : (
          ''
        )}
      </div>
      {dayActive ? (
        <Picker setDayActive={setDayActive} register={register} />
      ) : (
        <DayRecord selectedProject={selectedProject} />
      )}
    </div>
  );
}

export default Calendar;
