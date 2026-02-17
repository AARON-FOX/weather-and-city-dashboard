'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { CloudSun, Heart, Moon, Search, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/store/slices/settingsSlice';
import { RootState } from '@/store';

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.settings.theme);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <CloudSun size={32} />
          <span>SkyCast</span>
        </Link>

        <div className={styles.searchWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search city..."
            className={styles.searchInput}
          />
        </div>

        <nav className={styles.nav}>
          <Link href="/favorites" className={styles.favoriteLink}>
            <Heart size={24} />
            <span>Favorites</span>
          </Link>

          <button className={styles.themeToggle} onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
};
