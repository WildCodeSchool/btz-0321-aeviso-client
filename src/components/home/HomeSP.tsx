import React from 'react';
import { today } from '../../assets/date';
import { Link } from 'react-router-dom';
import { useUserFromStore } from '../../store/user.slice';

function HomeSP(): JSX.Element {
  const { user } = useUserFromStore();
  return (
    <div className="p-5 h-full text-black dark:text-white">
      <h2 className="text-3xl font-bold">
        Bonjour Mr. {user.firstName} {user.lastName}
      </h2>
      <div className="flex items-center text-xl">
        <p className="text-lg mr-2">Nous sommes le</p>
        <p>{today()}</p>
      </div>
      <p className="text-2xl mb-10 font-bold mt-5">Pour exporter un rapport cliquez ici</p>
      <Link
        to="/records/export"
        className="p-2 text-white bg-customGreen rounded text-xs font-light shadow-buttonShadow"
      >
        Exporter un rapport
      </Link>
    </div>
  );
}

export default HomeSP;
