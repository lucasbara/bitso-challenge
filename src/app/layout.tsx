import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/styles/globals.css';
import Providers from './providers';
import Header from '@/app/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bitso | dApp Challenge',
  description: 'Made by Lucas Barallobre',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="bg-gray-900 h-screen text-white fonts-inter">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
