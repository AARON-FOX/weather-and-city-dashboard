import { HomeContent } from '@/components/features/HomeContent/HomeContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SkyCast | Weather Dashboard',
  description: 'Check current weather and 5-day forecast for any city',
};

export default function Home() {
  return <HomeContent />;
}
