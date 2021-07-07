import React, { useEffect } from 'react';
import { useStats } from '../../../store/stats.slice';

function TotalHours(): JSX.Element {
  const { users, dispatchReset } = useStats();

  useEffect(() => {
    return () => {
      dispatchReset();
    };
  }, []);
  return (
    <div className="w-full text-white h-10 mt-5 sm:mt-10 flex items-center justify-between px-2 sm:px-4 rounded-b-lg  bg-customGreen">
      <h1>Nombre total d&apos;heures</h1>
      <p>
        {users.reduce((acc, curr) => {
          return acc + curr.total;
        }, 0)}{' '}
        Heures
      </p>
    </div>
  );
}

export default TotalHours;
