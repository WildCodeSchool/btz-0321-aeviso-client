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
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-md shadow-buttonShadow dark:shadow-mainShadow overflow-y-auto">
      <div className="px-3 py-3 bg-white dark:bg-component shadow-buttonShadow dark:shadow-mainShadow sm:sticky top-0">
        <h1 className="text-2xl font-bold">Exporter un rapport</h1>
        <h2 className="sm:text-sm text-sm mt-1">{`Attention vous devez obligatoirement remplir tous les champs afin d'exporter un rapport`}</h2>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          const start = new Date(data.start);
          const end = new Date(data.end);
          
          if (start.getTime() < end.getTime()) {
            history.push(`/exporter/${data.company}/projets/${data.project}?start=${data.start}&end=${data.end}`);
          } else {
            history.push(`/exporter/${data.company}/projets/${data.project}?start=${data.end}&end=${data.start}`);
          }
        })}
        className="flex flex-col pb-2 mx-4"
        action="sumbit"
      >
        {userStore.role === 'SUPERADMIN' && <SelectCompany register={register} setValue={setValue} />}
        <SelectProject register={register} companyId={watch('company')} />
        <SelectDate register={register} />
        <input
          value="Exporter"
          type="submit"
          className="focus:outline-none sm:w-4/12 rounded-md mt-8 h-9 text-white shadow-buttonShadow px-4 py-1 mr-3 sm:mr-0 bg-customGreen"
        />
      </form>
    </div>
  );
}

export default ExportRecords;
