import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  required: boolean;
  error?: string;
}

function TextInput({ label, placeholder, register, name, required = false, error }: IProps): JSX.Element {
  return (
    <label className="flex flex-col mt-2 font-bold">
      {label}
      <input
        type="text"
        placeholder={placeholder}
        {...register(name, { required })}
        className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
      />
      <p className="text-red text-s">{error}</p>
    </label>
  );
}

export default TextInput;
