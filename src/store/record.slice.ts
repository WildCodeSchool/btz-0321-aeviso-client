import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';

export interface RecordState {
  date: Date;
  projetId?: string;
  userId?: string;
  records: IRecord[];
}

// TODO: find the good dispatch types
interface ReturnUseRecordsFromStore {
  record: RecordState;
  dispatchSelectDate: (payload: Date) => {
    type: string;
    payload: Date;
  };
  dispatchConnectUser: (payload: string) => {
    type: string;
    payload: string;
  };
  dispatchConnectProject: (payload: string) => {
    type: string;
    payload: string;
  };
  dispatchCreateRecord: (payload: IRecord[]) => {
    type: string;
    payload: IRecord[];
  };
  dispatchDeleteRecord: (payload: string) => {
    type: string;
    payload: string;
  };
  dispatchAddRecord: (payload: IRecord) => {
    type: string;
    payload: IRecord;
  };
  dispatchResetState: () => {
    type: string;
  };
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
      return { ...state, date: action.payload };
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
    addRecord: (state, action: PayloadAction<IRecord>) => {
      state.records?.push(action.payload);
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      const index = state.records?.findIndex((record) => record.id === action.payload);
      state.records?.splice(index as number, 1);
    },
    resetState: () => initialState,
  },
});

export const { createRecord, addRecord, deleteRecord, selectDate, connectProject, connectUser, resetState } =
  recordSlice.actions;

export const useRecordFromStore = (): ReturnUseRecordsFromStore => {
  const record = useSelector((state: RootState) => state.record);
  const dispatch = useDispatch();
  const dispatchSelectDate = (payload: Date) => dispatch(selectDate(payload));
  const dispatchConnectUser = (payload: string) => dispatch(connectUser(payload));
  const dispatchConnectProject = (payload: string) => dispatch(connectProject(payload));
  const dispatchCreateRecord = (payload: IRecord[]) => dispatch(createRecord(payload));
  const dispatchAddRecord = (payload: IRecord) => dispatch(addRecord(payload));
  const dispatchDeleteRecord = (payload: string) => dispatch(deleteRecord(payload));
  const dispatchResetState = () => dispatch(resetState());
  return {
    record,
    dispatchSelectDate,
    dispatchConnectUser,
    dispatchConnectProject,
    dispatchCreateRecord,
    dispatchDeleteRecord,
    dispatchResetState,
    dispatchAddRecord,
  };
};

export default recordSlice.reducer;
