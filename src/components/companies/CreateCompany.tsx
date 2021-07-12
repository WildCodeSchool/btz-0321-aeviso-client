import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';

import { companies, jobs, user } from '../../API/requests';

import JobsInput from './Forms/CreateCompany/JobsInput';
import Spinner from '../Spinner';
import CompanyInputs from './Forms/CreateCompany/CompanyInputs';
import AdministratorInputs from './Forms/CreateAdministrator/AdministratorInputs';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import { useHistory, useParams } from 'react-router-dom';

interface IForm {
  company: ICompanyForm;
  user: IUserForm;
}

interface IProps {
  mutationFn: (variables: { companyData: ICompanyForm; id: string }) => Promise<Company>;
  mutationUs: (variables: { user: User; id: string }) => Promise<User>;
  data?: Company;
}

function CreateUpdateCompany({ mutationFn, mutationUs }: IProps): JSX.Element {
  const { isLoading, error, data: jobsData } = useQuery<Job[], AxiosError>('jobs', jobs.getAll);
  const { isModal, setIsModal, message, setMessage } = useModal();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { mutateAsync: mutateCompany } = useMutation<
    ICompanyForm,
    AxiosError,
    { companyData: ICompanyForm; id: string }
  >('companies', mutationFn);

  const { data: companyWithUsers } = useQuery<[Company, User[]]>(
    ['companies', id],
    () => Promise.all([companies.getOne(id), companies.getUsers(id, 'ADMIN')]),
    {
      onSuccess: ([company, [admin]]) => {
        setValue('company.name', company.name);
        setValue('user.firstName', admin.firstName);
        setValue('user.lastName', admin.lastName);
        setValue('user.email', admin.email);
        setValue('user.job', admin.jobId);
      },
    }
  );

  const { mutateAsync: mutateUser } = useMutation<User, AxiosError, { user: User; id: string }>('user', mutationUs, {
    onSuccess: () => {
      setMessage('Le client a bien été crée');
      setIsModal(true);
    },
  });

  const onSubmit = async (data: IForm) => {
    const user: User = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      password: data.user?.password,
      role: 'ADMIN',
      jobId: data.user.job as string,
    };

    const companyData: ICompanyForm = {
      id: data.company.id,
      name: data.company.name,
    };

    const newCompany = await mutateCompany({ companyData, id });

    await mutateUser({
      user: {
        ...user,
        companyId: newCompany.id,
      },
      id: companyWithUsers?.[1][0].id as string,
    });

    queryClient.removeQueries('companies');
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
        title="Le client a bien été créé ou modifié"
        buttons={
          !error
            ? [{ text: 'ok', handleClick: () => history.push('/aeviso') }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal(false) }]
        }
      >
        {message}
      </Modal>
    );
  }

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5 overflow-y-auto">
      <div className="flex w-full justify-between">
        <p className="text-2xl sm:text-5xl font-bold ">Créer un nouveau client</p>
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

export default CreateUpdateCompany;
