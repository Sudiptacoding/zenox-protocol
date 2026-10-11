import { Chakra_Petch, Press_Start_2P } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { Toaster } from 'react-hot-toast';

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
  metadataBase: new URL('https://zenox-protocol.vercel.app'),
  title: {
    default: 'Zenox Protocol - Early User Campaign & Rewards Platform',
    template: '%s | Zenox Protocol'
  },
  description: 'Join the Zenox Protocol early user campaign. Complete tasks, connect your wallet, earn entries, and get exclusive rewards on our Web3 decentralized platform.',
  keywords: ['Zenox Protocol', 'Early User Campaign', 'Web3', 'Crypto Rewards', 'Task Platform', 'Airdrop', 'Blockchain'],
  authors: [{ name: 'Zenox Protocol Team' }],
  creator: 'Zenox Protocol',
  publisher: 'Zenox Protocol',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zenox-protocol.vercel.app',
    title: 'Zenox Protocol - Early User Campaign',
    description: 'Join the Zenox Protocol early user campaign, complete tasks, and earn exclusive crypto rewards.',
    siteName: 'Zenox Protocol',
    images: [
      {
        url: '/og-image.png', // আপনার public ফোল্ডারে একটি ব্যানার ইমেজ রাখতে পারেন (যেমন: 1200x630 px)
        width: 1200,
        height: 630,
        alt: 'Zenox Protocol Early User Campaign',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenox Protocol - Early User Campaign',
    description: 'Join the Zenox Protocol early user campaign, complete tasks, and earn exclusive crypto rewards.',
    creator: '@zenoxprotocol', // আপনার টুইটার হ্যান্ডেল দিতে পারেন
    images: ['/og-image.png'],
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE', // গুগল সার্চ কনসোলে ভেরিফাই করার কোড এখানে বসাতে পারেন
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${chakra.variable} ${pixelFont.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-[#00e699] selection:text-black">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#051711',
                color: '#ffffff',
                border: '1px solid rgba(0, 230, 153, 0.4)',
                fontFamily: 'var(--font-chakra), sans-serif',
                fontSize: '13px',
              },
              success: {
                iconTheme: {
                  primary: '#00e699',
                  secondary: '#000000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}