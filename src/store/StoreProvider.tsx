'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '.';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeManager } from '@/components/utils/ThemeManager';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeManager />
        {children}
      </PersistGate>
    </Provider>
  );
}
