import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '.';

type UserSelection = {
  name: string;
  email: string;
  total: number;
};

interface StatsState {
  selectedUsers: UserSelection[];
}

const initialState: StatsState = {
  selectedUsers: [],
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserSelection>) => {
      state.selectedUsers.push(action.payload);
    },
  },
});

export const { addUser } = statsSlice.actions;

export const useStats = (): UserSelection[] => {
  const users = useSelector((state: RootState) => state.stats.selectedUsers);
  return users;
};

export default statsSlice.reducer;
