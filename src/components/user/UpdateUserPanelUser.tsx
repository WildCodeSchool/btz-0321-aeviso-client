import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { jobs, user } from '../../API/requests';
import Modal from '../Modal';
import useModal from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
import queryClient from '../../API/query-client';

interface Data {
  id: string | undefined;
  data: User;
}

interface UserIProps extends BaseIProps {
  userId: string;
  initFirstname: string;
  initLastname: string;
  initEmail: string;
  initJobId: string;
  initCompanyId?: string;
  initRole: 'USER' | 'ADMIN' | 'SUPERADMIN';
  initWeeklyBasis: 'h35' | 'h39';
}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  jobId: string;
  companyId?: string;
  role: 'USER' | 'ADMIN' | 'SUPERADMIN';
  weeklyBasis: 'h35' | 'h39';
  password: string;
}

function UpdateUserPanelUser(props: UserIProps | IFormInput): JSX.Element {
  const { initFirstname, initLastname, initEmail, initJobId, initCompanyId, initRole, initWeeklyBasis, userId } =
    props as UserIProps;

  const [userDetails, setUserDetails] = useState<User>({
    firstName: initFirstname,
    lastName: initLastname,
    email: initEmail,
    jobId: initJobId,
    companyId: initCompanyId,
    role: initRole,
    weeklyBasis: initWeeklyBasis,
    id: userId,
  });
  const { register, handleSubmit } = useForm();

  const [listOfJobs, setListOfJobs] = useState<SelectItem[]>([]);
  const { isModal, setIsModal, message, setMessage } = useModal();

  useQuery<Job[], AxiosError>('jobs', jobs.getAll, {
    onSuccess: (data) => {
      const jobs = data.map((job) => {
        return { value: job.id, text: job.label };
      });
      setListOfJobs(jobs);
    },
  });

  const { mutate, error } = useMutation<User, AxiosError, { id: string; user: User }>(user.update, {
    onSuccess: () => {
      setMessage('Utilisateur modifié');
      setIsModal((prevState) => !prevState);
      queryClient.refetchQueries(['users', initCompanyId]);
    },
    onError: () => {
      setMessage('Une erreur est survenue');
      setIsModal((prevState) => !prevState);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = ({
    firstName,
    lastName,
    email,
    jobId,
    companyId,
    role,
    weeklyBasis,
    password,
  }) => {
    const userDetails = {
      firstName,
      lastName,
      email,
      jobId,
      companyId,
      role,
      weeklyBasis,
      password,
    };
    mutate({ id: userId, user: userDetails });
  };

  const history = useHistory();

  const buttons = [
    {
      text: 'OK!',
      handleClick: () => {
        setIsModal((prevState) => !prevState);
        history.replace(`/clients/${userDetails.companyId}`);
      },
    },
  ];

  if (isModal) {
    return (
      <Modal title="Succès" buttons={buttons}>
        {message}
      </Modal>
    );
  }

  if (error) {
    return (
      <p>
        An error occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div>
      <h3 className="mb-6">Modification de l'Administrateur</h3>
      <div className="border border-black mb-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-firstname">
            <label>
              Prénom:
              <input className="text-black" defaultValue={userDetails.firstName} {...register('firstName')} />
            </label>
          </div>
          <div className="form-lastname">
            <label>
              Nom:
              <input className="text-black" defaultValue={userDetails.lastName} {...register('lastName')} />
            </label>
          </div>
          <div className="form-mail">
            <label>
              Email:
              <input className="text-black" defaultValue={userDetails.email} {...register('email')} />
            </label>
          </div>
          <div className="form-submit">
            <input type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserPanelUser;
