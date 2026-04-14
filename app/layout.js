import { Tajawal } from "next/font/google";
import "./globals.css";
import JsonLd from "../components/JsonLd";
import SmoothScroll from "../components/SmoothScroll";
import SitePreloader from "../components/SitePreloader";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata = {
  metadataBase: new URL("https://alhabashi-marble.vercel.app"),
  title: {
    default: "الحبشي للرخام والجرانيت | أرقى أنواع الرخام والجرانيت في صنعاء، اليمن",
    template: "%s | الحبشي للرخام والجرانيت",
  },
  description:
    "الحبشي للرخام والجرانيت: متخصصون في استيراد وتجهيز أرقى أنواع الرخام والجرانيت العالمي في اليمن. نعد أفضل مصنع رخام في صنعاء لخدمة أرقى المشاريع.",
  keywords: [
    "الحبشي للرخام والجرانيت",
    "مصنع رخام في اليمن",
    "مصنع رخام في صنعاء",
    "رخام اليمن",
    "جرانيت صنعاء",
    "تركيب رخام",
    "تصميم داخلي صنعاء",
    "واجهات حجر طبيعي",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "Kq9K3BFvUn5V7JPi9X4qJVF8cA6B4MRIKirV-b9Z0oI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "الحبشي للرخام والجرانيت | فخامة الحجر العالمي",
    description: "استيراد وتجهيز أرقى أنواع الرخام والجرانيت في اليمن بأحدث التقنيات العالمية.",
    url: "https://alhabashi-marble.vercel.app",
    images: [{ url: "/images/logo.png" }],
    type: "website",
    locale: "ar_YE",
  },
  twitter: {
    card: "summary_large_image",
    title: "الحبشي للرخام والجرانيت",
    description: "فخامة الحجر العالمي في قلب اليمن. رخام إيطالي وتركي وجرانيت برازيلي.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <JsonLd />
      </head>
      <body className={tajawal.variable}>
        <SitePreloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}