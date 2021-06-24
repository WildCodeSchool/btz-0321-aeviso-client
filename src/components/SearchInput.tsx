import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<FieldValues>;
  name: string;
}

function SearchInput({ register, name }: IProps): JSX.Element {
  return (
    <input
      type="text"
      placeholder="Rechercher"
      className="p-2 bg-transparent border border-white rounded-md focus:ring focus:ring-white"
      {...register(name)}
    />
  );
}

export default SearchInput;
