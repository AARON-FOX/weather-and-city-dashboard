import { configureStore } from '@reduxjs/toolkit';
import settingsReduces from './slices/settingsSlice';
import weatherReducer from './slices/weatherSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      settings: settingsReduces,
      weather: weatherReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
