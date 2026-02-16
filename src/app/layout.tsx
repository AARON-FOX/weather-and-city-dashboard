import type { Metadata } from 'next';
import StoreProvider from '@/store/StoreProvider';
import '@/styles/globals.scss';
import { Header } from '@/components/layout/Header';
import { Zain, Montserrat } from 'next/font/google';

const zain = Zain({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-zain',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'SkyCast | Weather Dashboard',
  description: 'Modern weather forecasting app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${zain.variable} ${montserrat.variable}`}
      data-theme="light"
    >
      <body>
        <StoreProvider>
          <div className="app-container">
            <Header />
            <main className="main-container">{children}</main>
            {/* Footer */}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
