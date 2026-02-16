import Link from 'next/link';
import styles from './Header.module.scss';
import { CloudSun, Heart, Search, Sun } from 'lucide-react';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <Link href="/" className={styles.logo}>
          <CloudSun size={32} />
          <span>SkyCast</span>
        </Link>

        <div className={styles.searchWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input type="text" placeholder="Search city..." className={styles.searchInput} />
        </div>

        <nav className={styles.nav}>
          <Link href="/favorites" className={styles.favoriteLink}>
            <Heart size={24} />
            <span>Favorites</span>
          </Link>

          <button className={styles.themeToggle}>
            <Sun size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
};
