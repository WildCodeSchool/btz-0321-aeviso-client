import React from 'react';
import { Link } from 'react-router-dom';

function FormResult({ query }: { query: URLSearchParams }): JSX.Element {
  return (
    <div className="text-white bg-black w-screen h-screen p-10 z-50">
      <h1 className="text-5xl mb-10">Rapport du ... au .. </h1>
      <h1>{query.get('companyId')}</h1>
      <h1>{query.get('projectId')}</h1>
      <p></p>
      <p>{new Date(query.get('start') as string).toLocaleDateString()}</p>
      <p>{query.get('start')}</p>
      <p>Collaborateur/Profession/heuresDéclarés</p>
      <p>Total heures déclarer</p>
      <Link to="/">
        <button className="focus:outline-none mt-5 w-4/12 rounded-sm bg-blue">Retour</button>
      </Link>
    </div>
  );
}

export default FormResult;
