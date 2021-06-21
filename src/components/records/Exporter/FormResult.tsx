import React from 'react';
import { Link } from 'react-router-dom';

function FormResult(): JSX.Element {
  return (
    <div className="text-white bg-black w-screen h-screen p-10 z-50">
      <h1 className="text-5xl mb-10">Rapport du ... au .. </h1>
      <h1>Startup.name</h1>
      <h1>Project.name</h1>
      <p>date de départ</p>
      <p>date de fin</p>
      <p>Collaborateur/Profession/heuresDéclarés</p>
      <p>Total heures déclarer</p>
      <Link to="/">
        <button className="focus:outline-none mt-5 w-4/12 rounded-sm bg-blue">Retour</button>
      </Link>
    </div>
  );
}

export default FormResult;
