import type { Metadata, Viewport } from 'next';

import { poppins } from '@/libs/fonts';
import messages from '@/locales/en.json';
import { getBaseUrl } from '@/utils/misc';

import '@/styles/global.css';

export const metadata: Metadata = {
  title: messages.meta_data.main.title,
  description: messages.meta_data.main.description,
  openGraph: {
    title: messages.meta_data.main.title,
    description: messages.meta_data.main.description,
    type: 'website',
    url: getBaseUrl(),
    images: [
      {
        url: getBaseUrl() + '/images/logo.webp',
        width: 400,
        height: 400,
        alt: 'CabinMap',
      },
    ],
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
  ],
};

export const viewport: Viewport = {
  themeColor: '#000080',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={ `${poppins.variable} font-poppins h-full antialiased` }>
        { children }
      </body>
    </html>
  );
}
