import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';

interface UserState {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'USER' | 'ADMIN' | 'SUPERADMIN' | null;
  companyId?: string;
}

interface UserStateWithLogged extends UserState {
  logged: boolean;
}
interface ReturnUseUserFromStore {
  user: UserState;
  dispatchLogin: (payload: UserState) => any; // TODO: find the good type
  dispatchLogout: () => any;
}

const initialState: UserStateWithLogged = {
  logged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      return { ...action.payload, logged: true };
    },
    logout: () => initialState,
  },
});

export const { login, logout } = userSlice.actions;

export const useUserFromStore = (): ReturnUseUserFromStore => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const dispatchLogin = (payload: UserState) => dispatch(login(payload));
  const dispatchLogout = () => dispatch(logout());
  return { user, dispatchLogin, dispatchLogout };
};

export default userSlice.reducer;
