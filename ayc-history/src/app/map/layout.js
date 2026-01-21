export const metadata = {
  title: "Map",
  description:
    "Explore the geographic locations of historic artifacts and significant sites related to the Armdale Yacht Club on an interactive map.",
  keywords: [
    "artifact locations",
    "interactive map",
    "yatch club sites",
    "historic locations",
    "maritime geography"
  ],
  openGraph: {
    title: "Interactive Map - Armdale Yacht Club",
    description:
      "Explore artifact locations and historic sites on our interactive map.",
    url: "https://armdaleartifacts.com/map",
    images: [
      {
        url: "/img/ayc-logo.png",
        width: 1200,
        height: 630,
        alt: "Armdale Yacht Club Map"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Map - Armdale Yacht Club",
    description: "Explore artifact locations and historic sites.",
    images: ["/img/ayc-logo.png"]
  }
};

export default function MapLayout({ children }) {
  return children;
}
