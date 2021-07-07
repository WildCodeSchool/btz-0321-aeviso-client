import React from 'react';
import TextInput from './CreateCompany/TextInput';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<FieldValues>;
  errors: {
    company?: {
      name?: string;
      status?: string;
    };
  };
}

function CompanyInputs({ register, errors }: IProps): JSX.Element {
  return (
    <div>
      <TextInput
        label="Nom de l'entreprise"
        placeholder="Nom"
        register={register}
        name="company.name"
        required={true}
        error={errors?.company?.name && "Veuillez entrer le nom de l'entreprise"}
      />
      <TextInput
        label="Statut de l'entreprise"
        placeholder="Statut"
        register={register}
        name="company.status"
        required={true}
        error={errors?.company?.status && "Veuillez entrer le statut de l'entreprise"}
      />
    </div>
  );
}

export default CompanyInputs;
