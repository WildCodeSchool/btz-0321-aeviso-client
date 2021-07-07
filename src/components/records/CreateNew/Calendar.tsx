import React, { useState } from 'react';
import Picker from './Picker';
import DayRecord from './DayRecord';

function Calendar(): JSX.Element {
  const [dayActive, setDayActive] = useState<boolean>(true);
  const [newDate, setNewDate] = useState(new Date());
  console.log(newDate);

  return (
    <div className="flex flex-col dark:bg-component bg-white border-2 dark:border-componentBorder h-full w-11/12 sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow sm:mx-0 mx-4 sm:px-10 overflow-y-auto">
      {dayActive ? (
        <Picker setDayActive={setDayActive} setNewDate={setNewDate} />
      ) : (
        <DayRecord newDate={newDate} setDayActive={setDayActive} />
      )}
    </div>
  );
}

export default Calendar;
