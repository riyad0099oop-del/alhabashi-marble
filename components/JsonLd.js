"use client";

export default function JsonLd() {
  const baseUrl = "https://your-project.vercel.app";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "مصنع الحبشي للرخام والجرانيت",
    "image": `${baseUrl}/images/logo.png`,
    "@id": `${baseUrl}`,
    "url": baseUrl,
    "telephone": "+967777079288",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Jadr Street, Amran Roundabout",
      "addressLocality": "Sanaa",
      "addressCountry": "YE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 15.40,
      "longitude": 44.20
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "#",
      "#"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
