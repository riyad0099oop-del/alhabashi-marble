import { Tajawal } from "next/font/google";
import "../../app/globals.css";
import "../../app/styles/navbar.css";
import "../../app/styles/hero.css";
import "../../app/styles/whyus.css";
import "../../app/styles/showroom.css";
import "../../app/styles/projects.css";
import "../../app/styles/footer.css";
import "../../app/styles/pages.css";
import JsonLd from "../../components/JsonLd";
import SmoothScroll from "../../components/SmoothScroll";
import SitePreloader from "../../components/SitePreloader";
import ThemeProvider from "../../components/ThemeProvider";

// next-intl 
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "700"],
});


export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    metadataBase: new URL("https://alhabashi-marble.vercel.app"),
    title: {
      default: isAr
        ? "الحبشي للرخام والجرانيت | أرقى أنواع الرخام والجرانيت في صنعاء، اليمن"
        : "Al Habashi Marble & Granite | Yemen's Premier Stone Factory",
      template: isAr
        ? "%s | الحبشي للرخام والجرانيت"
        : "%s | Al Habashi Marble & Granite",
    },
    description: isAr
      ? "الحبشي للرخام والجرانيت: متخصصون في استيراد وتجهيز أرقى أنواع الرخام والجرانيت العالمي في اليمن. نعد أفضل مصنع رخام في صنعاء لخدمة أرقى المشاريع."
      : "Al Habashi Marble & Granite: Yemen's leading specialists in importing and processing the world's finest marble and granite. The best marble factory in Sana'a.",
    keywords: isAr
      ? ["الحبشي للرخام والجرانيت", "مصنع رخام في اليمن", "مصنع رخام في صنعاء", "رخام اليمن", "جرانيت صنعاء", "تركيب رخام", "تصميم داخلي صنعاء"]
      : ["Al Habashi marble granite", "marble factory Yemen", "granite Sana'a", "natural stone Yemen", "marble installation"],
    alternates: {
      canonical: "/",
      languages: { 'ar': '/ar', 'en': '/en' },
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
      title: "الحبشي للرخام والجرانيت | Al Habashi Marble & Granite",
      description: isAr
        ? "استيراد وتجهيز أرقى أنواع الرخام والجرانيت في اليمن بأحدث التقنيات العالمية."
        : "الحبشي للرخام والجرانيت: استيراد وتجهيز أرقى أنواع الرخام والجرانيت العالمي في اليمن.",
      url: "https://alhabashi-marble.vercel.app",
      images: [{
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: isAr ? "شعار الحبشي للرخام والجرانيت" : "Al Habashi Marble & Granite Logo",
      }],
      type: "website",
      locale: isAr ? "ar_YE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "الحبشي للرخام والجرانيت | Al Habashi Marble & Granite",
      description: isAr
        ? "فخامة الحجر العالمي في قلب اليمن. رخام إيطالي وتركي وجرانيت برازيلي."
        : "World-class stone luxury in the heart of Yemen. Italian, Turkish marble and Brazilian granite.",
      images: ["/images/logo.png"],
    },
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
  };
}


export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <JsonLd />
      </head>
      <body className={tajawal.variable}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SitePreloader />
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}