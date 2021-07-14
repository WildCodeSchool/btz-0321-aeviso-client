import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import SelectCompany from './SelectCompany';
import SelectProject from './SelectProject';
import SelectDate from './SelectDate';
import { useUserFromStore } from '../../../store/user.slice';

function ExportRecords(): JSX.Element {
  const { user: userStore } = useUserFromStore();

  const { register, handleSubmit, watch, setValue } = useForm();
  const history = useHistory();

  useEffect(() => {
    if (userStore.role === 'ADMIN') setValue('company', userStore.companyId);
  }, []);

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5">
      <form
        onSubmit={handleSubmit((data) => {
          const start = new Date(data.start).toISOString();
          const end = new Date(data.end).toISOString();
          history.push(`/exporter/companies/${data.company}/projects/${data.project}?&start=${start}&end=${end}`);
        })}
        className="flex flex-col h-full pb-2"
        action="sumbit"
      >
        <h1 className="sm:text-5xl  text-3xl font-bold">Exporter un Rapport</h1>
        <h2 className="sm:text-base text-sm mb-5 sm:mb-10 mt-3">{`Attention vous devez obligatoirement remplir tous les champs afin d'exporter un rapport`}</h2>
        {userStore.role === 'SUPERADMIN' && <SelectCompany register={register} setValue={setValue} />}
        <SelectProject register={register} companyId={watch('company')} />
        <SelectDate register={register} />
        <input
          value="Exporter"
          type="submit"
          className="focus:outline-none text-white shadow-buttonShadow mt-10 w-12/12 sm:w-4/12 py-2 rounded-lg bg-customGreen "
        />
      </form>
    </div>
  );
}

export default ExportRecords;
