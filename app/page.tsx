"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

/* ═══════════════════════════════════════════════════
   CONSTANTS — update these per project
═══════════════════════════════════════════════════ */
const PHONE = "01123863254";
const PHONE_DISPLAY = "0112 386 3254";
const PHONE_INTL = "+201123863254";
const WA_NUMBER = "201123863254";
const WEB3_KEY = "14be81e6-21a3-4887-8efe-69b2cd01061d";

const GA_TAG = "AW-18216441738";
const CONV_FORM = "AW-18216441738/o_zeCKXjh9IcEIqvo-5D";
const CONV_WA = "AW-18216441738/Yd3hCKjjh9IcEIqvo-5D";

/* ═══════════════════════════════════════════════════
   IMAGES — ORA CDN + Nawy CDN
═══════════════════════════════════════════════════ */
const ORA = "https://d3lfybzdo3x59a.cloudfront.net/website-assets";
const NAWY = "https://prod-images.nawy.com/processed";
const IMG = {
  hero: `${ORA}/SS-north-coast1.png`,
  hero2: `${NAWY}/compound_image/image/3239/high.webp`,
  oraLogo: "https://www.oradevelopers.com/_nuxt/img/ora-logo-greyer.52c8cfb.png",
  ssLogo: "https://www.oradevelopers.com/_nuxt/img/ora-logo-greyer.52c8cfb.png",
  lagoon: `${ORA}/WATG04_Silvertown_CGI15_03%20(1).jpg`,
  pool: `${NAWY}/compound_image/image/5250/default.webp`,
  villa: `${ORA}/1A-Back-Final-2-m10.JPG`,
  aerial: `${ORA}/2B-Back-Dusk-m4-FINAL.jpg`,
  cabin: `${NAWY}/inventory/compounds/2546/cover-images/Silver%20Bay/high.webp`,
  walk: `${NAWY}/inventory/compounds/2545/cover-images/Silver%20Walk/high.webp`,
  founder: `${ORA}/ns-teampage.png`,
  interior: `${ORA}/VILLA-1A-LIVING-AREA.jpg`,
  town: `${ORA}/WATG04_Silvertown_CGI01_03.jpg`,
  overview1: `${NAWY}/compound_image/image/5255/default.webp`,
  overview2: `${NAWY}/compound_image/image/5254/default.webp`,
};

/* ═══════════════════════════════════════════════════
   TRACKING
═══════════════════════════════════════════════════ */
function trackCall(label = "call") {
  const w = window as any;
  if (w.gtag) w.gtag("event", "click_call", { event_category: "contact", event_label: label });
}
function trackWA(label = "wa") {
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", "conversion", { send_to: CONV_WA, value: 1.0, currency: "EGP" });
    w.gtag("event", "click_whatsapp", { event_category: "contact", event_label: label });
  }
}
function trackLead(label = "form") {
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", "conversion", { send_to: CONV_FORM, value: 1.0, currency: "EGP" });
    w.gtag("event", "generate_lead", { event_category: "lead", event_label: label });
  }
}

/* ═══════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════ */
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .611.611l4.458-1.495A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.752-6.278-2.03l-.44-.332-2.633.883.883-2.633-.332-.44A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

