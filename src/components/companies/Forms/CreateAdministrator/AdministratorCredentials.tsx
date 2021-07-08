import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import EmailInput from '../CreateCompany/EmailInput';
import PasswordInput from '../CreateCompany/PasswordInput';

interface IProps {
  register: UseFormRegister<FieldValues>;
  errors: {
    user?: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    };
  };
}

function AdministratorCredentials({ register, errors }: IProps): JSX.Element {
  return (
    <>
      <EmailInput
        label="Mail de l'administrateur"
        placeholder="Nom"
        register={register}
        name="user.email"
        required={true}
        error={errors?.user?.email && "Veuillez entrer le mnail de l'administrateur"}
      />

      <PasswordInput
        label="Mot de passe"
        placeholder="Mot de passe"
        register={register}
        name="user.password"
        required={true}
        error={errors?.user?.password && 'Veuillez entrer un mot de passe'}
      />

      <PasswordInput
        label="Confirmation du mot de passe"
        placeholder="Confirmation"
        register={register}
        name="user.confirmPassword"
        required={true}
        error={errors?.user?.confirmPassword && 'Mot de passe different'}
      />
    </>
  );
}

export default AdministratorCredentials;
