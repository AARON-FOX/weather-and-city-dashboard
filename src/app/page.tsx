'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchWeatherAndForecast } from '@/store/slices/weatherSlice';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { Forecast } from '@/components/features/Forecast/Forecast';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    if (!currentWeather) {
      dispatch(fetchWeatherAndForecast('Kyiv'));
    }
  }, [dispatch, currentWeather]);

  return (
    <div className="home-page">
      <WeatherCard />
      <Forecast />
    </div>
  );
}
