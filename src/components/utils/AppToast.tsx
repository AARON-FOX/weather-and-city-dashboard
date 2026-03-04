'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppToast = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      theme={theme === 'dark' ? 'dark' : 'light'}
      pauseOnFocusLoss={false}
    />
  );
};
