"use client";

export default function JsonLd() {
  const baseUrl = "https://alhabashi-marble.vercel.app";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "مصنع الحبشي للرخام والجرانيت",
    "alternateName": "Al Habashi Marble & Granite",
    "image": `${baseUrl}/images/logo.png`,
    "@id": `${baseUrl}`,
    "url": baseUrl,
    "telephone": "+967777079288",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع جدر الرئيسي، جولة عمران",
      "addressLocality": "صنعاء",
      "addressRegion": "Sanaa",
      "addressCountry": "YE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 15.4245,
      "longitude": 44.1955
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
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/alhabashimarble",
      "https://www.instagram.com/alhabashimarble"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
