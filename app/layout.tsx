import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "سيلفر ساندس الساحل الشمالي أورا | Silver Sands North Coast — ORA Developers",
  description: "سيلفر ساندس Silver Sands الساحل الشمالي من أورا ORA Developers — إطلاق The Cove Lagoon. شاليهات وفيلات فاخرة بتشطيب كامل تبدأ من ٩.٧ مليون جنيه. سيدي حنيش كيلو ٢٢٢. سيلفر ساندس أورا — ٥٪ مقدم وتقسيط حتى ٨ سنوات. ZED East القاهرة الجديدة. نجيب ساويرس. Silver Sands ORA North Coast — fully finished luxury from 9.7M EGP.",
  keywords: "سيلفر ساندس,Silver Sands,أورا,ORA Developers,سيلفر ساندس الساحل الشمالي,Silver Sands North Coast,سيلفر ساندس أورا,The Cove,ZED East,نجيب ساويرس,Naguib Sawiris,Silversands,أورا للتطوير,سيدي حنيش,سيلفر ساندس أسعار,Silver Sands prices",
  openGraph: {
    title: "سيلفر ساندس أورا — Silver Sands ORA | The Cove Lagoon Launch",
    description: "سيلفر ساندس Silver Sands من أورا ORA — شاليهات وفيلات فاخرة بتشطيب كامل. ٥٪ مقدم، تقسيط ٨ سنوات. سيدي حنيش كيلو ٢٢٢. Fully finished luxury residences by Naguib Sawiris.",
    locale: "ar_EG", type: "website",
    images: ["https://ora.properties-eg.com/hero-luxury.webp"],
  },
};
export default function L({children}:{children:React.ReactNode}){return(
  <html lang="ar" dir="rtl"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    {/* ══ Google Ads Tag ══ */}
    {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXX" /> */}
    {/* <script dangerouslySetInnerHTML={{__html:`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','AW-XXXXXXX');`}} /> */}
  </head><body>{children}</body></html>
);}
