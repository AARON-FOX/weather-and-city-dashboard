'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchWeather } from '@/store/slices/weatherSlice';
import { MapPin, ArrowRight } from 'lucide-react';
import styles from './FavoritesDropdown.module.scss';

interface Props {
  onClose: () => void;
}

export const FavoritesDropdown = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const recentFavorites = favorites.slice(-5).reverse();

  const handleCityClick = (city: string) => {
    dispatch(fetchWeather(city));
    onClose();
  };

  return (
    <div className={styles.dropdown}>
      <h3 className={styles.title}>Favorite Cities</h3>
      <div className={styles.divider} />

      <ul className={styles.list}>
        {recentFavorites.length > 0 ? (
          recentFavorites.map((city) => (
            <li
              key={city}
              className={styles.item}
              onClick={() => handleCityClick(city)}
            >
              <MapPin size={16} />
              <span>{city}</span>
            </li>
          ))
        ) : (
          <p className={styles.empty}>No favorites yet</p>
        )}
      </ul>

      <div className={styles.divider} />
      <Link
        href="/favorites"
        className={styles.allFavoritesBtn}
        onClick={onClose}
      >
        <span>All Favorites</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};
