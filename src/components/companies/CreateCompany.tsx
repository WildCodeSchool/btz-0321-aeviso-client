import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { companies, jobs } from '../../API/requests';

import JobsInput from './Forms/CreateCompany/JobsInput';
import Spinner from '../Spinner';
import CompanyInputs from './Forms/CreateCompany/CompanyInputs';
import AdministratorInputs from './Forms/CreateAdministrator/AdministratorInputs';
import ImageInput from './Forms/CreateCompany/ImageInput';

interface IForm {
  company: ICompanyForm;
  user: IUserForm;
}

function CreateCompany(): JSX.Element {
  const { isLoading, error, data: jobsData } = useQuery<Job[], AxiosError>('jobs', jobs.getAll);

  const { mutate } = useMutation<User, AxiosError, { companyData: ICompanyForm; userData: IUserForm }>(
    'companies',
    companies.post
  );

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm();

  const logo = watch('logo');

  const onSubmit = (data: IForm) => {
    const companyData: ICompanyForm = {
      name: data.company.name,
    };

    const userData: IUserForm = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      password: data.user.password,
      role: 'ADMIN',
      jobId: data.user.job as string,
    };

    mutate({
      companyData,
      userData,
    });
  };

  const setLogoError = (): void => {
    setValue('logo', undefined);
    setError('logo', { message: 'Le fichier doit etre une image valide' });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        Error message: {error.message}. Code: {error.code}
      </p>
    );
  }

  if (logo?.length) {
    logo[0].type.startsWith('image/') ? errors.logo && clearErrors('logo') : setLogoError();
  }

  return (
    <div className="px-4 min-h-full bg-black text-white rounded-xl">
      <p className="text-xl">Créer un nouveau client</p>

      <form action="" onSubmit={handleSubmit(onSubmit)} className="">
        <CompanyInputs register={register} errors={errors} />

        <ImageInput logo={logo} register={register} setValue={setValue} />

        {jobsData && <JobsInput register={register} name={'user.job'} jobs={jobsData} />}

        <AdministratorInputs register={register} errors={errors} />

        <input type="submit" className="cursor-pointer" />
      </form>
    </div>
  );
}

export default CreateCompany;
