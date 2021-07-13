import React from 'react';
import TextInput from '../companies/Forms/CreateCompany/TextInput';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { user } from '../../API/requests';
import { useMutation } from 'react-query';
import { useUserFromStore } from '../../store/user.slice';
import Spinner from '../Spinner';
import EmailInput from '../companies/Forms/CreateCompany/EmailInput';
import PasswordInput from '../companies/Forms/CreateCompany/PasswordInput';
import Modal from '../Modal';
import useModal from '../../hooks/useModal';

interface IFormInput {
  user: IUserForm;
  id: string;
}

function ExportRecords(): JSX.Element {
  const { user: userFromStore, dispatchUser } = useUserFromStore();
  const { isModal, setIsModal, message, setMessage } = useModal();
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    mutateAsync: mutateUser,
    isLoading,
    error,
  } = useMutation<User, AxiosError, { user: User; id: string }>('user', user.update, {
    onSuccess: (data) => {
      setMessage('Le client a bien été modifié');
      setIsModal(true);
      dispatchUser(data);
    },
  });

  const onSubmit = async (data: IFormInput) => {
    const user: User = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      password: data.user.password,
      jobId: data.user.jobId,
    };
    await mutateUser({
      user: { ...user },
      id: userFromStore.id as string,
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  if (isModal) {
    return (
      <Modal
        title="Vos données ont bien été modifiées"
        buttons={
          !error
            ? [{ text: 'Ok', handleClick: () => history.push('/aeviso') }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal(false) }]
        }
      >
        {message}
      </Modal>
    );
  }

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-10 p-5">
      <h1 className="sm:text-5xl  text-3xl font-bold">Réglages</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>Modifier le nom et prénom</p>
          <TextInput
            label="Nom"
            placeholder="Nom"
            register={register}
            name="user.lastName"
            required={false}
            error={errors?.user?.lastName && 'Veuillez entrer le nom à modifier'}
          />
          <TextInput
            label="Prénom"
            placeholder="Prénom"
            register={register}
            name="user.firstName"
            required={false}
            error={errors?.user?.firstName && 'Veuillez entrer le prénom à modifier'}
          />
        </div>

        <div>
          <EmailInput
            label="Mail de l'administrateur"
            placeholder="Nom"
            register={register}
            name="user.email"
            required={false}
            error={errors?.user?.email && "Veuillez entrer l'email de l'administrateur"}
          />

          <PasswordInput
            label="Mot de passe"
            placeholder="Mot de passe"
            register={register}
            name="user.password"
            required={false}
            error={errors?.user?.password && 'Veuillez entrer un mot de passe'}
          />

          <PasswordInput
            label="Confirmation du mot de passe"
            placeholder="Confirmation"
            register={register}
            name="user.confirmPassword"
            required={false}
            error={errors?.user?.confirmPassword && 'Mot de passe different'}
          />
        </div>
        <div className="form-submit">
          <input type="submit" value="Envoyer" className="text-blue-600" />
        </div>
      </form>
    </div>
  );
}

export default ExportRecords;
