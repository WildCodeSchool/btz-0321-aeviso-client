import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { user } from '../../../../API/requests';

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
  mutationUs: (variables: { user: User; id: string }) => Promise<User>;
}

function AdministratorCredentials({ register, errors, mutationUs }: IProps): JSX.Element {
  const [isMDP, setIsMPD] = useState(false);
  useEffect(() => {
    if (mutationUs === user.create) {
      setIsMPD(true);
    }
  }, []);

  return (
    <>
      <EmailInput
        label="Email de l'administrateur"
        placeholder="Email"
        register={register}
        name="user.email"
        required={true}
        error={errors?.user?.email && "Veuillez entrer le mnail de l'administrateur"}
      />
      {isMDP ? (
        <div>
          <PasswordInput
            label="Mot de passe"
            placeholder="Mot de passe"
            register={register}
            required={false}
            name="user.password"
            error={errors?.user?.password && 'Veuillez entrer un mot de passe'}
          />

          <PasswordInput
            label="Confirmation du mot de passe"
            placeholder="Confirmation"
            register={register}
            required={false}
            name="user.confirmPassword"
            error={errors?.user?.confirmPassword && 'Mot de passe different'}
          />
        </div>
      ) : (
        <button onClick={() => setIsMPD(true)} className="mt-5 underline">
          {"Modifier le mot de passe de l'administrateur"}
        </button>
      )}
    </>
  );
}

export default AdministratorCredentials;
