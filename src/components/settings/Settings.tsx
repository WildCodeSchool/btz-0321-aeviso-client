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

interface ISettingsForm extends Omit<IUserForm, 'role' | 'password'> {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface IFormInput {
  user: ISettingsForm;
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
    setValue,
    setError,
  } = useForm();

  setValue('user.firstName', userFromStore.firstName);
  setValue('user.lastName', userFromStore.lastName);
  setValue('user.email', userFromStore.email);

  const {
    mutateAsync: userMutate,
    isLoading,
    error,
  } = useMutation<User, AxiosError, { user: User; id: string }>('user', user.updateSelf, {
    onSuccess: (data) => {
      dispatchUser(data);
    },
  });

  const { mutateAsync: passwordMutate } = useMutation<User, AxiosError, { oldPassword: string; newPassword: string }>(
    'user',
    user.updatePassword,
    {
      onSuccess: (data) => {
        setMessage('Les données ont bien été modifiées');
        setIsModal(true);
        dispatchUser(data);
      },
      onError: () => setError('user.oldPassword', { message: "L'ancien mot de passe est incorrect." }),
    }
  );

  const onSubmit = async (data: IFormInput) => {
    const user: User = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      jobId: data.user.jobId,
    };

    const { oldPassword, newPassword, confirmPassword } = data.user;

    if (oldPassword === newPassword) {
      setError('user.newPassword', { message: "Le nouveau mot de passe est simlaire à l'ancien" });
    } else if (newPassword !== confirmPassword) {
      setError('user.confirmPassword', { message: 'Les deux mots de passes sont identiques' });
    } else {
      await passwordMutate({
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      setMessage('Les données ont bien été modifiées');
      setIsModal(true);
    }

    await userMutate({
      user,
      id: userFromStore.id as string,
    });
  };
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  sm:px-5 p-5 overflow-y-auto">
      {isModal && (
        <Modal
          title="Vos données ont bien été modifiées"
          buttons={
            !error
              ? [{ text: 'Valider', handleClick: () => history.push('/') }]
              : [{ text: 'Nouvel essai', handleClick: () => setIsModal(false) }]
          }
        >
          {message}
        </Modal>
      )}
      <h1 className="sm:text-4xl  text-3xl font-bold">Réglages</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-base mt-2">Modifier vos informations personnelles</p>
        <div>
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
            label="Email"
            placeholder="Email"
            register={register}
            name="user.email"
            required={false}
            error={errors?.user?.email && "Veuillez entrer l'email de l'administrateur"}
          />

          <PasswordInput
            label="Ancien mot de passe"
            placeholder="Ancien mot de passe"
            register={register}
            name="user.oldPassword"
            required={false}
            error={
              (
                {
                  required: 'Veuillez entrer votre ancien mot de passe',
                  pattern: 'Règle: une lettre majuscule, une lettre minuscule, un chiffre',
                } as { [key: string]: string }
              )[errors?.user?.oldPassword?.type] ?? errors?.user?.oldPassword?.message
            }
          />
          <div className="flex flex-col sm:flex-row w-full justify-between">
            <div className="sm:w-5/12 w-full">
              <PasswordInput
                label="Mot de passe"
                placeholder="Mot de passe"
                register={register}
                name="user.newPassword"
                required={false}
                error={
                  errors?.user?.newPassword?.type === 'pattern'
                    ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
                    : errors?.user?.newPassword?.message
                }
              />
            </div>
            <div className="sm:w-6/12 w-full">
              <PasswordInput
                label="Confirmation du mot de passe"
                placeholder="Confirmation de votre mot de passe"
                register={register}
                name="user.confirmPassword"
                required={false}
                error={
                  errors?.user?.confirmPassword?.type === 'pattern'
                    ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
                    : errors?.user?.confirmPassword?.message
                }
              />
            </div>
          </div>
        </div>
        <div className="form-submit">
          <input
            type="submit"
            value="Valider"
            className="focus:outline-none sm:w-4/12 w-full rounded-md mt-8 h-9 text-white shadow-buttonShadow px-4 py-1 mr-3 sm:mr-0 bg-customGreen"
          />
        </div>
      </form>
    </div>
  );
}

export default ExportRecords;
