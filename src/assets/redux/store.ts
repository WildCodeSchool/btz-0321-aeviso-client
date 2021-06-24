import { createStore } from 'redux';

const actions = {
  LOGIN: 'LOGIN',
};

const initialState: { user: UserReduxState } = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'USER',
    logged: false,
  },
};

const reducer = (state = initialState, action: IReduxAction) => {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
