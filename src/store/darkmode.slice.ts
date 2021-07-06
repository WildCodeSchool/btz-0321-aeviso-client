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

export const darkModeSlice = createSlice({
  name: 'darkmode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      return { ...state, active: !state.active };
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export const useDarkModeFromStore = (): ReturnDarkModeFromStore => {
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const dispatch = useDispatch();
  const dispatchToggleDarkMode = () => dispatch(toggleDarkMode());
  return { darkMode, dispatchToggleDarkMode };
};

export default darkModeSlice.reducer;
