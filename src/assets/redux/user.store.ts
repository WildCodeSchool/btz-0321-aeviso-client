type UserSelection = {
  name: string;
  email: string;
  total: number;
};

interface Stats {
  selectedUsers: UserSelection[];
}

const initialState: Stats = {
  selectedUsers: [],
};

export const actions = {
  ADD_USER_TO_STATS: 'ADD_USER_TO_STATS',
};

const reducer = (state = initialState, action: IReduxAction<UserSelection>) => {
  switch (action.type) {
    case actions.ADD_USER_TO_STATS:
      return { ...state, selectedUsers: [...state.selectedUsers, action.payload] };
    default:
      return state;
  }
};

export default reducer;
