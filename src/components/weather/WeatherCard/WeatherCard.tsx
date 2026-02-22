'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Wind, Droplets, MapPin, Heart } from 'lucide-react';
import styles from './WeatherCard.module.scss';
import Image from 'next/image';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

export const WeatherCard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { currentWeather, isLoading } = useSelector(
    (state: RootState) => state.weather
  );
  const favorites = useSelector((state: RootState) => state.favorites.items);

  if (isLoading) {
    return <div className={styles.loader}>Loading weather...</div>;
  }

  if (!currentWeather) {
    return null;
  }

  const isFavorite = favorites.includes(currentWeather.name);

  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`;

  return (
    <div className={styles.card}>
      <div className={styles.mainInfo}>

        <div className={styles.locationWrapper}>
          <div className={styles.location}>
            <MapPin size={18} />
            <h2>{currentWeather.name}</h2>
          </div>

          <button
            className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
            onClick={() => dispatch(toggleFavorite(currentWeather.name))}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
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
