export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Armdale Yacht Club",
    "description": "Historic artifact archive of the Armdale Yacht Club, preserving maritime heritage through digital artifacts, photographs, and documents.",
    "url": "https://armdaleartifacts.com",
    "logo": "https://armdaleartifacts.com/img/ayc-logo.png",
    "sameAs": [
      // Add social media links here when available
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "General Inquiries",
      "email": "info@armdaleartifacts.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
