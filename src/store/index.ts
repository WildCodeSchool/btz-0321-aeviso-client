import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import statsReducer from './stats.slice';
import userReducer from './user.slice';
import darkmodeReducer from './darkmode.slice';
import recordReducer from './record.slice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: { user: userReducer, stats: statsReducer, darkMode: darkmodeReducer, record: recordReducer },
  devTools: true,
  middleware: customizedMiddleware,
});

// Redux dependencies types

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
