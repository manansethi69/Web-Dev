/**
 * This is Exhibits page to display artifacts
 * @author Chetan Anand
 */
import { ExhibitsPage } from './Exhibits';
import './Exhibits.css';
import { motion } from "motion/react";

export const metadata = {
  title: 'Stories',
  description: 'Read captivating stories and narratives from the Armdale Yacht Club history. Discover the people, events, and traditions that shaped our maritime heritage.',
  keywords: ['yacht club stories', 'maritime narratives', 'sailing stories', 'yacht club history', 'maritime heritage stories'],
  openGraph: {
    title: 'Stories - Armdale Yacht Club',
    description: 'Discover captivating stories from the Armdale Yacht Club maritime heritage.',
    url: 'https://armdaleartifacts.com/exhibits',
    images: [
      {
        url: '/img/ayc-logo.png',
        width: 1200,
        height: 630,
        alt: 'Armdale Yacht Club Stories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stories - Armdale Yacht Club',
    description: 'Read captivating stories from our maritime heritage.',
    images: ['/img/ayc-logo.png'],
  },
};



export default function Page() {
  return <ExhibitsPage />;
}