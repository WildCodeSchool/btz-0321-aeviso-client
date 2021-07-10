import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { jobs } from '../../API/requests';

import JobsInput from './Forms/CreateCompany/JobsInput';
import Spinner from '../Spinner';
import CompanyInputs from './Forms/CreateCompany/CompanyInputs';
import AdministratorInputs from './Forms/CreateAdministrator/AdministratorInputs';
import ImageInput from './Forms/CreateCompany/ImageInput';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import { useHistory } from 'react-router-dom';

interface IForm {
  company: ICompanyForm;
  user: IUserForm;
}

interface IProps {
  mutationFn: (variables: { userData: IUserForm; companyData: ICompanyForm; id: string }) => Promise<Company>;
  data?: Company;
}

function CreateCompany({ mutationFn, data }: IProps): JSX.Element {
  const { isLoading, error, data: jobsData } = useQuery<Job[], AxiosError>('jobs', jobs.getAll);
  const { isModal, setIsModal, message, setMessage } = useModal();
  const history = useHistory();

  const id = data?.id;

  const { mutate } = useMutation<IForm, { companyData: ICompanyForm; userData: IUserForm; id: string }>(
    'companies',
    mutationFn,
    {
      onSuccess: () => {
        setMessage('Le client à bien été crée');
        setIsModal(true);
      },
    }
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
      id,
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

  if (isModal) {
    return (
      <Modal
        title="Le client à bien été crée"
        buttons={
          !error
            ? [{ text: 'ok', handleClick: () => history.push('/clients') }]
            : [{ text: 'Nouvelle essai', handleClick: () => setIsModal(false) }]
        }
      >
        {message}
      </Modal>
    );
  }

  if (logo?.length) {
    logo[0].type.startsWith('image/') ? errors.logo && clearErrors('logo') : setLogoError();
  }

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5 overflow-y-auto">
      <div className="flex w-full justify-between">
        <p className="text-2xl sm:text-5xl font-bold ">Créer un nouveau client</p>
        <ImageInput logo={logo} register={register} setValue={setValue} />
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)} className="">
        <CompanyInputs register={register} errors={errors} />

        {jobsData && <JobsInput register={register} name={'user.job'} jobs={jobsData} />}

        <AdministratorInputs register={register} errors={errors} />

        <input
          type="submit"
          className="flex sm:w-2/12 w-full mt-5 text-sm sm:text-base text-white items-center bg-customGreen px-4 py-1 shadow-buttonShadow rounded-lg  sm:mx-0"
        />
      </form>
    </div>
  );
}

export default CreateCompany;
