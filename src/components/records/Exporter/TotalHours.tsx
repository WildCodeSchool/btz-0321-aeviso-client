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
    <div className="w-full  bg-customGreen">
      <p>
        Nombre total d&apos;heures
        {users.reduce((acc, curr) => {
          return acc + curr.total;
        }, 0)}
      </p>
    </div>
  );
}

export default TotalHours;
