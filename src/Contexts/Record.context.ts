import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface IRecordContext {
  date: Date;
  setDate?: Dispatch<SetStateAction<Date>>;
}

const RecordContext = createContext<IRecordContext>({ date: new Date() });

export const useRecordContext = (): IRecordContext => useContext(RecordContext);

export default RecordContext;
