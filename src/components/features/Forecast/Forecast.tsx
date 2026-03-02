'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styles from './Forecast.module.scss';
import Image from 'next/image';

export const Forecast = () => {
  const { forecast } = useSelector((state: RootState) => state.weather);

  if (!forecast) return null;

  const getDayName = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className={styles.forecastContainer}>
      <h3 className={styles.title}>5-Day Forecast</h3>

      <div className={styles.grid}>
        {forecast.map((item) => (
          <div key={item.dt} className={styles.card}>
            <span className={styles.day}>{getDayName(item.dt_txt)}</span>

            <Image
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              width={50}
              height={50}
            />

            <div className={styles.temps}>
              <span className={styles.max}>
                {Math.round(item.main.temp_max)}°
              </span>

              <span className={styles.min}>
                {Math.round(item.main.temp_min)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
