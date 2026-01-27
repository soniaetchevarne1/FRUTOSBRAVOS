import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Fruto Bravo - Energía Natural',
  description: 'Tu tienda premium de frutos secos, mixes y nutrición con toda la fuerza de la naturaleza.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={outfit.variable}>
      <body>
        <StoreProvider>
          <div className="layout-wrapper">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
