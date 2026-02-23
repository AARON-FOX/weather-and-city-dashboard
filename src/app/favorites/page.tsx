'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchWeather } from '@/store/slices/weatherSlice';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { useRouter } from 'next/navigation';
import { Trash2, MapPin, ArrowLeft, CloudSun } from 'lucide-react';
import Link from 'next/link';
import styles from './FavoritesPage.module.scss';

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSelectCity = (city: string) => {
    dispatch(fetchWeather(city));
    router.push('/');
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <h1>Your Favorite Cities</h1>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <CloudSun size={80} strokeWidth={1} />
          <p>{`You haven't added any cities to your favorites yet.`}</p>
          <Link href="/" className={styles.goSearchBtn}>
            Find a city
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((city) => (
            <div key={city} className={styles.favoriteCard}>
              <div
                className={styles.cityInfo}
                onClick={() => handleSelectCity(city)}
              >
                <MapPin size={20} />
                <span>{city}</span>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => dispatch(toggleFavorite(city))}
                title="Remove from favorites"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
