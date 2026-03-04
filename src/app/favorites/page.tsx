import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './FavoritesPage.module.scss';
import { FavoritesList } from '@/components/features/FavoritesList/FavoritesList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SkyCast | Your Favorites',
  description: 'Manage your favorite cities for quick weather access',
};

export default function FavoritesPage() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <h1>Your Favorite Cities</h1>
      </div>

      <FavoritesList />
    </main>
  );
}
