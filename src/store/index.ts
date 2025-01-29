import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app';
import userReducer from './user';
import gameReducer from './game';
import { useReducer } from 'react';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        user: userReducer,
        app: appReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;