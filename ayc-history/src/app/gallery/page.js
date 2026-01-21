import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Gallery',
  description: 'Browse our extensive gallery of historic photographs, artifacts, and memorabilia from the Armdale Yacht Club spanning decades of maritime history.',
  keywords: ['yacht club photos', 'historic photographs', 'maritime gallery', 'sailing artifacts', 'yacht club memorabilia'],
  openGraph: {
    title: 'Gallery - Armdale Yacht Club Historic Archive',
    description: 'Browse historic photographs and artifacts from the Armdale Yacht Club collection.',
    url: 'https://armdaleartifacts.com/gallery',
    images: [
      {
        url: '/img/ayc-logo.png',
        width: 1200,
        height: 630,
        alt: 'Armdale Yacht Club Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery - Armdale Yacht Club',
    description: 'Browse historic photographs and artifacts from our collection.',
    images: ['/img/ayc-logo.png'],
  },
};

export default function Gallery() {
  return <GalleryClient />;
}
