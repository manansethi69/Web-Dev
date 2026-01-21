import AboutUs from './AboutUs';
import { Metadata } from "next";
import { motion } from "motion/react";

export const metadata = {
  title: 'About Us',
  description: 'Learn about the Armdale Yacht Club, our history, mission, and the dedicated team preserving our maritime heritage through this digital archive.',
  keywords: ['Armdale Yacht Club history', 'yacht club mission', 'maritime preservation', 'about AYC'],
  openGraph: {
    title: 'About Armdale Yacht Club',
    description: 'Discover the history and mission of the Armdale Yacht Club and our commitment to preserving maritime heritage.',
    url: 'https://armdaleartifacts.com/about',
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
    title: 'About Armdale Yacht Club',
    description: 'Discover the history and mission of the Armdale Yacht Club.',
    images: ['/img/ayc-logo.png'],
  },
};

export default function AboutPage() {
  return <AboutUs />;
}