/* ═══════════════════════════════════════════════════
   BILINGUAL CONTENT
═══════════════════════════════════════════════════ */
const T = {
  ar: {
    dir: "rtl" as const, font: "'IBM Plex Sans Arabic', sans-serif",
    nav_cta: "احجز استشارة", nav_lang: "EN",
    hero_eyebrow: "الساحل الشمالي · كيلو ٢٢٢ · أورا للتطوير",
    hero_h1: "امتلك البحر،", hero_h1b: "في سيلفر ساندس.",
    hero_p: "شاليهات وفيلات فاخرة بتشطيب كامل في سيدي حنيش، كيلو ٢٢٢ الساحل الشمالي — من أورا للتطوير العقاري. Silver Bay كابينات بحديقة خاصة و Silver Walk شقق بإطلالة بحرية.",
    stat1v: "٥٪", stat1l: "مقدم", stat2v: "٨", stat2l: "سنوات تقسيط", stat3v: "١٣M", stat3l: "يبدأ من",
    form_h: "احجز استشارتك الخاصة", form_sub: "مستشار متخصص يتواصل معاك خلال ساعة بالأسعار الكاملة.",
    f_name: "الاسم الكامل", f_phone: "الموبايل / واتساب", f_unit: "نوع الوحدة", f_submit: "أرسل واحصل على الأسعار", f_disc: "بياناتك سرية ولن يتم مشاركتها.",
    f_units: ["اختار", "شقة / بنتهاوس", "شاليه / كابينة", "تاون هاوس", "فيلا مستقلة"],
    f_sent_h: "تم استلام طلبك", f_sent_p: "مستشار سيلفر ساندس أورا هيتواصل معاك خلال ساعة بالأسعار الكاملة.",
    strip1: "أورا للتطوير", strip1s: "نجيب ساويرس", strip2: "سيلفر ساندس", strip2s: "الساحل الشمالي · كيلو ٢٢٢", strip3: "تشطيب كامل", strip3s: "جميع الوحدات",
    dev_eyebrow: "المطور", dev_h: "أورا للتطوير — رؤية نجيب ساويرس.",
    dev_p: "أورا للتطوير العقاري هي الذراع العقاري للمهندس نجيب ساويرس، واحد من أبرز رجال الأعمال في الشرق الأوسط وأفريقيا. أورا تدير مشاريع عقارية في ٦ دول — واسم ساويرس ضمانة لجودة التنفيذ والتسليم.",
    dev_stats: [{ v: "٦", l: "دول" }, { v: "١٥+", l: "مشروع" }, { v: "ZED", l: "الشيخ زايد" }, { v: "Silversands", l: "الساحل الشمالي" }],
    about_eyebrow: "وجهة متكاملة", about_h: "مشروع ساحلي متكامل — مش كمبوند عادي.",
    about_p: "سيلفر ساندس أورا — مشروع ساحلي فاخر على البحر مباشرة في سيدي حنيش. بحيرة كريستالية، فنادق، ومرافق عالمية.",
    about_stats: [{ v: "٨٨,٠٠٠ م²", l: "بحيرة كريستالية" }, { v: "١ كم", l: "شاطئ مباشر" }, { v: "٥", l: "كلوب هاوس" }, { v: "٦-٣٤ م", l: "ترسات مرتفعة" }, { v: "٢", l: "فنادق" }, { v: "٤ كم", l: "من الماظة باي" }],
    coll_eyebrow: "مجموعات سيلفر ساندس أورا", coll_h: "اختار اللي يناسب أسلوب حياتك.",
    bay_name: "Silver Bay", bay_tag: "كابينات فاخرة", bay_desc: "كابينات بحديقة خاصة — تشطيب كامل بإطلالة على البحيرة الكريستالية.",
    walk_name: "Silver Walk", walk_tag: "شقق عصرية", walk_desc: "شقق بتشطيب كامل — ١ و ٢ و ٣ غرف بإطلالات بحرية مفتوحة.",
    price_l: "يبدأ من", plan_l: "نظام السداد",
    prices_eyebrow: "قائمة الأسعار المحدّثة", prices_h: "أسعار واضحة، خطط سداد مريحة.",
    prices_sub: "عينة من الوحدات والمساحات والأسعار الاسترشادية. اطلب ملف PDF الكامل من الفورم.",
    tbl_unit: "الوحدة", tbl_area: "المساحة", tbl_price: "السعر من", tbl_phase: "المرحلة", tbl_cta: "حمّل البرشور",
    prices_disc: "الأسعار استرشادية وقابلة للتغيير حسب المطور. أسعار سيلفر ساندس أورا.",
    prices_dl: "حمّل قائمة الأسعار الكاملة (PDF)",
    payment_h: "نظام السداد", payment_p: "٥٪ مقدم — ٥٪ بعد ٣ شهور — تقسيط حتى ٨ سنوات",
    eoi: "EOI: ٥٪ من متوسط سعر الوحدة (شيك أو تحويل بنكي)",
    gallery_eyebrow: "لمحة عن الحياة هنا", gallery_h: "تفاصيل تستحق الامتلاك.",
    loc_eyebrow: "الموقع", loc_h: "كيلو ٢٢٢ — قلب الساحل الجديد.",
    loc_p: "سيلفر ساندس أورا تقع في سيدي حنيش، كيلو ٢٢٢ الساحل الشمالي — بالقرب من رأس الحكمة وطريق الفوكا الجديد.",
    loc_points: ["٤ كم من الماظة باي", "قريب من رأس الحكمة", "طريق الفوكا الجديد مباشرة", "٣ ساعات من القاهرة"],
    contact_eyebrow: "تواصل معنا", contact_h: "وصّلنا بالطريقة اللي تناسبك.",
    contact_sub: "سجّل بياناتك ومستشار يتواصل معاك خلال دقايق، أو تواصل معنا مباشرة.",
    contact_form_h: "سجّل اهتمامك", contact_form_sub: "مستشار متخصص يتواصل معاك خلال دقايق بالأسعار الكاملة.",
    contact_submit: "أرسل الطلب",
    contact_talk: "كلّمنا دلوقتي", contact_talk_sub: "رد سريع خلال دقايق طوال اليوم.",
    contact_wa: "واتساب", contact_wa_sub: "رد فوري على استفسارك", contact_call: "اتصل الآن",
    faq_eyebrow: "قبل ما تسأل", faq_h: "أسئلة المشترين المتكررة.",
    faqs: [
      { q: "إيه أقل مقدم؟", a: "التعاقد يبدأ من ٥٪ مقدم فقط، مع خطط سداد حتى ٨ سنوات." },
      { q: "مين المطور؟", a: "المطور هو أورا للتطوير العقاري (نجيب ساويرس) — سيلفر ساندس أورا واحد من أبرز مشاريع الساحل الشمالي." },
      { q: "الوحدات تشطيب كامل؟", a: "نعم، جميع وحدات سيلفر ساندس أورا (Silver Bay و Silver Walk) تشطيب كامل." },
      { q: "هل الاستثمار مناسب لإعادة البيع؟", a: "موقع كيلو ٢٢٢ بالقرب من رأس الحكمة، واسم أورا العالمي، والطلب القوي على الساحل الجديد كلها عوامل تدعم نمو القيمة." },
      { q: "إيه الفرق بين Silver Bay و Silver Walk؟", a: "Silver Bay كابينات فاخرة بحديقة خاصة على البحيرة. Silver Walk شقق عصرية ١-٣ غرف بإطلالات بحرية مفتوحة." },
    ],
    ft_disc: "سيلفر ساندس أورا — وجهة ساحلية متكاملة في كيلو ٢٢٢ الساحل الشمالي، من أورا للتطوير العقاري. صفحة تسويقية — الأسعار استرشادية.",
    ft_agent: "فريق مبيعات معتمد", ft_legal: "صفحة تسويقية. جميع الأسعار والمساحات استرشادية وقابلة للتغيير من المطور بدون إشعار. العلامات التجارية (أورا، سيلفر ساندس) ملك لأصحابها.",
    mob_call: "اتصل", mob_wa: "واتساب", mob_reg: "سجّل الآن",
    pop_h: "سيلفر ساندس أورا — حمّل البرشور", pop_sub: "أدخل رقمك لتحميل البرشور الكامل بالأسعار وخطط السداد.",
    pop_phone: "الموبايل / واتساب", pop_name: "الاسم الكامل", pop_submit: "حمّل البرشور",
    pop_requests: ["اختار طلبك", "أسعار Silver Bay", "أسعار Silver Walk", "أسعار كل الوحدات", "نظام السداد والتقسيط", "حجز موعد زيارة", "استشارة استثمارية"],
    pop_done_h: "تم! البرشور في الطريق", pop_done_p: "لو ما فتحش تلقائياً، مستشار سيلفر ساندس أورا هيبعتهولك على الواتساب فوراً.",
    prv_title: "سياسة الخصوصية", prv_text: "نجمع الاسم والهاتف والإيميل فقط عند تعبئة النموذج — للتواصل بخصوص سيلفر ساندس أورا. بياناتك مشفرة ومحمية. لا نبيع أو نشارك بياناتك.",
    cookie_text: "نستخدم ملفات الارتباط لتحسين تجربتك وقياس أداء الحملات.", cookie_accept: "موافق", cookie_more: "سياسة الخصوصية",
  },
  en: {
    dir: "ltr" as const, font: "'Inter', sans-serif",
    nav_cta: "Book a consultation", nav_lang: "عربي",
    hero_eyebrow: "North Coast · KM 222 · An ORA Development",
    hero_h1: "Own the sea,", hero_h1b: "at Silver Sands.",
    hero_p: "Fully finished luxury chalets and villas at Sidi Heneish, KM 222 North Coast — by ORA Developers. Silver Bay cabins with private gardens and Silver Walk apartments with sea views.",
    stat1v: "5%", stat1l: "down", stat2v: "8", stat2l: "year plan", stat3v: "13M", stat3l: "starting from",
    form_h: "Book your private consultation", form_sub: "A dedicated advisor calls you within the hour with the full price list.",
    f_name: "Full name", f_phone: "Mobile / WhatsApp", f_unit: "Unit type", f_submit: "Send & get priority pricing", f_disc: "Your details are confidential and never shared.",
    f_units: ["Choose", "Apartment / Penthouse", "Chalet / Cabin", "Townhouse", "Standalone Villa"],
    f_sent_h: "Request received", f_sent_p: "A Silver Sands ORA advisor will call you within the hour with the full price list.",
    strip1: "ORA Developers", strip1s: "By Naguib Sawiris", strip2: "Silver Sands", strip2s: "North Coast · KM 222", strip3: "Fully Finished", strip3s: "All units",
    dev_eyebrow: "The Developer", dev_h: "ORA Developers — Naguib Sawiris' vision.",
    dev_p: "ORA Developers is the real estate arm of Eng. Naguib Sawiris, one of the most prominent businessmen in the Middle East and Africa. ORA manages projects across 6 countries — the Sawiris name guarantees quality execution and delivery.",
    dev_stats: [{ v: "6", l: "Countries" }, { v: "15+", l: "Projects" }, { v: "ZED", l: "Sheikh Zayed" }, { v: "Silversands", l: "North Coast" }],
    about_eyebrow: "A complete destination", about_h: "A full coastal town — not just a compound.",
    about_p: "Silver Sands ORA — a luxury coastal project directly on the sea at Sidi Heneish. Crystal lagoon, hotels, and world-class amenities.",
    about_stats: [{ v: "88,000 m²", l: "Crystal lagoon" }, { v: "1 km", l: "Direct beachfront" }, { v: "5", l: "Club houses" }, { v: "6-34 m", l: "Elevated terraces" }, { v: "2", l: "Hotels on-site" }, { v: "4 km", l: "From Almaza Bay" }],
    coll_eyebrow: "Silver Sands ORA Collections", coll_h: "Choose what fits your lifestyle.",
    bay_name: "Silver Bay", bay_tag: "Luxury Cabins", bay_desc: "Cabins with private gardens — fully finished overlooking the crystal lagoon.",
    walk_name: "Silver Walk", walk_tag: "Modern Apartments", walk_desc: "Fully finished apartments — 1, 2 & 3 bedrooms with open sea views.",
    price_l: "Starts from", plan_l: "Payment plan",
    prices_eyebrow: "Updated price list", prices_h: "Clear prices, comfortable payment plans.",
    prices_sub: "A sample of units, areas and indicative prices. Request the full PDF from the form.",
    tbl_unit: "Unit", tbl_area: "Area (m²)", tbl_price: "Price from", tbl_phase: "Phase", tbl_cta: "Download brochure",
    prices_disc: "Prices are indicative and subject to the developer's releases. Silver Sands ORA prices.",
    prices_dl: "Download the full price list (PDF)",
    payment_h: "Payment Plan", payment_p: "5% Down — 5% after 3 months — Installments over 8 years",
    eoi: "EOI: 5% of average unit price (Cheque or Bank Transfer)",
    gallery_eyebrow: "A glimpse of life here", gallery_h: "Details worth owning.",
    loc_eyebrow: "Location", loc_h: "KM 222 — The heart of the new coast.",
    loc_p: "Silver Sands ORA is located in Sidi Heneish, KM 222 North Coast — near Ras El Hekma and the new Fouka Road.",
    loc_points: ["4 km from Almaza Bay", "Near Ras El Hekma", "Direct Fouka Road access", "3 hours from Cairo"],
    contact_eyebrow: "Get in touch", contact_h: "Reach us the way you prefer.",
    contact_sub: "Register your details and an advisor calls you within minutes, or reach us directly now.",
    contact_form_h: "Register your interest", contact_form_sub: "A dedicated advisor contacts you within minutes with the full price list.",
    contact_submit: "Send request",
    contact_talk: "Talk to us now", contact_talk_sub: "A fast reply within minutes throughout the day.",
    contact_wa: "WhatsApp", contact_wa_sub: "Instant reply to your enquiry", contact_call: "Call now",
    faq_eyebrow: "Before you ask", faq_h: "Buyers' frequently asked questions.",
    faqs: [
      { q: "What's the minimum down payment?", a: "Contracting starts at just 5% down, with payment plans up to 8 years." },
      { q: "Who is the developer?", a: "ORA Developers (Naguib Sawiris) — Silver Sands ORA is one of the most prominent North Coast projects." },
      { q: "Are units fully finished?", a: "Yes, all Silver Sands ORA units (Silver Bay & Silver Walk) are fully finished." },
      { q: "Is it good for resale?", a: "KM 222 near Ras El Hekma, ORA's global brand, and strong demand all support value growth." },
      { q: "Silver Bay vs Silver Walk?", a: "Silver Bay: luxury cabins with private gardens by the lagoon. Silver Walk: modern 1-3 bed apartments with open sea views." },
    ],
    ft_disc: "Silver Sands ORA — an integrated coastal destination at KM 222, by ORA Developers. Marketing page — prices are indicative.",
    ft_agent: "Authorized sales team", ft_legal: "Marketing page. All prices, areas and plans are indicative and subject to change without notice. Trademarks belong to their owners.",
    mob_call: "Call", mob_wa: "WhatsApp", mob_reg: "Register now",
    pop_h: "Silver Sands ORA — Download Brochure", pop_sub: "Enter your number to download the full brochure with prices and payment plans.",
    pop_phone: "Mobile / WhatsApp", pop_name: "Full name", pop_submit: "Download brochure",
    pop_requests: ["Choose your request", "Silver Bay prices", "Silver Walk prices", "All unit prices", "Payment plans", "Book a site visit", "Investment consultation"],
    pop_done_h: "Done! Your brochure is on the way", pop_done_p: "If it didn't open automatically, an advisor will send it on WhatsApp right away.",
    prv_title: "Privacy Policy", prv_text: "We collect name, phone, and email only via the form — to contact you about Silver Sands ORA. Your data is encrypted and protected. We never sell or share your data.",
    cookie_text: "We use cookies to improve your experience and measure campaign performance.", cookie_accept: "Accept", cookie_more: "Privacy Policy",
  },
};

