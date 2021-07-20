import React from 'react';
import { FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';

import AdministratorIdentity from './AdministratorIdentity';
import AdministratorCredentials from './AdministratorCredentials';

interface IProps {
  register: UseFormRegister<FieldValues>;
  errors: {
    user?: {
      lastName?: string;
      firstName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    };
  };
  mutationUs: (variables: { user: User; id: string }) => Promise<User>;
}

function AdministratorInputs({ register, errors, mutationUs }: IProps): JSX.Element {
  return (
    <>
      <AdministratorIdentity register={register} errors={errors} />
      <AdministratorCredentials mutationUs={mutationUs} register={register} errors={errors} />
    </>
  );
}

export default AdministratorInputs;
