import { Chakra_Petch, Press_Start_2P } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const chakra = Chakra_Petch({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'],
  variable: '--font-chakra' 
});

const pixelFont = Press_Start_2P({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-pixel' 
});

export const metadata = {
  title: 'Zenox Protocol - Early User Campaign',
  description: 'Join the Zenox Protocol early user campaign',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${chakra.variable} ${pixelFont.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-[#00e699] selection:text-black">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}