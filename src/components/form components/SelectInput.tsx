import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface iProps {
  register: UseFormRegister<FieldValues>;
  items: SelectItem[];
  name: string;
  label: string;
  defaultValue?: string;
}

function SelectInput({ register, items, name, label, defaultValue }: iProps): JSX.Element {
  return (
    <div>
      <label className="flex flex-col mt-3">
        {label}
        <select
          className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
          defaultValue={defaultValue}
          {...register(name)}
        >
          <option value="">Choisir</option>
          {items.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
export default SelectInput;
