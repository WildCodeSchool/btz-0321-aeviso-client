import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';

interface DarkModeState {
  active: boolean;
}

interface ReturnDarkModeFromStore {
  darkMode: DarkModeState;
  dispatchToggleDarkMode: () => any; // TODO: find the good type
}

const initialState: DarkModeState = {
  active: false,
};

export const userSlice = createSlice({
  name: 'darkmode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      return { ...state, active: !state.active };
    },
  },
});

export const { toggleDarkMode } = userSlice.actions;

export const useDarkModeFromStore = (): ReturnDarkModeFromStore => {
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const dispatch = useDispatch();
  const dispatchToggleDarkMode = () => dispatch(toggleDarkMode());
  return { darkMode, dispatchToggleDarkMode };
};

export default userSlice.reducer;
