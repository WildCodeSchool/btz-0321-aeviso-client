import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import statsSlice from './stats.slice';

export interface RecordState {
  date: Date;
  projetId?: string;
  userId?: string;
  records?: IRecord[];
}

interface ReturnUseRecordsFromStore {
  record: RecordState;
  dispatchSelectDate: (payload: Date) => any;
  dispatchConnectUser: (payload: string) => any;
  dispatchConnectProject: (payload: string) => any;
  dispatchCreateRecord: (payload: IRecord[]) => any; // TODO: find the good type
  dispatchDeleteRecord: () => any;
}

const initialState: RecordState = {
  date: new Date(),
  records: [],
};

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    selectDate: (state, action: PayloadAction<Date>) => {
      return { ...statsSlice, date: action.payload };
    },
    connectUser: (state, action: PayloadAction<string>) => {
      {
        return { ...state, userId: action.payload };
      }
    },
    connectProject: (state, action: PayloadAction<string>) => {
      {
        return { ...state, projetId: action.payload };
      }
    },
    createRecord: (state, action: PayloadAction<IRecord[]>) => {
      return { ...state, records: action.payload };
    },
    deleteRecord: () => initialState,
  },
});

export const { createRecord, deleteRecord, selectDate, connectProject, connectUser } = recordSlice.actions;

export const useRecordFromStore = (): ReturnUseRecordsFromStore => {
  const record = useSelector((state: RootState) => state.record);
  const dispatch = useDispatch();
  const dispatchSelectDate = (payload: Date) => dispatch(selectDate(payload));
  const dispatchConnectUser = (payload: string) => dispatch(connectUser(payload));
  const dispatchConnectProject = (payload: string) => dispatch(connectProject(payload));
  const dispatchCreateRecord = (payload: IRecord[]) => dispatch(createRecord(payload));
  const dispatchDeleteRecord = () => dispatch(deleteRecord());
  return {
    record,
    dispatchSelectDate,
    dispatchConnectUser,
    dispatchConnectProject,
    dispatchCreateRecord,
    dispatchDeleteRecord,
  };
};

export default recordSlice.reducer;
