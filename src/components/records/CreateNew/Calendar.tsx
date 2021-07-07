import React, { useState } from 'react';
import Picker from './Picker';
import DayRecord from './DayRecord';
import { useForm } from 'react-hook-form';

function Calendar(): JSX.Element {
  const { register, watch } = useForm();
  const selectedProject = watch('project');
  const [dayActive, setDayActive] = useState<boolean>(true);
  const [newDate, setNewDate] = useState(new Date());
  console.log(newDate);
  console.log(selectedProject);

  return (
    <div className="flex flex-col dark:bg-component bg-white border-2 dark:border-componentBorder h-full w-11/12 sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow sm:mx-0 mx-4 sm:px-10 overflow-y-auto">
      <h1 className="font-bold text-3xl sm:text-5xl mx-4 mt-3 sm:mt-10">Crée un nouveau rapport</h1>
      {dayActive ? (
        <Picker setDayActive={setDayActive} setNewDate={setNewDate} register={register} />
      ) : (
        <DayRecord selectedProject={selectedProject} newDate={newDate} setDayActive={setDayActive} />
      )}
    </div>
  );
}

export default Calendar;
