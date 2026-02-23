'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ToastContainer } from 'react-toastify';

export const ThemeManager = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      theme={theme === 'dark' ? 'dark' : 'light'}
      pauseOnFocusLoss={false}
    />
  );
};