const UNITS = [
  { unit_ar: "Cabin 1 BDR", unit_en: "Cabin 1 BDR", area: "51 + 30", price_ar: "١٥,٦٠٠,٠٠٠", price_en: "15.6M", phase: "Silver Bay" },
  { unit_ar: "Cabin 2 BDR", unit_en: "Cabin 2 BDR", area: "102 + 35", price_ar: "٢٣,٧٠٠,٠٠٠", price_en: "23.7M", phase: "Silver Bay" },
  { unit_ar: "١ غرفة", unit_en: "1 Bedroom", area: "68", price_ar: "٨,٩٠٠,٠٠٠", price_en: "8.9M", phase: "Silver Walk" },
  { unit_ar: "٢ غرف", unit_en: "2 Bedrooms", area: "95", price_ar: "١٣,٢٠٠,٠٠٠", price_en: "13.2M", phase: "Silver Walk" },
  { unit_ar: "٣ غرف", unit_en: "3 Bedrooms", area: "134", price_ar: "٢٢,٩٠٠,٠٠٠", price_en: "22.9M", phase: "Silver Walk" },
];

const GALLERY = [
  { s: IMG.overview1, ar: "سيلفر ساندس أورا — المشروع", en: "Silver Sands ORA Overview" },
  { s: IMG.lagoon, ar: "بحيرة سيلفر ساندس أورا الكريستالية", en: "Silver Sands ORA Crystal Lagoon" },
  { s: IMG.aerial, ar: "سيلفر ساندس أورا — إطلالة مسائية", en: "Silver Sands ORA Dusk View" },
  { s: IMG.villa, ar: "فيلات سيلفر ساندس أورا", en: "Silver Sands ORA Villas" },
  { s: IMG.interior, ar: "تصميم داخلي فاخر — سيلفر ساندس أورا", en: "Silver Sands ORA Luxury Interior" },
  { s: IMG.town, ar: "المنطقة التجارية — سيلفر ساندس أورا", en: "Silver Sands ORA Town Center" },
];

