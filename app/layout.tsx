import type { Metadata } from "next";
import Script from "next/script";
import { AW_ID } from "@/lib/tracking";
import "./globals.css";

export const metadata: Metadata = {
  title: "سيلفر ووك & سيلفر باي — سيلفر ساندس الساحل الشمالي من أورا | إطلاق جديد",
  description:
    "إطلاق جديد داخل سيلفر ساندس سيدي حنيش من أورا للتطوير العقاري: وحدات على اللاجون مباشرة بتشطيب كامل وتكييفات. مقدم 5% وتقسيط حتى 8 سنوات. سجّل مع فريق مبيعات معتمد واحصل على قائمة الأسعار الرسمية.",
  keywords: [
    "سيلفر ساندس", "سيلفر ووك", "سيلفر باي", "Silversands", "Silver Walk", "Silver Bay",
    "أورا", "ORA Developers", "نجيب ساويرس", "سيدي حنيش", "الساحل الشمالي", "شاليهات الساحل",
  ],
  openGraph: {
    title: "سيلفر ووك & سيلفر باي — إطلاق جديد داخل سيلفر ساندس الساحل الشمالي",
    description:
      "وحدات على اللاجون مباشرة بتشطيب كامل. مقدم 5% وتقسيط حتى 8 سنوات — سجّل اهتمامك الآن مع فريق مبيعات معتمد.",
    type: "website",
    locale: "ar_EG",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Silver Walk & Silver Bay — Silversands North Coast",
  description:
    "Lagoon-front residences within Silversands, Sidi Heneish, North Coast, developed by ORA Developers. Fully finished with ACs. 5% down payment over 8 years.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sidi Heneish",
    addressRegion: "North Coast, Matrouh",
    addressCountry: "EG",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtagReady = !AW_ID.includes("X");
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@500;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Marcellus&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gtagReady && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${AW_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${AW_ID}');`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
