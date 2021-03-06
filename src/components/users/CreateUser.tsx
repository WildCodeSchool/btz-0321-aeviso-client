import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from 'react-query';
import SelectInput from '../formComponents/SelectInput';
import { AxiosError } from 'axios';
import { user } from '../../API/requests';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserFromStore } from '../../store/user.slice';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import { useParams } from 'react-router-dom';
import PasswordFom from '../formComponents/PasswordFom';
import JobsInput from '../formComponents/JobsInput';
import Spinner from '../Spinner';

interface INewUser extends User {
  confirmPassword?: string;
}

interface IFromCreateUser {
  mutationFn: (variables: { user: User; id?: string }) => Promise<User>;
  setIsForm: Dispatch<SetStateAction<boolean>>;
}

function CreateNewUser({ mutationFn, setIsForm }: IFromCreateUser): JSX.Element {
  const { user: currentUser } = useUserFromStore();

  const { isModal, setIsModal, message, setMessage } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const { mutate, isLoading, error } = useMutation<User, AxiosError, { user: User; id?: string }>(mutationFn, {
    onSuccess: () => {
      setMessage('Utilisateur correctement créé/modifié');
      setIsModal(true);
    },
    onError: () => {
      setMessage('Erreur lors de la création du collaborateur');
      setIsModal(true);
    },
  });

  const { id } = useParams<{ id: string }>();

  if (id) {
    useQuery(['user', id], () => user.getOne(id), {
      onSuccess: (data) => {
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('email', data.email);
        setValue('jobId', data.jobId);
        setValue('weeklyBasis', data.weeklyBasis);
      },
    });
  }

  const onSubmit: SubmitHandler<INewUser> = (data: INewUser) => {
    if (data.password !== data.confirmPassword) {
      setError('password', { message: 'Les mots de passe ne correspondent pas' });
      return setError('confirmPassword', { message: 'Les mots de passe ne correspondent pas' });
    }
    delete data.confirmPassword;
    data.companyId = currentUser.companyId;
    mutate({ user: { ...data }, id });
  };

  if (isLoading) return <Spinner />;
  if (isModal)
    return (
      <Modal
        title="Créer un nouvel utilisateur"
        buttons={
          !error
            ? [{ text: 'Valider', handleClick: () => setIsModal(false) }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal(false) }]
        }
      >
        {message}
      </Modal>
    );

  return (
    <div
      className={
        mutationFn === user.update
          ? 'dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto p-5'
          : 'mx-4 sm:mx-0  sm:px-6 p-5 '
      }
    >
      <div className="flex w-full justify-between items-center">
        {mutationFn === user.update ? (
          <h3 className="text-xl sm:mt-2 mr-5 sm:text-2xl font-bold">Modifier un collaborateur</h3>
        ) : (
          <h3 className="text-xl sm:mt-2 mr-5 sm:text-2xl font-bold">Créer un nouveau collaborateur</h3>
        )}
        <button
          className="focus:outline-none text-white shadow-buttonShadow mt-5 w-full sm:w-3/12 sm:h-7 sm:rounded-md rounded-md bg-customGreen "
          onClick={() => {
            setIsForm(false);
          }}
        >
          Retour
        </button>
      </div>
      <form className="flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col">
          Nom
          <input
            className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-black dark:text-white rounded-sm py-1 sm:h-12 sm:rounded-md px-2"
            {...register('lastName')}
          />
        </label>
        <label className="flex flex-col mt-3 sm:mt-4">
          Prénom
          <input
            className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-black dark:text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            {...register('firstName')}
          />
        </label>

        <label className="flex flex-col mt-3 sm:mt-4">
          Email
          <input
            className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-black dark:text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            {...register('email')}
          />
        </label>

        <JobsInput register={register} setValue={setValue} />

        <SelectInput
          label={'Heures hebdomadaires'}
          name="weeklyBasis"
          register={register}
          items={[
            { value: 'h35', text: '35h' },
            { value: 'h39', text: '39h' },
          ]}
        />
        {mutationFn === user.create ? <PasswordFom register={register} error={errors} /> : ''}
        <button
          className="focus:outline-none text-white shadow-buttonShadow mt-5 sm:mt-7 w-full sm:w-4/12  sm:h-9 sm:rounded-md rounded-md bg-customGreen "
          type="submit"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default CreateNewUser;
