import React, { useEffect } from 'react';
import { calculateTotalHours } from '../../../assets/exportToCsv';
import { useStats } from '../../../store/stats.slice';

function TotalHours(): JSX.Element {
  const { users, dispatchReset } = useStats();

  useEffect(() => {
    return () => {
      dispatchReset();
    };
  }, []);
  return (
    <div className="w-full text-white h-4 flex items-center justify-between px-2 sm:px-4 py-6 rounded-b-lg  bg-customGreen">
      <h1 className="sm:text-lg">Nombre total d&apos;heures</h1>
      <p className="font-bold">{calculateTotalHours(users)} Heures</p>
    </div>
  );
}

export default TotalHours;
