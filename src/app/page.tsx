'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchWeather } from '@/store/slices/weatherSlice';
import { WeatherCard } from '@/components/weather/WeatherCard';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, isLoading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather('Kyiv'));
  }, [dispatch]);

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return <WeatherCard />;
}
