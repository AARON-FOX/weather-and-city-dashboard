'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Wind, Droplets, MapPin } from 'lucide-react';
import styles from './WeatherCard.module.scss';
import Image from 'next/image';

export const WeatherCard = () => {
  const { currentWeather, isLoading } = useSelector(
    (state: RootState) => state.weather
  );

  if (isLoading) {
    return <div className={styles.loader}>Loading weather...</div>;
  }

  if (!currentWeather) {
    return null;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`;

  return (
    <div className={styles.card}>
      <div className={styles.mainInfo}>
        <div className={styles.location}>
          <MapPin size={18} />
          <h2>{currentWeather.name}</h2>
        </div>

        <div className={styles.tempWrapper}>
          <Image
            src={iconUrl}
            alt={currentWeather.weather[0].description}
            width={120}
            height={120}
            priority
          />

          <span className={styles.temperature}>
            {Math.round(currentWeather.main.temp)}°C
          </span>
        </div>

        <p className={styles.description}>
          {currentWeather.weather[0].description}
        </p>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <Wind size={20} />
          <span>{currentWeather.wind.speed} m/s</span>
          <p>Wind Speed</p>
        </div>
        <div className={styles.detailItem}>
          <Droplets size={20} />
          <span>{currentWeather.main.humidity}%</span>
          <p>Humidity</p>
        </div>
      </div>
    </div>
  );
};
