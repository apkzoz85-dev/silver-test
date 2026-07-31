export type Lang = "ar" | "en";

export const content = {
  ar: {
    dir: "rtl" as const,
    langLabel: "EN",
    nav: { register: "سجّل اهتمامك", call: "اتصل بنا", whatsapp: "واتساب" },
    hero: {
      eyebrow: "إطلاق جديد · لأول مرة داخل سيلفر ساندس",
      title1: "سيلفر ووك & سيلفر باي",
      title2: "إقامة على اللاجون.. والحياة على البروميناد",
      sub: "وحدات مطلة مباشرة على اللاجون داخل سيلفر ساندس الساحل الشمالي من أورا — شاطئ رملي، ممشى حيوي بالمطاعم والكافيهات، وتشطيب كامل بالتكييفات.",
      cta: "سجّل اهتمامك الآن",
      ctaWa: "كلمنا واتساب",
      trust: "التسويق عبر فريق مبيعات معتمد — نوصلك بأسعار الإطلاق الرسمية وأولوية الاختيار",
    },
    stats: [
      { value: "724", label: "فدان مساحة المشروع" },
      { value: "1.4 كم", label: "شاطئ مباشر" },
      { value: "160,000 م²", label: "لاجونز كريستالية" },
      { value: "4 كم", label: "من مطار العلمين (ألماظة)" },
    ],
    about: {
      eyebrow: "الوجهة",
      title: "سيلفر ساندس.. توقيع أورا في رأس الحكمة",
      body: "على مساحة 724 فدان في قلب رأس الحكمة، طوّرت أورا العقارية بقيادة المهندس نجيب ساويرس وجهة ساحلية متكاملة بشاطئ يمتد 1.4 كيلومتر ولاجونز كريستالية تتجاوز 160 ألف متر مربع. سيلفر ساندس مش مجرد قرية مصيفية — هي امتداد لخبرة أورا في الجونة، بنفس فلسفة الداون تاون الحي اللي عايش طول السنة.",
      body2: "وموقعها على بعد 4 كيلومترات فقط من مطار العلمين الدولي يخليها من أسهل وجهات الساحل وصولًا — سواء للمصيف أو للاستثمار في منطقة رأس الحكمة اللي بقت أسرع مناطق مصر نموًا في قيمة الأراضي.",
    },
    launch: {
      eyebrow: "الإطلاق الجديد",
      title: "سيلفر ووك & سيلفر باي",
      body: "لأول مرة داخل سيلفر ساندس: وحدات سكنية مرفوعة فوق بروميناد حي على اللاجون مباشرة — كافيهات ومطاعم ومحلات تحتك، وشاطئ رملي وميّه كريستالية قدامك. خصوصية كاملة فوق، وحياة كاملة تحت.",
      features: [
        "إطلالة مباشرة على اللاجون مع وصول مباشر للشاطئ الرملي",
        "بروميناد حيوي بالكافيهات والمطاعم والريتيل — بيعيش نهارًا وليلًا",
        "تشطيب كامل سوبر لوكس + تكييفات",
        "عدد وحدات محدود جدًا في هذه المرحلة",
      ],
    },
    units: {
      eyebrow: "الوحدات",
      title: "اختار عنوانك على الميّه",
      note: "الأسعار استرشادية وقابلة للتغيير من المطور — سجّل للحصول على قائمة الأسعار الرسمية المحدثة.",
      cards: [
        {
          type: "شقة غرفة نوم",
          area: "68 م²",
          desc: "تراس بإطلالة على اللاجون والبروميناد — مثالية للاستثمار والإيجار الفندقي",
          price: "8.9 مليون جنيه",
          priceLabel: "السعر يبدأ من",
          cta: "احجز اهتمامك",
        },
        {
          type: "شقة غرفتين نوم",
          area: "95 م²",
          desc: "ماستر سويت ومعيشة مفتوحة وتراس — التوازن المثالي بين المصيف والاستثمار",
          price: "13.2 مليون جنيه",
          priceLabel: "السعر يبدأ من",
          cta: "احجز اهتمامك",
        },
        {
          type: "شقة 3 غرف نوم",
          area: "134 م²",
          desc: "معيشة عائلية وغرفة خادمة وتراس واسع — لعائلة بتقضي الصيف كله على البحر",
          price: "22.97 مليون جنيه",
          priceLabel: "السعر يبدأ من",
          cta: "احجز اهتمامك",
        },
      ],
    },
    payment: {
      eyebrow: "خطة السداد",
      title: "تملّك على مهلك.. زي هدوء الشاطئ",
      items: [
        { value: "5%", label: "مقدم تعاقد", desc: "والباقي مقسط بالكامل" },
        { value: "8 سنين", label: "فترة سداد", desc: "أقساط مريحة وممتدة" },
        { value: "5%", label: "جدية حجز (EOI)", desc: "تضمن مكانك في أولوية الإطلاق" },
      ],
    },
    why: {
      eyebrow: "ليه تسجّل معانا؟",
      title: "مبيعات معتمدة.. بدون أي تكلفة إضافية",
      items: [
        {
          title: "أسعار المطور الرسمية",
          desc: "نفس قائمة أسعار أورا بالظبط — لا عمولة ولا أي رسوم عليك كعميل.",
        },
        {
          title: "أولوية اختيار الوحدات",
          desc: "الوحدات محدودة جدًا — التسجيل المبكر يضمنلك أولوية في اختيار الدور والإطلالة.",
        },
        {
          title: "استشارة قبل القرار",
          desc: "مقارنة بين الوحدات والمراحل، وتحليل عائد الاستثمار المتوقع في رأس الحكمة.",
        },
      ],
    },
    form: {
      eyebrow: "سجّل اهتمامك",
      title: "سيب بياناتك.. وهنرجعلك بالماستر بلان والأسعار الرسمية",
      sub: "فريقنا هيتواصل معاك في نفس يوم التسجيل بكل تفاصيل سيلفر ووك & سيلفر باي.",
      name: "الاسم بالكامل",
      phone: "رقم الموبايل / واتساب",
      email: "البريد الإلكتروني (اختياري)",
      unit: "الوحدة اللي تهمك",
      unitOptions: ["لسه محددتش", "غرفة نوم · 68 م²", "غرفتين نوم · 95 م²", "3 غرف نوم · 134 م²"],
      buyer: "الغرض",
      buyerOptions: ["مصيف شخصي", "استثمار", "الاتنين"],
      submit: "اطلب مكالمة الآن",
      submitting: "جاري الإرسال...",
      disclosure:
        "بالضغط على الإرسال، أنت توافق على تواصل فريق مبيعات معتمد ومستقل معك بخصوص المشروع. الأسعار استرشادية وقابلة للتغيير.",
      error: "حصلت مشكلة في الإرسال — جرّب تاني أو كلمنا واتساب مباشرة.",
    },
    popup: {
      title: "الوحدات محدودة جدًا في الإطلاق",
      body: "سجّل دلوقتي واضمن أولوية الاختيار وقائمة الأسعار الرسمية قبل نفاد المرحلة.",
      cta: "سجّل اهتمامك",
      close: "لاحقًا",
    },
    sticky: { call: "اتصال", wa: "واتساب", form: "سجّل" },
    footer: {
      about:
        "سيلفر ووك & سيلفر باي — إطلاق جديد على اللاجون داخل سيلفر ساندس الساحل الشمالي، تطوير أورا العقارية.",
      linksTitle: "روابط",
      links: [
        { href: "/about", label: "من نحن" },
        { href: "/privacy", label: "سياسة الخصوصية" },
        { href: "/disclaimer", label: "إخلاء المسؤولية" },
      ],
      contactTitle: "تواصل معنا",
      location: "الساحل الشمالي · رأس الحكمة، مصر",
      disclaimer:
        "إخلاء مسؤولية: هذه الصفحة منشورة بواسطة فريق مبيعات عقاري معتمد ومستقل، وهي ليست الموقع الرسمي لشركة أورا للتطوير العقاري أو مشروع سيلفر ساندس. جميع العلامات التجارية وأسماء المشاريع والصور ملك لأصحابها وتُستخدم لأغراض التسويق والترشيح فقط. الأسعار والمساحات وخطط السداد استرشادية ومقدمة من المطور وقابلة للتغيير دون إشعار مسبق، ولا تُعد عرضًا تعاقديًا.",
      rights: "جميع الحقوق محفوظة. سيلفر ساندس مشروع تطوير أورا.",
    },
    cookie: {
      text: "بنستخدم كوكيز لتحسين تجربتك وقياس أداء الحملات الإعلانية.",
      accept: "موافق",
    },
    thankYou: {
      title: "تم استلام طلبك بنجاح ✓",
      body: "فريقنا هيتواصل معاك في أقرب وقت بكل تفاصيل سيلفر ووك & سيلفر باي — الماستر بلان، الأسعار الرسمية، وخطط السداد.",
      wa: "أو كلمنا واتساب فورًا",
      back: "الرجوع للصفحة الرئيسية",
    },
  },

  en: {
    dir: "ltr" as const,
    langLabel: "عربي",
    nav: { register: "Register Interest", call: "Call Us", whatsapp: "WhatsApp" },
    hero: {
      eyebrow: "New Launch · First Time at Silversands",
      title1: "Silver Walk & Silver Bay",
      title2: "Live on the lagoon. Stroll the promenade.",
      sub: "Lagoon-front residences within Silversands North Coast by ORA — a sandy beach, a lively promenade of cafés and restaurants, delivered fully finished with air conditioning.",
      cta: "Register Your Interest",
      ctaWa: "WhatsApp Us",
      trust: "Marketed by an authorized sales team — official launch pricing and priority unit selection",
    },
    stats: [
      { value: "724", label: "Feddans of destination" },
      { value: "1.4 km", label: "Direct beachfront" },
      { value: "160,000 sqm", label: "Crystal lagoons" },
      { value: "4 km", label: "To Almaza Airport" },
    ],
    about: {
      eyebrow: "The Destination",
      title: "Silversands — ORA's signature in Ras El Hekma",
      body: "Across 724 feddans in the heart of Ras El Hekma, ORA Developers — led by Naguib Sawiris — has built a complete coastal destination with 1.4 km of beachfront and over 160,000 sqm of crystal lagoons. Silversands is not a seasonal village; it extends ORA's El Gouna philosophy of a downtown that lives all year round.",
      body2: "Just 4 km from Almaza (El Alamein) International Airport, it is one of the most accessible destinations on the coast — for summers, and for investing in Ras El Hekma, Egypt's fastest-appreciating coastal market.",
    },
    launch: {
      eyebrow: "The New Launch",
      title: "Silver Walk & Silver Bay",
      body: "For the first time at Silversands: elevated residences woven directly into a living lagoon-front promenade — cafés, restaurants and retail below, a sandy beach and crystal water ahead. Full privacy above, full life below.",
      features: [
        "Direct lagoon views with sandy beach access",
        "A waterfront promenade of cafés, restaurants & retail — alive day and night",
        "Delivered fully finished with air conditioning",
        "Very, very limited units in this phase",
      ],
    },
    units: {
      eyebrow: "Residences",
      title: "Choose your address by the water",
      note: "Prices are indicative and subject to change by the developer — register for the updated official price list.",
      cards: [
        {
          type: "1-Bedroom Apartment",
          area: "68 sqm",
          desc: "Terrace with lagoon & promenade views — ideal for investment and hospitality rental",
          price: "EGP 8.9M",
          priceLabel: "Starting from",
          cta: "Reserve interest",
        },
        {
          type: "2-Bedroom Apartment",
          area: "95 sqm",
          desc: "Master suite, open living and terrace — the balance of summer home and investment",
          price: "EGP 13.2M",
          priceLabel: "Starting from",
          cta: "Reserve interest",
        },
        {
          type: "3-Bedroom Apartment",
          area: "134 sqm",
          desc: "Family living, maid's room and a wide terrace — for a family that spends the whole summer by the sea",
          price: "EGP 22.97M",
          priceLabel: "Starting from",
          cta: "Reserve interest",
        },
      ],
    },
    payment: {
      eyebrow: "Payment Plan",
      title: "Ownership as relaxed as the shore",
      items: [
        { value: "5%", label: "Down payment", desc: "Balance fully installed" },
        { value: "8 years", label: "To pay", desc: "Comfortable, extended instalments" },
        { value: "5%", label: "EOI", desc: "Secures your place in launch priority" },
      ],
    },
    why: {
      eyebrow: "Why register with us?",
      title: "Authorized sales — at zero extra cost",
      items: [
        {
          title: "Official developer pricing",
          desc: "The exact same ORA price list — no commission or fees charged to you as a buyer.",
        },
        {
          title: "Priority unit selection",
          desc: "Units are very limited — early registration secures your priority on floor and view.",
        },
        {
          title: "Advice before you decide",
          desc: "Unit and phase comparisons, plus expected ROI analysis for Ras El Hekma.",
        },
      ],
    },
    form: {
      eyebrow: "Register Your Interest",
      title: "Leave your details — we'll call back with the masterplan & official pricing",
      sub: "Our team will contact you the same day with full details of Silver Walk & Silver Bay.",
      name: "Full name",
      phone: "Phone / WhatsApp",
      email: "Email (optional)",
      unit: "Unit of interest",
      unitOptions: ["Not sure yet", "1 Bedroom · 68 sqm", "2 Bedroom · 95 sqm", "3 Bedroom · 134 sqm"],
      buyer: "Buyer type",
      buyerOptions: ["Personal use", "Investment", "Both"],
      submit: "Request my callback",
      submitting: "Sending...",
      disclosure:
        "By submitting, you agree to be contacted by an independent authorized sales team about this project. Prices are indicative and subject to change.",
      error: "Something went wrong — please try again or reach us directly on WhatsApp.",
    },
    popup: {
      title: "Very limited launch units",
      body: "Register now to secure selection priority and the official price list before this phase sells out.",
      cta: "Register Interest",
      close: "Later",
    },
    sticky: { call: "Call", wa: "WhatsApp", form: "Register" },
    footer: {
      about:
        "Silver Walk & Silver Bay — a new lagoon-front launch within Silversands North Coast, developed by ORA.",
      linksTitle: "Links",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/disclaimer", label: "Disclaimer" },
      ],
      contactTitle: "Contact",
      location: "North Coast · Ras El Hekma, Egypt",
      disclaimer:
        "Disclaimer: This page is published by an independent, authorized real-estate sales team and is not the official website of ORA Developers or Silversands North Coast. All trademarks, project names and imagery belong to their respective owners and are used for marketing and referral purposes only. Prices, areas and payment terms are indicative, provided by the developer, and subject to change without notice. This is not a contractual offer.",
      rights: "All rights reserved. Silversands is a development by ORA.",
    },
    cookie: {
      text: "We use cookies to improve your experience and measure ad campaign performance.",
      accept: "Accept",
    },
    thankYou: {
      title: "Request received ✓",
      body: "Our team will contact you shortly with everything about Silver Walk & Silver Bay — masterplan, official pricing and payment plans.",
      wa: "Or WhatsApp us right away",
      back: "Back to home",
    },
  },
};
