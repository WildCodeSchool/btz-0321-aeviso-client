import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import TextInput from '../CreateCompany/TextInput';

interface IProps {
  register: UseFormRegister<FieldValues>;
  errors: {
    user?: {
      lastName?: string;
      firstName?: string;
    };
  };
}

function AdministratorIdentity({ register, errors }: IProps): JSX.Element {
  return (
    <>
      <TextInput
        label="Nom de l'administrateur"
        placeholder="Nom"
        register={register}
        name="user.lastName"
        required={true}
        error={errors?.user?.lastName && "Veuillez entrer le nom de l'administrateur"}
      />

      <TextInput
        label="Prenom de l'administrateur"
        placeholder="Prenom"
        register={register}
        name="user.firstName"
        required={true}
        error={errors?.user?.firstName && "Veuillez entrer le prenom de l'administrateur"}
      />
    </>
  );
}

export default AdministratorIdentity;
