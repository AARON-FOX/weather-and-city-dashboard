'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchWeather } from '@/store/slices/weatherSlice';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, isLoading, error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather('Kyiv'));
  }, [dispatch]);

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      {currentWeather && (
        <section style={{ marginTop: '20px' }}>
          <h1>{currentWeather.name}</h1>
          <p style={{ fontSize: '24px' }}>
            {Math.round(currentWeather.main.temp)}°C
          </p>
          <p>{currentWeather.weather[0].description}</p>
        </section>
      )}
    </div>
  );
}
