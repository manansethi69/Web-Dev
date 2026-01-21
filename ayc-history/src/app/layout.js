import "./globals.css";
import Header from "./_components/Header";
import ScrollToTop from "./_components/ScrollToTop";
import Footer from "./_components/Footer";
import StructuredData from './_seo/StructuredData';


export const metadata = {
  title: "Armdale Yacht Club",
  description: "Armdale Yacht Club History",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3a8a' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AYC Archive',
  },
  manifest: '/manifest.json',
};


export const metadata2 = {
  title: {
    default: 'Armdale Yacht Club - Historic Artifact Archive',
    template: '%s | Armdale Yacht Club'
  },
  description: 'Explore the rich history of the Armdale Yacht Club through our digital archive of historic artifacts, photographs, and documents spanning decades of maritime heritage.',
  keywords: ['Armdale Yacht Club', 'yacht club history', 'maritime heritage', 'historic artifacts', 'sailing history', 'Nova Scotia yachting'],
  authors: [{ name: 'Armdale Yacht Club' }],
  creator: 'Armdale Yacht Club',
  publisher: 'Armdale Yacht Club',
  metadataBase: new URL('https://armdaleartifacts.com'),
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Armdale Yacht Club - Historic Artifact Archive',
    description: 'Explore the rich history of the Armdale Yacht Club through our digital archive of historic artifacts, photographs, and documents.',
    url: 'https://armdaleartifacts.com',
    siteName: 'Armdale Yacht Club Historic Archive',
    images: [
      {
        url: '/img/ayc-logo.png',
        width: 1200,
        height: 630,
        alt: 'Armdale Yacht Club Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Armdale Yacht Club - Historic Artifact Archive',
    description: 'Explore the rich history of the Armdale Yacht Club through our digital archive.',
    images: ['/img/ayc-logo.png'],
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
    google: 'your-google-verification-code-here',
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
