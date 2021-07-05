import React from 'react';
import { connect } from 'react-redux';
import store from '../assets/redux/store';
import { actions } from '../assets/redux/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { auth } from '../API/requests';
import Modal from '../components/Modal';
import useModal from '../Hook/useModal';
import { useHistory } from 'react-router';
import Spinner from '../components/Spinner';

interface IFormInput {
  email: string;
  password: string;
}

function HomePage(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { isModal, setIsModal, message, setMessage } = useModal();

  const { mutate, isLoading, isError } = useMutation(auth.login, {
    onError: () => {
      setMessage('Une erreur est survenue');
      setIsModal((prevState) => !prevState);
    },
    onSuccess: (data) => {
      setMessage('Vous êtes bien authentifié');
      setIsModal((prevState) => !prevState);
      const { user } = data;
      store.dispatch({
        type: actions.LOGIN,
        payload: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
          logged: true,
        },
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    const user = {
      email,
      password,
    };
    mutate(user);
  };

  if (isLoading) return <Spinner />;
  if (isModal)
    return (
      <Modal
        title="Authentification"
        buttons={
          isError
            ? [{ text: 'Nouvel essai', handleClick: () => setIsModal((prevState) => !prevState) }]
            : [{ text: 'Accueil', handleClick: () => history.push('/aeviso') }]
        }
      >
        {message}
      </Modal>
    );

  return (
    <div className="h-full w-full sm:w-screen sm:h-screen flex flex-col justify-center items-center bg-bgImg bg-center bg-cover absolute top-0 right-0">
      <div className="text-white font-roboto flex items-center sm:items-center  flex-col">
        <h1 className="sm:text-9xl text-8xl font-bold">AeViso</h1>
        <h2 className="sm:text-4xl text-2xl">Expert Comptable.Audit.Conseil</h2>
      </div>
      <form
        className="w-full flex sm:w-6/12 justify-center mt-10 items-center sm:items-center flex-col text-white font-roboto text-xl sm:text-2xl"
        onSubmit={handleSubmit(onSubmit)}
        action="login"
      >
        <label className="mt-5" htmlFor="email">
          Email
        </label>
        <input
          className=" focus:outline-none bg-white bg-opacity-0 mt-2 mb-5 px-3 w-11/12 h-12 border-b border-white shadow-inputShadow"
          type="text"
          {...register('email', { required: true })}
        />
        <label className="mt-5" htmlFor="Password">
          Mots de passe{' '}
        </label>
        <input
          className="focus:outline-none bg-white bg-opacity-0 mt-2 px-3 w-11/12 h-12 border-b border-white shadow-inputShadow"
          type="password"
          {...register('password', { required: true })}
        />
        <input className="bg-customGreen py-1 rounded-lg w-11/12 mt-16 shadow-inputShadow" type="submit" />
      </form>
    </div>
  );
}

export default connect()(HomePage);
