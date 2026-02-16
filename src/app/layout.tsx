import type { Metadata } from 'next';
import StoreProvider from '@/store/StoreProvider';
import '@/styles/globals.scss';

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
    <html lang="en" data-theme="light">
      <body>
        <StoreProvider>
          <div className="app-container">
            {/* Header */}
            <main className="main-container">{children}</main>
            {/* Footer */}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
