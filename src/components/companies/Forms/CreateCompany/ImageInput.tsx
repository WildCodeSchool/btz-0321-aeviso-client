import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { PhotographIcon } from '@heroicons/react/outline';

interface IProps {
  logo?: File[];
  register: UseFormRegister<FieldValues>;
  setValue: (name: string, value: unknown) => void;
  error?: string;
}

function ImageInput({ logo, register, setValue, error }: IProps): JSX.Element {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between sm:items-center">
      <label className="flex items-center">
        <div
          className="flex 
       bg-darkGray cursor-pointer"
        >
          {logo?.length ? (
            <img src={URL.createObjectURL(logo[0])} alt="Logo de l'entreprise" className="h-16" />
          ) : (
            <PhotographIcon className="h-16" />
          )}
        </div>
        <div className="flex flex-col items-start">
          <input type="file" accept="image/*" className="absolute w-0" {...register('logo')} />
          {"Logo de l'entreprise"}
          {error && <p className="text-red text-sm">{error}</p>}

          <button className="text-red-500" onClick={() => setValue('logo', undefined)}>
            Effacer le logo
          </button>
        </div>
      </label>
    </div>
  );
}

export default ImageInput;
