import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
