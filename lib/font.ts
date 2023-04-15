import { Poppins } from '@next/font/google';
import localFont from '@next/font/local';

export const saoTorpes = localFont({
  src: '../styles/fonts/SaoTorpes.otf',
  variable: '--font-saoTorpes',
});

export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
