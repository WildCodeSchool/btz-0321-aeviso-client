import React, { useState } from 'react';
import Picker from './Picker';
import DayRecord from './DayRecord';

function App(): JSX.Element {
  const [dayActive, setDayActive] = useState<boolean>(true);
  const [newDate, setNewDate] = useState(new Date());
  console.log(newDate);
  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5">
      <h1 className="text-white mb-5 text-2xl font-bold">React Calendar</h1>
      {dayActive ? (
        <Picker setDayActive={setDayActive} setNewDate={setNewDate} />
      ) : (
        <DayRecord newDate={newDate} setDayActive={setDayActive} />
      )}
    </div>
  );
}

export default App;
