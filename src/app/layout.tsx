import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from '@/components/ThemeProvider'
import TypographyLoader from '@/components/TypographyLoader'
import MetadataLoader from '@/components/MetadataLoader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tomsher Technologies - Web Development & Digital Marketing Company in Dubai',
    template: '%s | Tomsher Technologies'
  },
  description: 'Leading web development company in Dubai, UAE specializing in custom website development, eCommerce solutions, and digital marketing services. Transform your business with innovative technology solutions.',
  keywords: [
    'web development Dubai',
    'web design company UAE',
    'ecommerce development',
    'digital marketing Dubai',
    'website development UAE',
    'mobile app development',
    'SEO services Dubai'
  ],
  authors: [{ name: 'Tomsher Technologies' }],
  creator: 'Tomsher Technologies',
  publisher: 'Tomsher Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tomsher.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tomsher.com',
    title: 'Tomsher Technologies - Web Development & Digital Marketing Company in Dubai',
    description: 'Leading web development company in Dubai, UAE specializing in custom website development, eCommerce solutions, and digital marketing services.',
    siteName: 'Tomsher Technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tomsher Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomsher Technologies - Web Development & Digital Marketing Company in Dubai',
    description: 'Leading web development company in Dubai, UAE specializing in custom website development, eCommerce solutions, and digital marketing services.',
    images: ['/og-image.jpg'],
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TypographyLoader />
        <MetadataLoader />
        <ThemeProvider>
          <Providers>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