/* ═══ COMPONENT ═══ */
export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [heroFs, setHeroFs] = useState<"idle" | "sending" | "sent">("idle");
  const [contactFs, setContactFs] = useState<"idle" | "sending" | "sent">("idle");
  const [showPop, setShowPop] = useState(false);
  const [popFs, setPopFs] = useState<"idle" | "sending" | "done">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPrv, setShowPrv] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLFormElement>(null);
  const popRef = useRef<HTMLFormElement>(null);
  const popTriggered = useRef(false);

  const t = T[lang];
  const waMsg = lang === "ar" ? "مرحباً، محتاج تفاصيل سيلفر ساندس أورا" : "Hi, I'm interested in Silver Sands ORA";
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  // Fade-in observer
  useEffect(() => {
    document.querySelectorAll(".fin").forEach((el) => {
      new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add("vis"); }, { threshold: 0.08 }).observe(el);
    });
  }, []);

  // Nav scroll effect
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Popup auto-trigger: 55% scroll OR 16s
  useEffect(() => {
    function trigger() {
      if (popTriggered.current) return;
      popTriggered.current = true;
      setShowPop(true);
      setPopFs("idle");
    }
    const timer = setTimeout(trigger, 16000);
    function onScroll() {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct >= 0.55) trigger();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Cookie consent
  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("cookie_ok")) {
      setTimeout(() => setShowCookie(true), 2500);
    }
  }, []);

  function acceptCookie() { setShowCookie(false); sessionStorage.setItem("cookie_ok", "1"); }

  async function submitForm(ref: React.RefObject<HTMLFormElement | null>, setState: (s: any) => void, src: string) {
    if (!ref.current) return;
    setState("sending");
    const fd = new FormData(ref.current);
    const pl: Record<string, string> = {};
    fd.forEach((v, k) => (pl[k] = v.toString()));
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(pl) });
      const d = await res.json();
      if (d.success) { setState("sent"); trackLead(src); ref.current.reset(); if (src === "hero_form") setTimeout(() => router.push("/thank-you"), 1200); }
      else throw 0;
    } catch { setState("idle"); }
  }

  function openBrochure() { setShowPop(true); setPopFs("idle"); }
  function closeBrochure() { setShowPop(false); }

  async function submitBrochure(e: FormEvent) {
    e.preventDefault();
    if (!popRef.current) return;
    setPopFs("sending");
    const fd = new FormData(popRef.current);
    const pl: Record<string, string> = {};
    fd.forEach((v, k) => (pl[k] = v.toString()));
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(pl) });
      const d = await res.json();
      if (d.success) { setPopFs("done"); trackLead("brochure"); setTimeout(() => { window.open(waUrl, "_blank"); closeBrochure(); }, 2000); }
      else throw 0;
    } catch { setPopFs("idle"); }
  }

  return (
    <div dir={t.dir} style={{ fontFamily: t.font }} className="page">

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}><div className="nav-in">
        <a className="nav-logo" href="#"><img src={IMG.ssLogo} alt="Silver Sands" style={{ height: 22 }} /><span>SILVER SANDS<small>BY ORA</small></span></a>
        <div className="nav-r">
          <button className="nav-lang" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>{t.nav_lang}</button>
          <a className="nav-cta" href="#contact">{t.nav_cta}</a>
        </div>
      </div></nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg"><img src={IMG.hero} alt="سيلفر ساندس أورا Silver Sands ORA" onError={(e: any) => { e.target.onerror = null; e.target.src = IMG.hero2; }} /><div className="hero-overlay" /></div>
        <div className="hero-in">
          <div className="hero-left">
            <p className="eyebrow">{t.hero_eyebrow}</p>
            <h1 className="hero-h">{t.hero_h1}<br /><em>{t.hero_h1b}</em></h1>
            <p className="hero-p">{t.hero_p}</p>
            <div className="hero-stats">
              <div className="hero-stat"><strong>{t.stat1v}</strong><span>{t.stat1l}</span></div>
              <div className="hero-stat"><strong>{t.stat2v}</strong><span>{t.stat2l}</span></div>
              <div className="hero-stat"><strong>{t.stat3v}</strong><span>{t.stat3l}</span></div>
            </div>
          </div>
          <div className="hero-form-wrap">
            {heroFs === "sent" ? <div className="form-success"><div className="form-check">✓</div><h3>{t.f_sent_h}</h3><p>{t.f_sent_p}</p></div>
            : <>
              <h3 className="form-h">{t.form_h}</h3>
              <p className="form-sub">{t.form_sub}</p>
              <form ref={heroRef} onSubmit={(e: FormEvent) => { e.preventDefault(); submitForm(heroRef, setHeroFs, "hero_form"); }}>
                <input type="hidden" name="access_key" value={WEB3_KEY} /><input type="hidden" name="subject" value="Lead — Silver Sands ORA" /><input type="hidden" name="from_name" value="SS Landing" /><input type="checkbox" name="botcheck" className="hidden" />
                <div className="ff"><input name="name" placeholder={t.f_name} required /></div>
                <div className="ff"><input name="phone" type="tel" placeholder={t.f_phone} required /></div>
                <div className="ff"><select name="unit_type">{t.f_units.map((u, i) => <option key={i} value={i === 0 ? "" : u}>{u}</option>)}</select></div>
                <button type="submit" className="btn-primary" disabled={heroFs === "sending"}>{heroFs === "sending" ? "..." : t.f_submit}</button>
                <p className="form-disc">{t.f_disc}</p>
              </form>
            </>}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="strip fin"><div className="strip-in">
        <div className="strip-item"><div className="strip-icon">◆</div><div><strong>{t.strip1}</strong><span>{t.strip1s}</span></div></div>
        <div className="strip-item"><div className="strip-icon">◆</div><div><strong>{t.strip2}</strong><span>{t.strip2s}</span></div></div>
        <div className="strip-item"><div className="strip-icon">✓</div><div><strong>{t.strip3}</strong><span>{t.strip3s}</span></div></div>
      </div></section>

      {/* DEVELOPER */}
      <section className="developer fin" id="developer"><div className="sec-in">
        <div className="dev-grid">
          <div className="dev-content">
            <p className="eyebrow">{t.dev_eyebrow}</p>
            <h2 className="sec-h">{t.dev_h}</h2>
            <p className="sec-p">{t.dev_p}</p>
            <div className="dev-stats">
              {t.dev_stats.map((s, i) => <div key={i} className="dev-stat"><strong>{s.v}</strong><span>{s.l}</span></div>)}
            </div>
          </div>
          <div className="dev-image">
            <img src={IMG.founder} alt="Naguib Sawiris نجيب ساويرس" />
            <div className="dev-image-label"><strong>Eng. Naguib Sawiris</strong><span>Chairman — ORA Developers</span></div>
          </div>
        </div>
      </div></section>

      {/* ABOUT */}
      <section className="about fin" id="about"><div className="sec-in">
        <p className="eyebrow">{t.about_eyebrow}</p>
        <h2 className="sec-h">{t.about_h}</h2>
        <p className="sec-p">{t.about_p}</p>
        <div className="stats-grid">{t.about_stats.map((s, i) => <div key={i} className="stat-card"><strong>{s.v}</strong><span>{s.l}</span></div>)}</div>
      </div></section>

      {/* COLLECTIONS */}
      <section className="collections fin" id="collections"><div className="sec-in">
        <p className="eyebrow">{t.coll_eyebrow}</p>
        <h2 className="sec-h">{t.coll_h}</h2>
        <div className="coll-grid">
          <div className="coll-card">
            <div className="coll-img"><img src={IMG.cabin} alt="Silver Bay" /></div>
            <div className="coll-info">
              <h3>{t.bay_name}</h3><span className="coll-tag">{t.bay_tag}</span>
              <p>{t.bay_desc}</p>
              <div className="coll-meta"><div><span>{t.price_l}</span><strong>EGP 15.6M</strong></div><div><span>{t.plan_l}</span><strong>5%+5% · 8 yrs</strong></div></div>
              <button className="btn-brochure" onClick={openBrochure}>{t.tbl_cta}</button>
            </div>
          </div>
          <div className="coll-card">
            <div className="coll-img"><img src={IMG.walk} alt="Silver Walk" /></div>
            <div className="coll-info">
              <h3>{t.walk_name}</h3><span className="coll-tag">{t.walk_tag}</span>
              <p>{t.walk_desc}</p>
              <div className="coll-meta"><div><span>{t.price_l}</span><strong>EGP 8.9M</strong></div><div><span>{t.plan_l}</span><strong>5%+5% · 8 yrs</strong></div></div>
              <button className="btn-brochure" onClick={openBrochure}>{t.tbl_cta}</button>
            </div>
          </div>
        </div>
      </div></section>

      {/* PRICES */}
      <section className="prices fin" id="prices"><div className="sec-in">
        <p className="eyebrow">{t.prices_eyebrow}</p>
        <h2 className="sec-h">{t.prices_h}</h2>
        <p className="sec-p">{t.prices_sub}</p>
        <div className="tbl-wrap"><table className="price-tbl">
          <thead><tr><th>{t.tbl_unit}</th><th>{t.tbl_area}</th><th>{t.tbl_price}</th><th>{t.tbl_phase}</th><th></th></tr></thead>
          <tbody>{UNITS.map((u, i) => (
            <tr key={i}>
              <td>{lang === "ar" ? u.unit_ar : u.unit_en}</td>
              <td>{u.area} m²</td>
              <td className="td-price">{lang === "ar" ? u.price_ar : u.price_en} {lang === "ar" ? "جنيه" : "EGP"}</td>
              <td>{u.phase}</td>
              <td><button className="tbl-dl" onClick={openBrochure}>{t.tbl_cta}</button></td>
            </tr>
          ))}</tbody>
        </table></div>
        <p className="tbl-disc">{t.prices_disc}</p>
        <div className="payment-box"><h4>{t.payment_h}</h4><p>{t.payment_p}</p><p className="eoi">{t.eoi}</p></div>
        <button className="btn-primary dl-full" onClick={openBrochure}>{t.prices_dl}</button>
      </div></section>

      {/* GALLERY */}
      <section className="gallery fin"><div className="sec-in">
        <p className="eyebrow">{t.gallery_eyebrow}</p>
        <h2 className="sec-h">{t.gallery_h}</h2>
        <div className="gal-grid">{GALLERY.map((g, i) => (
          <div key={i} className={`gal-item ${i === 0 ? "gal-featured" : ""}`}><img src={g.s} alt={lang === "ar" ? g.ar : g.en} /><em>{lang === "ar" ? g.ar : g.en}</em></div>
        ))}</div>
      </div></section>

      {/* LOCATION */}
      <section className="location fin" id="location"><div className="sec-in">
        <p className="eyebrow">{t.loc_eyebrow}</p>
        <h2 className="sec-h">{t.loc_h}</h2>
        <p className="sec-p">{t.loc_p}</p>
        <div className="loc-grid">{t.loc_points.map((p, i) => (
          <div key={i} className="loc-point"><div className="loc-dot" /><span>{p}</span></div>
        ))}</div>
      </div></section>

      {/* CONTACT */}
      <section className="contact fin" id="contact"><div className="sec-in">
        <p className="eyebrow">{t.contact_eyebrow}</p>
        <h2 className="sec-h">{t.contact_h}</h2>
        <p className="sec-p">{t.contact_sub}</p>
        <div className="contact-grid">
          <div className="contact-form-box">
            {contactFs === "sent" ? <div className="form-success sm"><div className="form-check">✓</div><h3>{t.f_sent_h}</h3><p>{t.f_sent_p}</p></div>
            : <>
              <h3>{t.contact_form_h}</h3><p className="form-sub">{t.contact_form_sub}</p>
              <form ref={contactRef} onSubmit={(e: FormEvent) => { e.preventDefault(); submitForm(contactRef, setContactFs, "contact"); }}>
                <input type="hidden" name="access_key" value={WEB3_KEY} /><input type="hidden" name="subject" value="Contact — Silver Sands ORA" /><input type="hidden" name="from_name" value="SS Contact" /><input type="checkbox" name="botcheck" className="hidden" />
                <div className="ff"><input name="name" placeholder={t.f_name} required /></div>
                <div className="ff"><input name="phone" type="tel" placeholder={t.f_phone} required /></div>
                <div className="ff"><select name="unit_type">{t.f_units.map((u, i) => <option key={i} value={i === 0 ? "" : u}>{u}</option>)}</select></div>
                <button type="submit" className="btn-primary" disabled={contactFs === "sending"}>{contactFs === "sending" ? "..." : t.contact_submit}</button>
                <p className="form-disc">{t.f_disc}</p>
              </form>
            </>}
          </div>
          <div className="contact-direct">
            <h3>{t.contact_talk}</h3><p>{t.contact_talk_sub}</p>
            <a className="wa-btn" href={waUrl} target="_blank" rel="noopener" onClick={() => trackWA("contact")}><WhatsAppIcon /><div><strong>{t.contact_wa}</strong><span>{t.contact_wa_sub}</span></div></a>
            <a className="call-btn" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("contact")}><PhoneIcon /><strong>{t.contact_call}</strong><span>{PHONE_DISPLAY}</span></a>
          </div>
        </div>
      </div></section>

      {/* FAQ */}
      <section className="faq fin"><div className="sec-in">
        <p className="eyebrow">{t.faq_eyebrow}</p>
        <h2 className="sec-h">{t.faq_h}</h2>
        <div className="faq-list">{t.faqs.map((f, i) => (
          <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
            <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className="faq-arrow">{openFaq === i ? "−" : "+"}</span></button>
            {openFaq === i && <div className="faq-a"><p>{f.a}</p></div>}
          </div>
        ))}</div>
      </div></section>

      {/* FOOTER */}
      <footer className="ft"><div className="ft-in">
        <div className="ft-top">
          <a href="#" className="ft-logo"><img src={IMG.ssLogo} alt="Silver Sands" style={{ height: 18 }} /><span>SILVER SANDS<small>BY ORA</small></span></a>
          <p>{t.ft_disc}</p>
        </div>
        <p className="ft-agent">{t.ft_agent}</p>
        <div className="ft-links">
          <a href={`tel:${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
          <a href={waUrl} target="_blank" rel="noopener">{t.contact_wa}</a>
          <a href="#contact">{t.nav_cta}</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>
        <p className="ft-legal">{t.ft_legal}</p>
      </div></footer>

      {/* FLOATING WA */}
      <a className="float-wa" href={waUrl} target="_blank" rel="noopener" onClick={() => trackWA("float")}><WhatsAppIcon /></a>

      {/* MOBILE BAR */}
      <nav className="mbar"><div className="mbar-in">
        <a href={`tel:${PHONE_INTL}`} onClick={() => trackCall("mob")}><PhoneIcon /> {t.mob_call}</a>
        <a href={waUrl} target="_blank" rel="noopener" onClick={() => trackWA("mob")} className="mbar-wa"><WhatsAppIcon /> {t.mob_wa}</a>
        <a href="#contact" className="mbar-reg">{t.mob_reg}</a>
      </div></nav>

      {/* BROCHURE POPUP */}
      {showPop && <>
        <div className="pop-bk" onClick={closeBrochure} />
        <div className="pop-dlg" dir={t.dir}>
          <button className="pop-x" onClick={closeBrochure}>✕</button>
          {popFs === "done" ? <div className="form-success sm"><div className="form-check">✓</div><h3>{t.pop_done_h}</h3><p>{t.pop_done_p}</p></div>
          : <>
            <h3>{t.pop_h}</h3><p className="pop-sub">{t.pop_sub}</p>
            <form ref={popRef} onSubmit={submitBrochure}>
              <input type="hidden" name="access_key" value={WEB3_KEY} /><input type="hidden" name="subject" value="Brochure — Silver Sands ORA" /><input type="hidden" name="from_name" value="SS Brochure" /><input type="checkbox" name="botcheck" className="hidden" />
              <div className="ff"><input name="name" placeholder={t.pop_name} required /></div>
              <div className="ff"><input name="phone" type="tel" placeholder={t.pop_phone} required /></div>
              <div className="ff"><select name="request">{t.pop_requests.map((r, i) => <option key={i} value={i === 0 ? "" : r}>{r}</option>)}</select></div>
              <button type="submit" className="btn-primary" disabled={popFs === "sending"}>{popFs === "sending" ? "..." : t.pop_submit}</button>
            </form>
          </>}
        </div>
      </>}

      {/* PRIVACY MODAL */}
      {showPrv && <><div className="pop-bk" onClick={() => setShowPrv(false)} /><div className="pop-dlg" dir={t.dir}><button className="pop-x" onClick={() => setShowPrv(false)}>✕</button><h3>{t.prv_title}</h3><p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--muted)", marginTop: 12 }}>{t.prv_text}</p></div></>}

      {/* COOKIE CONSENT */}
      {showCookie && <div className="cookie-bar">
        <p>{t.cookie_text}</p>
        <div className="cookie-actions">
          <button onClick={acceptCookie} className="cookie-accept">{t.cookie_accept}</button>
          <button onClick={() => { setShowCookie(false); setShowPrv(true); }} className="cookie-more">{t.cookie_more}</button>
        </div>
      </div>}

    </div>
  );
}
