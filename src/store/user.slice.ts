import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '.';

interface UserState {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'USER' | 'ADMIN' | 'SUPERADMIN' | null;
  companyId?: string;
  logged: boolean;
}

const initialState: UserState = {
  logged: false,
};

export const userSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state = { ...action.payload, logged: true };
    },
    logout: () => initialState,
  },
});

export const { login, logout } = userSlice.actions;

interface ReturnUseUserFromStore {
  user: UserState;
  dispatchLogin: (payload: UserState) => any; // TODO: find the good type
  dispatchLogout: () => any;
}

export const useUserFromStore = (): ReturnUseUserFromStore => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const dispatchLogin = (payload: UserState) => dispatch(login(payload));
  const dispatchLogout = () => dispatch(logout());
  return { user, dispatchLogin, dispatchLogout };
};

export default userSlice.reducer;
