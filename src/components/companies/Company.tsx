import React, { useState } from 'react';
import InformationsCompany from './InformationsCompany';
import ProjectsCieAdmin from './ProjectsCieAdmin';
import { companies, user } from '../../API/requests';

import CreateCompany from './CreateUpdateCompany';

function Company(): JSX.Element {
  const [isCreatForm, setIsCreatForm] = useState<boolean>(false);
  return (
    <div className="grid sm:grid-cols-2  grid-cols-1 grid-rows-7 gap-3 sm:gap-5 h-full w-full">
      <div className="text-white  sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 row-start-1 row-end-2 h-96  sm:h-full bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <InformationsCompany />
      </div>
      <div className="text-white sm:col-start-1 sm:row-start-2 sm:row-end-5 col-start-1 row-start-2 row-end-3  h-96 sm:h-full bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <ProjectsCieAdmin />
      </div>
      <div className="text-white sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-5 row-start-3 row-end-7 h-96 sm:h-full col-start-1 bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        {isCreatForm}
        <CreateCompany
          mutationFn={companies.put}
          mutationUs={user.update}
          isCreatForm={isCreatForm}
          setIsCreatForm={setIsCreatForm}
        />
      </div>
    </div>
  );
}

export default Company;
