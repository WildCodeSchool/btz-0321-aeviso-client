import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useMutation } from 'react-query';
import { records } from '../../../API/requests';
import useModal from '../../../hooks/useModal';
import { useRecordFromStore } from '../../../store/record.slice';
import Modal from '../../Modal';

interface IProps {
  isActive: boolean;
  setValue: UseFormSetValue<FieldValues>;
  children: React.ReactNode;
  isTimeslot: 'morning' | 'afternoon' | 'fullday';
  value: 'morning' | 'afternoon' | 'fullday';
  recordId?: string;
}

function TimeSlotButton({ setValue, isActive, children, isTimeslot, value, recordId }: IProps): JSX.Element {
  const { dispatchDeleteRecord } = useRecordFromStore();
  const { isModal, setIsModal, message, setMessage } = useModal();

  const { mutate: deleteRecord } = useMutation(records.delete, {
    onSuccess: () => dispatchDeleteRecord(recordId as string),
    onError: () => {
      setMessage('Erreur lors de la suppession du rapport');
      setIsModal(true);
    },
  });

  if (isModal)
    return (
      <Modal
        title="Supression de rappport"
        buttons={[
          {
            text: 'Valider',
            handleClick: () => {
              setIsModal(false);
            },
          },
        ]}
      >
        {message}
      </Modal>
    );

  return (
    <div className="flex flex-col items-center m-4 sm:m-0 sm:mr-4">
      <label
        className={`text-black dark:text-white text-center rounded-lg px-12 py-4 w-full shadow-buttonShadow ${
          isTimeslot === value
            ? ' bg-customGreen text-white border border-black dark:border-white'
            : 'border border-black dark:border-white'
        } ${!isActive ? 'dark:text-gray-500 dark:border-gray-500' : 'hover:bg-customGreen'}`}
      >
        {children}
        <input
          className="hidden"
          type="button"
          onClick={() => setValue('timeslot', value)}
          id={value}
          value={value}
          disabled={!isActive}
        />
      </label>
      {!isActive && (
        <button className="rounded-lg mt-4 bg-customRed p-2" onClick={() => deleteRecord(recordId as string)}>
          Supprimer
        </button>
      )}
    </div>
  );
}

export default TimeSlotButton;
