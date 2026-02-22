'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { CloudSun, Heart, Moon, Search, Sun, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/store/slices/settingsSlice';
import { AppDispatch, RootState } from '@/store';
import { useEffect, useRef, useState } from 'react';
import { fetchWeather } from '@/store/slices/weatherSlice';
import { FavoritesDropdown } from './FavoritesDropdown/FavoritesDropdown';

export const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.settings.theme);
  const { isLoading } = useSelector((state: RootState) => state.weather);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchValue.trim()) {
      dispatch(fetchWeather(searchValue));
      setSearchValue('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <CloudSun size={32} />
          <span>SkyCast</span>
        </Link>

        <div
          className={`${styles.searchWrapper} ${isLoading ? styles.loading : ''}`}
        >
          {isLoading ? (
            <Loader2 size={20} className={styles.spinnerIcon} />
          ) : (
            <Search size={20} className={styles.searchIcon} />
          )}

          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search city..."
            className={styles.searchInput}
          />
        </div>

        <nav className={styles.nav}>
          <div className={styles.favoritesWrapper} ref={dropdownRef}>
            <button
              className={styles.favoriteLink}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Heart
                size={24}
                fill={favorites.length > 0 ? 'currentColor' : 'none'}
              />
              <span>Favorites</span>
            </button>

            {isDropdownOpen && (
              <FavoritesDropdown onClose={() => setIsDropdownOpen(false)} />
            )}
          </div>

          <button
            className={styles.themeToggle}
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
};
