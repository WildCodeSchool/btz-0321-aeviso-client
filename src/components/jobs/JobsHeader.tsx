import React from 'react';
import { useHistory } from 'react-router-dom';

function JobsHeader(): JSX.Element {
  const history = useHistory();
  return (
    <div className="px-3 py-4 bg-white dark:bg-component shadow-buttonShadow dark:shadow-mainShadow w-full sm:sticky top-0">
      <div className=" flex w-full justify-between">
        <h1 className="text-3xl font-bold">Gérer la liste des fonctions</h1>
        <button
          onClick={() => history.goBack()}
          className="focus:outline-none w-28 h-8 sm:text-sm text-xs text-white bg-customGreen px-2 py-1 mt-5 sm:mt-0 sm:p-2 shadow-buttonShadow rounded-md flex justify-center items-center"
        >
          retour
        </button>
      </div>
      <h2 className="sm:text-sm text-sm mt-1">
        Ici vous pourrez modifier la liste de selection des fonctions occupées (Cliquez sur le texte pour modifier)
      </h2>
    </div>
  );
}

export default JobsHeader;
