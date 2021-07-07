import React, { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

interface IPicker {
  setDayActive: Dispatch<SetStateAction<boolean>>;
  setNewDate: Dispatch<SetStateAction<Date>>;
}

function Picker({ setDayActive, setNewDate }: IPicker): JSX.Element {
  const handleChange = (date) => {
    setNewDate(date);
    setDayActive(false);
  };

  return (
    <div className="flex p-10 shadow-shad w-5/12 bg-black  rounded-xl">
      <Calendar onChange={handleChange} />
    </div>
  );
}

export default Picker;
