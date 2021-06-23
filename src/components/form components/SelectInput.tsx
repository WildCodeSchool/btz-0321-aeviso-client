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
    <div className={`form-${name}`}>
      <label>
        {label}
        <select defaultValue={defaultValue} {...register(name)}>
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
