import React, { Dispatch, SetStateAction, useState } from 'react';

interface IDayRecord {
  newDate: Date;
  setDayActive: Dispatch<SetStateAction<boolean>>;
}
function DayRecord({ newDate, setDayActive }: IDayRecord): JSX.Element {
  const [timeSlote, setTimeSlote] = useState('');
  const [comment, setComment] = useState<string>();
  const [isMatin, setIsMatin] = useState('text-white border border-white rounded-xl px-12 py-4 hover:bg-darkGreen');
  const [isAp, setIsAp] = useState('text-white border border-white rounded-xl px-12 py-4 ml-5 hover:bg-darkGreen');
  const [isAllDay, setIsAllDay] = useState(
    'text-white border border-white rounded-xl px-12 py-4 ml-5 hover:bg-darkGreen'
  );

  const handleMatin = () => {
    setTimeSlote('Matin');
    setIsMatin('text-white rounded-xl px-12 py-4 bg-darkGreen');
  };

  const handleAp = () => {
    setTimeSlote('Après-midi');
    setIsAp('text-white rounded-xl px-12 py-4 ml-5 bg-darkGreen');
  };

  const handleAllDay = () => {
    setTimeSlote('Journée entière');
    setIsAllDay('text-white rounded-xl px-12 py-4 ml-5 bg-darkGreen');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const Data = {
    date: newDate,
    timSlote: timeSlote,
    comment: comment,
  };

  const handleClick = () => {
    console.log(Data);
    setDayActive(true);
  };

  return (
    <div className=" w-8/12 bg-black p-5 shadow-shad rounded-xl">
      <div className="flex justify-between">
        <h1 className="text-white font-bold text-2xl">Projet.name</h1>
        <h1 className="text-white">{newDate.toLocaleDateString()}</h1>
      </div>

      <div className="mt-10 flex">
        <button onClick={handleMatin} className={isMatin}>
          Matin
        </button>
        <button onClick={handleAp} className={isAp}>
          Après-midi
        </button>
        <button onClick={handleAllDay} className={isAllDay}>
          Journée entière
        </button>
      </div>

      <div className="mt-10">
        <form className="flex flex-col" action="">
          <label htmlFor="text" className="text-white text-xl">
            Comment
          </label>
          <textarea onChange={handleChange} className="text-white bg-gray-400 rounded-xl mt-2 h-32 p-3" />
        </form>
      </div>
      <button
        onClick={handleClick}
        className="text-white border border-white rounded-lg  px-12 py-2 hover:bg-blue-300 mt-5 bg-darkGreen "
      >
        Valider
      </button>
    </div>
  );
}

export default DayRecord;
