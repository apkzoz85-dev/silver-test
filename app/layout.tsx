import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "سيلفر ساندس الساحل الشمالي أورا | Silver Sands North Coast — ORA Developers | أسعار 2026",
  description: "سيلفر ساندس Silver Sands الساحل الشمالي من أورا ORA Developers — Silver Bay و Silver Walk. شاليهات وفيلات بتشطيب كامل تبدأ من ١٣ مليون جنيه. سيدي حنيش كيلو ٢٢٢. سيلفر ساندس أورا — ٥٪ مقدم وتقسيط حتى ٨ سنوات. نجيب ساويرس. Silver Sands ORA — fully finished from 13M EGP.",
  keywords: "سيلفر ساندس,Silver Sands,أورا,ORA,ORA Developers,سيلفر ساندس الساحل الشمالي,Silver Sands North Coast,سيلفر ساندس أورا,Silver Bay,Silver Walk,ZED East,نجيب ساويرس,Naguib Sawiris,أورا للتطوير,سيلفر ساندس أسعار,Silver Sands prices 2026",
  openGraph: {
    title: "سيلفر ساندس أورا — Silver Sands ORA | Silver Bay & Silver Walk",
    description: "سيلفر ساندس Silver Sands من أورا ORA — Silver Bay كابينات فاخرة و Silver Walk شقق بتشطيب كامل. ٥٪ مقدم، تقسيط ٨ سنوات. سيدي حنيش كيلو ٢٢٢.",
    locale: "ar_EG", type: "website",
    images: ["https://ora.properties-eg.com/hero-luxury.webp"],
  },
};
export default function L({children}:{children:React.ReactNode}){return(
  <html lang="ar" dir="rtl"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18216441738"/>
    <script dangerouslySetInnerHTML={{__html:`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','AW-18216441738');`}}/>
  </head><body>{children}</body></html>
);}
