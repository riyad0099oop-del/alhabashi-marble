import { Tajawal } from "next/font/google";
import "./globals.css";
import JsonLd from "../components/JsonLd";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata = {
  metadataBase: new URL("https://your-project.vercel.app"),
  title: {
    default: "مصنع الحبشي للرخام والجرانيت | فخامة الحجر العالمي في اليمن",
    template: "%s | مصنع الحبشي للرخام والجرانيت"
  },
  description: "مصنع الحبشي للرخام والجرانيت: نختص باستيراد وتجهيز أرقى أنواع الرخام والجرانيت من إيطاليا، تركيا، والبرازيل. دقة في التنفيذ وفخامة تليق بمشاريعكم في اليمن.",
  keywords: ["رخام", "جرانيت", "اليمن", "صنعاء", "مصنع الحبشي", "تصميم داخلي", "حجر طبيعي", "الحبشي للرخام والجرانيت"],
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "مصنع الحبشي للرخام والجرانيت",
    description: "فخامة الحجر العالمي في قلب اليمن. أرقى أنواع الرخام والجرانيت المستورد.",
    url: "https://your-project.vercel.app",
    images: [{ url: "/images/logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مصنع الحبشي للرخام والجرانيت",
    description: "فخامة الحجر العالمي في قلب اليمن.",
    images: ["/images/logo.png"],
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
        {children}
      </body>
    </html>
  );
}
