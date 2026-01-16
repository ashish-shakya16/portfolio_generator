import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins, Playfair_Display, Dancing_Script } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
});

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing',
});

export const metadata = {
  title: 'PortfolioAI - Build Your Dream Portfolio',
  description: 'Create professional portfolios with AI assistance',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${dancingScript.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
