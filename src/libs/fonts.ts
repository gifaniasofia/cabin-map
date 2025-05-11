import { Nunito_Sans, Poppins } from 'next/font/google';

export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito',
});

export const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  fallback: ['sans-serif'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-Poppins',
  display: 'swap',
});
