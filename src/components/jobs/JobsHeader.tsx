import React from 'react';

function JobsHeader(): JSX.Element {
  return (
    <div className="px-3 py-3 bg-white dark:bg-component shadow-buttonShadow dark:shadow-mainShadow w-full">
      <h1 className="text-3xl font-bold">Gérer la liste de jobs</h1>
      <h2 className="sm:text-sm text-sm mt-1">
        Ici vous pourrez modifier la liste de selection des fonctions occupées (Cliquez sur le texte pour modifier un
        label)
      </h2>
    </div>
  );
}

export default JobsHeader;
