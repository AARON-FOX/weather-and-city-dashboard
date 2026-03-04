'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchWeatherAndForecast } from '@/store/slices/weatherSlice';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { useRouter } from 'next/navigation';
import { Trash2, MapPin, CloudSun } from 'lucide-react';
import Link from 'next/link';
import styles from './FavoritesList.module.scss';

export function FavoritesList() {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSelectCity = (city: string) => {
    dispatch(fetchWeatherAndForecast(city));
    router.push('/');
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.emptyState}>
        <CloudSun size={80} strokeWidth={1} />
        <p>{`You haven't added any cities to your favorites yet.`}</p>
        <Link href="/" className={styles.goSearchBtn}>Find a city</Link>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {favorites.map((city) => (
        <div key={city} className={styles.favoriteCard}>
          <div className={styles.cityInfo} onClick={() => handleSelectCity(city)}>
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
  );
}
