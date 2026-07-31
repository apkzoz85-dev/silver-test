"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { content, type Lang } from "@/lib/content";
import { IMG } from "@/lib/images";
import { trackCall, trackFormLead, trackWhatsApp } from "@/lib/tracking";

// ============================================================
// بيانات التواصل — Silversands (Silver Walk & Silver Bay / ORA)
// ============================================================
const PHONE = "01123863254";
const PHONE_DISPLAY = "011 2386 3254";
const PHONE_INTL = "+201123863254";
const WA_NUMBER = "201123863254";
const WA_MESSAGE = encodeURIComponent(
  "مرحبًا، أريد أحدث أسعار وتوافر سيلفر ساندس (سيلفر ووك & سيلفر باي) 🌊"
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// TODO: ضع مفتاح Web3Forms هنا
const WEB3_KEY = "YOUR_WEB3FORMS_ACCESS_KEY_HERE";
// ============================================================

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============ Lead Form ============ */
function LeadForm({ lang, source }: { lang: Lang; source: string }) {
  const t = content[lang].form;
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3_KEY,
          subject: "New Lead — Silversands (Silver Walk & Silver Bay)",
          from_name: "Silversands Landing",
          botcheck: "",
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email") || "N/A",
          unit: data.get("unit"),
          buyer_type: data.get("buyer_type"),
          form_source: source,
          language: lang,
        }),
      });
      const json = await res.json();
      if (json.success) {
        trackFormLead();
        router.push("/thank-you");
      } else setError(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    "w-full rounded-xl px-4 py-3.5 bg-white border border-[var(--line)] text-ink placeholder:text-ink/40 focus:border-ocean transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <input name="name" required placeholder={`${t.name} *`} aria-label={t.name} className={field} />
      <input
        name="phone" type="tel" inputMode="tel" required placeholder={`${t.phone} *`}
        aria-label={t.phone} className={field}
      />
      <input name="email" type="email" placeholder={t.email} aria-label={t.email} className={field} />
      <div className="grid sm:grid-cols-2 gap-3.5">
        <select name="unit" aria-label={t.unit} className={field} defaultValue={t.unitOptions[0]}>
          {t.unitOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <select name="buyer_type" aria-label={t.buyer} className={field} defaultValue={t.buyerOptions[0]}>
          {t.buyerOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={submitting} className="btn-gold w-full rounded-full py-4 text-lg disabled:opacity-60">
        {submitting ? t.submitting : t.submit}
      </button>
      {error && <p className="text-red-600 text-sm text-center">{t.error}</p>}
      <p className="text-[11px] leading-relaxed text-ink/50 text-center">{t.disclosure}</p>
    </form>
  );
}

/* ============ Page ============ */
export default function Page() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = content[lang];

  const [popupOpen, setPopupOpen] = useState(false);
  const popupShown = useRef(false);
  const [cookieOk, setCookieOk] = useState(true);

  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  useEffect(() => {
    setCookieOk(localStorage.getItem("cookie-ok") === "1");
  }, []);

  // Hero slideshow — crossfade every 6s (respects reduced motion)
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % IMG.heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("popup-shown") === "1") return;
    const open = () => {
      if (popupShown.current) return;
      popupShown.current = true;
      sessionStorage.setItem("popup-shown", "1");
      setPopupOpen(true);
    };
    const timer = setTimeout(open, 16000);
    const onScroll = () => {
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (p >= 0.55) open();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToForm = useCallback(() => {
    setPopupOpen(false);
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const onCall = () => trackCall();
  const onWa = () => trackWhatsApp();

  const updated = new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  const sectionHead = (eyebrow: string, title: string, light?: boolean) => (
    <div className="reveal mb-10">
      <p className={`eyebrow-gold mb-3 ${light ? "" : ""}`}>{eyebrow}</p>
      <h2 className={`text-3xl sm:text-[2.5rem] leading-snug ${light ? "text-white" : "text-navy"} ${lang === "en" ? "display-en font-semibold" : "display-ar"}`}>
        {title}
      </h2>
    </div>
  );

  return (
    <main className="min-h-screen overflow-x-clip">
      {/* ===== Top bar ===== */}
      <div className="bg-navy-deep text-center text-[13px] sm:text-sm py-2 px-3">
        <span className="text-gold font-bold">{t.topBar}</span>
      </div>

      {/* ===== Header ===== */}
      <header className="sticky top-0 z-40 bg-paper/92 backdrop-blur-md border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="display-en text-[1.35rem] font-semibold text-navy whitespace-nowrap">Silversands</span>
            <span className="text-ink/55 text-[11px] hidden sm:inline whitespace-nowrap">
              {lang === "ar" ? "سيدي حنيش · الساحل الشمالي" : "Sidi Heneish · North Coast"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="btn-outline-navy text-sm rounded-full px-3.5 py-1.5"
              aria-label="Switch language"
            >
              {t.langLabel}
            </button>
            <a
              href={`tel:${PHONE_INTL}`} onClick={onCall} dir="ltr"
              className="hidden md:inline-block btn-outline-navy text-sm rounded-full px-4 py-1.5"
            >
              {PHONE_DISPLAY}
            </a>
            <button onClick={scrollToForm} className="btn-gold text-sm rounded-full px-4 sm:px-5 py-2 whitespace-nowrap">
              {t.nav.register}
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero (reference style: full photo, light overlay) ===== */}
      <section className="relative min-h-[92vh] flex items-center">
        {IMG.heroSlides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 img-cover transition-opacity duration-[1800ms] ease-in-out"
            style={{ backgroundImage: `url('${src}')`, opacity: slide === i ? 1 : 0 }}
            aria-hidden="true"
          />
        ))}
        <div className="absolute inset-0 bg-[#0c2434]/42" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 w-full">
          <p className="eyebrow-gold mb-4">{t.hero.eyebrow}</p>
          <h1
            className={`text-white mb-3 ${
              lang === "en"
                ? "display-en font-semibold text-5xl sm:text-7xl"
                : "display-ar text-4xl sm:text-6xl"
            }`}
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
          >
            {t.hero.title1}
          </h1>
          <p className={`text-gold mb-6 ${lang === "en" ? "display-en italic text-2xl sm:text-3xl" : "display-ar text-xl sm:text-3xl"}`}>
            {t.hero.title2}
          </p>
          <p className="max-w-2xl text-white/95 text-base sm:text-lg leading-relaxed mb-7" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.3)" }}>
            {t.hero.sub}
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {t.hero.badges.map((b, i) => (
              <span key={i} className="pill-hero rounded-full px-4 py-2 text-sm">{b}</span>
            ))}
            <span className="pill-hero rounded-full px-4 py-2 text-sm" suppressHydrationWarning>
              {lang === "ar" ? `آخر تحديث: ${updated}` : `Last updated: ${updated}`}
            </span>
          </div>

          {/* Buttons row (gold / ghost / teal) */}
          <div className="flex flex-wrap gap-3 mb-7">
            <button onClick={scrollToForm} className="btn-gold rounded-full px-8 py-4 text-base sm:text-lg">
              {t.hero.cta}
            </button>
            <button onClick={scrollToForm} className="btn-ghost-hero rounded-full px-7 py-4 text-base sm:text-lg">
              {t.hero.ctaGhost}
            </button>
            <a
              href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer"
              className="btn-wa rounded-full px-7 py-4 text-base sm:text-lg inline-flex items-center gap-2"
            >
              <WaIcon /> {t.hero.ctaWa}
            </a>
          </div>
          <p className="text-sm text-white/85" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
            ✓ {t.hero.trust}
          </p>
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <div className="bg-cream border-y border-[var(--line)] py-3.5 overflow-hidden" dir="ltr">
        <div className="marquee-track">
          {[...t.marquee, ...t.marquee].map((m, i) => (
            <span key={i} className="mx-5 whitespace-nowrap text-navy/80 text-sm flex items-center gap-5">
              {m} <span className="text-gold-deep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== Stats ===== */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          {t.stats.map((s, i) => (
            <div key={i} className="reveal text-center">
              <div className="display-en font-semibold text-3xl sm:text-4xl text-navy" dir="ltr">{s.value}</div>
              <div className="text-sm text-ink/60 mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <div className="hairline mx-auto max-w-4xl" />

      {/* ===== About destination ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="reveal">
          {sectionHead(t.about.eyebrow, t.about.title)}
          <p className="text-lg leading-relaxed text-ink/80 mb-4 -mt-4">{t.about.body}</p>
          <p className="text-lg leading-relaxed text-ink/80 mb-8">{t.about.body2}</p>
          <button onClick={scrollToForm} className="btn-ocean rounded-full px-7 py-3.5 text-sm sm:text-base uppercase tracking-wider">
            {t.about.cta}
          </button>
        </div>
        <div
          className="reveal rounded-3xl h-72 sm:h-96 img-cover card"
          style={{ backgroundImage: `url('${IMG.destination}')` }}
          role="img"
          aria-label="Silversands"
        />
      </section>

      {/* ===== Location (soft blue band) ===== */}
      <section className="bg-sky-tint border-y border-[var(--line)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {sectionHead(t.location.eyebrow, t.location.title)}
          <p className="reveal text-ink/75 text-lg mb-8 -mt-4">{t.location.body}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {t.location.points.map((p, i) => (
              <div key={i} className="reveal chip rounded-2xl p-5 flex items-center justify-between gap-3">
                <span className="text-navy font-semibold">{p.place}</span>
                <span className="text-gold-deep font-extrabold whitespace-nowrap" dir="ltr">{p.dist}</span>
              </div>
            ))}
          </div>
          <button onClick={scrollToForm} className="reveal btn-outline-navy rounded-full px-7 py-3.5">
            {t.location.cta}
          </button>
        </div>
      </section>

      {/* ===== Launch ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        {sectionHead(t.launch.eyebrow, t.launch.title)}
        <p className="reveal max-w-3xl text-lg leading-relaxed text-ink/80 mb-10 -mt-4">{t.launch.body}</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {t.launch.features.map((f, i) => (
            <div key={i} className="reveal card rounded-3xl p-7">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="display-ar text-xl text-navy mb-2">{f.title}</h3>
              <p className="text-ink/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Units (cream band) ===== */}
      <section className="bg-cream border-y border-[var(--line)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {sectionHead(t.units.eyebrow, t.units.title)}
          <div className="grid md:grid-cols-3 gap-6">
            {t.units.cards.map((c, i) => (
              <div key={i} className="reveal card rounded-3xl overflow-hidden flex flex-col">
                <div
                  className="h-44 img-cover relative"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(12,36,52,0.05), rgba(12,36,52,0.35)), url('${[IMG.unit1, IMG.unit2, IMG.unit3][i]}')`,
                  }}
                >
                  <span className="absolute top-4 start-4 bg-navy text-white text-xs font-bold rounded-full px-3.5 py-1.5">
                    {c.tag}
                  </span>
                  <span className="absolute bottom-3.5 end-4 display-en font-semibold text-white text-lg" dir="ltr" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
                    {c.area}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="display-ar text-2xl text-navy mb-4">{c.type}</h3>
                  <ul className="space-y-2 mb-6 flex-1">
                    {c.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-ink/75">
                        <span className="text-teal mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-5">
                    <div className="text-xs text-ink/50 mb-0.5">{t.units.priceLabel}</div>
                    <div className="display-ar text-[1.7rem] text-navy">{c.price}</div>
                  </div>
                  <button onClick={scrollToForm} className="btn-gold w-full rounded-full py-3.5">
                    {t.units.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="reveal mt-6 text-sm text-ink/55">* {t.units.note}</p>
        </div>
      </section>

      {/* ===== Amenities ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        {sectionHead(t.amenities.eyebrow, t.amenities.title)}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {t.amenities.items.map((a, i) => (
            <div key={i} className="reveal chip rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2.5">{a.icon}</div>
              <div className="text-navy font-semibold text-sm sm:text-base">{a.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Payment (soft blue band) ===== */}
      <section className="bg-sky-tint border-y border-[var(--line)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {sectionHead(t.payment.eyebrow, t.payment.title)}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {t.payment.items.map((p, i) => (
              <div key={i} className="reveal card rounded-3xl p-8 text-center">
                <div className="display-en font-semibold text-6xl text-ocean mb-3" dir="ltr">{p.value}</div>
                <div className="display-ar text-xl text-navy mb-1">{p.label}</div>
                <div className="text-sm text-ink/60">{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="reveal text-center">
            <button onClick={scrollToForm} className="btn-ocean rounded-full px-8 py-4 text-sm sm:text-base uppercase tracking-wider">
              {t.payment.cta}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Developer ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="reveal order-2 lg:order-1">
          <div
            className="rounded-3xl h-72 sm:h-96 img-cover card relative"
            style={{ backgroundImage: `url('${IMG.developer}')` }}
            role="img"
            aria-label="ORA Developers"
          >
            <span className="absolute bottom-5 start-5 bg-white/90 backdrop-blur border border-[var(--line)] text-navy text-sm font-bold rounded-full px-4 py-2">
              {t.developer.badge}
            </span>
          </div>
        </div>
        <div className="reveal order-1 lg:order-2">
          {sectionHead(t.developer.eyebrow, t.developer.title)}
          <p className="text-lg leading-relaxed text-ink/80 mb-6 -mt-4">{t.developer.body}</p>
          <div className="flex flex-wrap gap-2.5">
            {t.developer.projects.map((p, i) => (
              <span key={i} className="chip text-navy/85 text-sm rounded-full px-4 py-2">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why us (cream) ===== */}
      <section className="bg-cream border-y border-[var(--line)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {sectionHead(t.why.eyebrow, t.why.title)}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.items.map((w, i) => (
              <div key={i} className="reveal border-t-[3px] border-gold-deep pt-5">
                <div className="text-2xl mb-2">{w.icon}</div>
                <h3 className="display-ar text-lg text-navy mb-2">{w.title}</h3>
                <p className="text-ink/70 leading-relaxed text-[15px]">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        {sectionHead(t.faq.eyebrow, t.faq.title)}
        <div className="space-y-3">
          {t.faq.items.map((f, i) => (
            <details key={i} className="reveal card rounded-2xl group">
              <summary className="cursor-pointer list-none p-5 sm:p-6 flex items-center justify-between gap-4">
                <span className="font-bold text-navy">{f.q}</span>
                <span className="text-gold-deep text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="px-5 sm:px-6 pb-6 text-ink/75 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== Bottom form (navy band) ===== */}
      <section id="register" className="relative py-16 sm:py-24">
        <div
          className="absolute inset-0 img-cover"
          style={{ backgroundImage: `url('${IMG.formBg}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-navy-deep/85" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-4">
          <div className="reveal text-center mb-9">
            <p className="eyebrow-gold mb-3">{t.form.eyebrow}</p>
            <h2 className={`text-3xl sm:text-4xl text-white mb-3 ${lang === "en" ? "display-en font-semibold" : "display-ar"}`}>
              {t.form.title}
            </h2>
            <p className="text-white/80">{t.form.sub}</p>
          </div>
          <div className="reveal bg-paper rounded-3xl p-6 sm:p-9 shadow-2xl">
            <LeadForm lang={lang} source="bottom" />
          </div>
          <div className="reveal flex flex-wrap justify-center gap-4 mt-8 text-sm">
            <a href={`tel:${PHONE_INTL}`} onClick={onCall} dir="ltr" className="btn-ghost-hero rounded-full px-6 py-3">
              📞 {PHONE_DISPLAY}
            </a>
            <a
              href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer"
              className="btn-wa rounded-full px-6 py-3 inline-flex items-center gap-2"
            >
              <WaIcon /> {t.nav.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-navy-deep text-white/70 py-14 pb-32 md:pb-14">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-10">
          <div>
            <div className="display-en font-semibold text-xl text-white mb-3">Silversands</div>
            <p className="text-sm leading-relaxed">{t.footer.about}</p>
          </div>
          <div>
            <div className="font-bold text-white mb-3">{t.footer.linksTitle}</div>
            <ul className="space-y-2 text-sm">
              {t.footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-gold transition">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-3">{t.footer.contactTitle}</div>
            <ul className="space-y-2 text-sm">
              <li><a href={`tel:${PHONE_INTL}`} onClick={onCall} dir="ltr" className="hover:text-gold">{PHONE_DISPLAY}</a></li>
              <li><a href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp</a></li>
              <li>{t.footer.location}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 mt-10 pt-8 border-t border-white/10">
          <p className="text-xs leading-relaxed text-white/50 mb-4">{t.footer.disclaimer}</p>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} · {t.footer.rights}</p>
        </div>
      </footer>

      {/* ===== Floating circles (reference style) ===== */}
      <div className="fixed bottom-24 md:bottom-8 end-4 md:end-6 z-50 flex flex-col gap-3 items-center">
        <a
          href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer"
          aria-label={t.floating.wa}
          className="float-circle float-wa"
        >
          <WaIcon size={24} />
          <span>{t.nav.whatsapp}</span>
        </a>
        <a
          href={`tel:${PHONE_INTL}`} onClick={onCall}
          aria-label={t.floating.call}
          className="float-circle float-call"
        >
          <PhoneIcon size={20} />
          <span>{t.nav.call}</span>
        </a>
      </div>

      {/* ===== Sticky mobile bar ===== */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/97 backdrop-blur border-t border-[var(--line)] grid grid-cols-3 text-center text-sm font-bold">
        <a href={`tel:${PHONE_INTL}`} onClick={onCall} className="py-4 text-navy flex items-center justify-center gap-1.5">
          <PhoneIcon size={17} /> {t.sticky.call}
        </a>
        <a href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer" className="py-4 text-teal flex items-center justify-center gap-1.5 border-x border-[var(--line)]">
          <WaIcon size={18} /> {t.sticky.wa}
        </a>
        <button onClick={scrollToForm} className="py-4 btn-gold rounded-none">
          {t.sticky.form}
        </button>
      </div>

      {/* ===== Popup ===== */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-[60] bg-navy-deep/70 flex items-center justify-center p-4"
          role="dialog" aria-modal="true"
          onClick={() => setPopupOpen(false)}
        >
          <div className="bg-paper rounded-3xl max-w-md w-full p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-3">⏳</div>
            <h3 className="display-ar text-2xl text-navy mb-3">{t.popup.title}</h3>
            <p className="text-ink/70 leading-relaxed mb-6">{t.popup.body}</p>
            <button onClick={scrollToForm} className="btn-gold w-full rounded-full py-4 mb-3">
              {t.popup.cta}
            </button>
            <a
              href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer"
              className="btn-wa w-full rounded-full py-3.5 mb-4 flex items-center justify-center gap-2"
            >
              <WaIcon /> {t.nav.whatsapp}
            </a>
            <button onClick={() => setPopupOpen(false)} className="text-sm text-ink/50 hover:text-ink">
              {t.popup.close}
            </button>
          </div>
        </div>
      )}

      {/* ===== Cookie ===== */}
      {!cookieOk && (
        <div className="fixed bottom-[4.6rem] md:bottom-4 start-4 z-40 max-w-sm card rounded-2xl p-4 flex items-center gap-4">
          <p className="text-sm flex-1 text-ink/80">{t.cookie.text}</p>
          <button
            onClick={() => { localStorage.setItem("cookie-ok", "1"); setCookieOk(true); }}
            className="btn-gold rounded-full px-5 py-2 text-sm"
          >
            {t.cookie.accept}
          </button>
        </div>
      )}
    </main>
  );
}

/* ============ Icons ============ */
function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm0 18.02c-1.48 0-2.94-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.26c0-4.45 3.63-8.08 8.09-8.08 4.45 0 8.08 3.63 8.08 8.08s-3.63 8.12-8.08 8.12Zm4.43-6.05c-.24-.12-1.43-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.01-.37.11-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03s.87 2.36.99 2.52c.12.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}
