import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';

export interface RecordState {
  date?: Date;
  companyId?: string;
  userId?: string;
  records?: IRecord[];
}

interface ReturnUseRecordsFromStore {
  record: RecordState;
  dispatchCreateRecord: (payload: RecordState) => any; // TODO: find the good type
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
    createRecord: (state, action: PayloadAction<RecordState>) => {
      return { ...action.payload };
    },
    deleteRecord: () => initialState,
  },
});

export const { createRecord, deleteRecord } = recordSlice.actions;

export const useUserFromStore = (): ReturnUseRecordsFromStore => {
  const record = useSelector((state: RootState) => state.record);
  const dispatch = useDispatch();
  const dispatchCreateRecord = (payload: RecordState) => dispatch(createRecord(payload));
  const dispatchDeleteRecord = () => dispatch(deleteRecord());
  return { record, dispatchCreateRecord, dispatchDeleteRecord };
};

export default recordSlice.reducer;
