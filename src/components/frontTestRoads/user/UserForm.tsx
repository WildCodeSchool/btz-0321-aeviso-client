import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import SelectInput from '../../formComponents/SelectInput';
import { AxiosError } from 'axios';
import { jobs } from '../../../API/requests';

interface BaseIProps {
  mutationFn: (variables: { user: User; id?: string }) => Promise<User>;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

interface UserIProps extends BaseIProps {
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

function userForm(props: UserIProps | BaseIProps): JSX.Element {
  const {
    initFirstname,
    initLastname,
    initEmail,
    initJobId,
    initCompanyId,
    initRole,
    initWeeklyBasis,
    mutationFn,
    setIsModal,
    setMessage,
  } = props as UserIProps;

  const [user, setUser] = useState<User>({
    firstName: initFirstname,
    lastName: initLastname,
    email: initEmail,
    jobId: initJobId,
    companyId: initCompanyId,
    role: initRole,
    weeklyBasis: initWeeklyBasis,
  });

  const [listOfJobs, setListOfJobs] = useState<SelectItem[]>([]);

  useQuery<Job[], AxiosError>('jobs', jobs.getAll, {
    onSuccess: (data) => {
      const jobs = data.map((job) => {
        return { value: job.id, text: job.label };
      });
      setListOfJobs(jobs);
    },
  });

  const { register, handleSubmit } = useForm();

  const { mutate, isLoading, error } = useMutation(mutationFn, {
    onSuccess: (data) => {
      setUser({
        ...data,
      });
      setMessage('Utilisateur correctement créé/ajouté');
      setIsModal((prevState) => !prevState);
    },
  });

  const { id } = useParams<{ id: string }>();

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
    const user = {
      firstName,
      lastName,
      email,
      jobId,
      companyId,
      role,
      weeklyBasis,
      password,
    };
    mutate({ user, id });
  };

  if (isLoading) return <p>Envoie dans la base de données</p>;
  if (error) return <p>Une erreur est survenue...</p>;

  return (
    <div>
      <h3 className="mb-6">Create User</h3>
      <div className="border border-black mb-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-lastname">
            <label>
              Nom
              <input defaultValue={user.lastName} {...register('lastName')} />
            </label>
          </div>
          <div className="form-firstname">
            <label>
              Prénom
              <input defaultValue={user.firstName} {...register('firstName')} />
            </label>
          </div>
          <div className="form-mail">
            <label>
              Email
              <input defaultValue={user.email} {...register('email')} />
            </label>
          </div>
          <SelectInput label="Fonction" name="jobId" register={register} items={listOfJobs} defaultValue={user.jobId} />
          <SelectInput
            label={`Droits d'accès:`}
            name="role"
            register={register}
            items={[
              { value: 'USER', text: 'Utilisateur' },
              { value: 'ADMIN', text: 'Administrateur' },
              { value: 'SUPERADMIN', text: 'Super Administrateur' },
            ]}
            defaultValue={user.role}
          />
          <SelectInput
            label={'Heures hebdomadaires'}
            name="weeklyBasis"
            register={register}
            items={[
              { value: 'h35', text: '35h' },
              { value: 'h39', text: '39h' },
            ]}
            defaultValue={user.weeklyBasis}
          />
          <div className="form-submit">
            <input type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default userForm;
