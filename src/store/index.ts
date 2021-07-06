import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import statsReducer from './stats.slice';
import userReducer from './user.slice';

export const store = configureStore({ reducer: { stats: statsReducer, user: userReducer }, devTools: true });

// Redux dependencies types

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
