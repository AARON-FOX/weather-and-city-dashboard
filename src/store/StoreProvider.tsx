'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '.';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeManager } from '@/components/utils/ThemeManager';
import { AppToast } from '@/components/utils/AppToast';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeManager />
        <AppToast />
        {children}
      </PersistGate>
    </Provider>
  );
}
