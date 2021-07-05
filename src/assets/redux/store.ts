import { createStore, compose } from 'redux';

export const actions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const initialState: { user: UserReduxState } = {
  user: {
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    role: undefined,
    logged: false,
  },
};

const reducer = (state = initialState, action: IReduxAction) => {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, user: action.payload };
    case actions.LOGOUT:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers());

export default store;

// Redux dependencies types

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
