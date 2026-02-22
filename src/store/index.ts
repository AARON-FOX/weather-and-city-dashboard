import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import settingsReduces from './slices/settingsSlice';
import weatherReducer from './slices/weatherSlice';
import favoritesReduces from './slices/favoritesSlice';

const rootReducer = combineReducers({
  settings: settingsReduces,
  weather: weatherReducer,
  favorites: favoritesReduces,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'favorites'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER, PURGE, REGISTER],
        },
      }),
  });

  return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
