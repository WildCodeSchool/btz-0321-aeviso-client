import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { records } from '../../../API/requests';
import { useRecordContext } from '../../../Contexts/Record.context';

interface IProps {
  active: boolean;
  setValue: UseFormSetValue<FieldValues>;
  children: React.ReactNode;
  isTimeslot: 'morning' | 'afternoon' | 'fullday';
  value: 'morning' | 'afternoon' | 'fullday';
  recordId?: string;
}

function TimeSlotButton({ setValue, active, children, isTimeslot, value, recordId }: IProps): JSX.Element {
  const { refetchQueries } = useQueryClient();

  const { date } = useRecordContext();
  const { mutate: deleteRecord } = useMutation(records.delete, {
    onSuccess: () => refetchQueries(['records', date]),
  });

  return (
    <>
      <label
        className={`text-black dark:text-white text-center rounded-xl px-12 py-4 ${
          isTimeslot === value ? ' bg-customGreen text-white' : 'border border-black dark:border-white'
        } ${!active ? 'text-gray-500' : 'hover:bg-customGreen'}`}
      >
        {children}
        <input
          className="hidden"
          type="button"
          onClick={() => setValue('timeslot', value)}
          id={value}
          value={value}
          disabled={!active}
        />
      </label>
      {!active && <button onClick={() => deleteRecord(recordId as string)}>Supprimer</button>}
    </>
  );
}

export default TimeSlotButton;
