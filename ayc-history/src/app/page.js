import styles from "./page.module.css";
import HomePage from "./_homepage/HomePage";

export const metadata = {
  title: 'Home',
  description: 'Welcome to the Armdale Yacht Club Historic Artifact Archive. Discover our extensive collection of maritime artifacts, vintage photographs, and historical documents.',
  keywords: ['yacht club artifacts', 'maritime museum', 'sailing history', 'Nova Scotia heritage', 'yacht club archive'],
  openGraph: {
    title: 'Armdale Yacht Club - Historic Artifact Archive',
    description: 'Welcome to our digital archive featuring decades of maritime history and heritage.',
    url: 'https://armdaleartifacts.com',
    images: [
      {
        url: '/img/ayc-logo.png',
        width: 1200,
        height: 630,
        alt: 'Armdale Yacht Club Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Armdale Yacht Club - Historic Artifact Archive',
    description: 'Welcome to our digital archive featuring decades of maritime history and heritage.',
    images: ['/img/ayc-logo.png'],
  },
};

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <HomePage />
    </div>
  );
}
