"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { content, type Lang } from "@/lib/content";
import { trackCall, trackFormLead, trackWhatsApp } from "@/lib/tracking";

// ============================================================
// بيانات التواصل — Silver Walk & Silver Bay (Silversands / ORA)
// ============================================================
const PHONE = "01123863254";
const PHONE_DISPLAY = "011 2386 3254";
const PHONE_INTL = "+201123863254";
const WA_NUMBER = "201123863254";
const WA_MESSAGE = encodeURIComponent(
  "مرحبًا، مهتم بأسعار وتفاصيل سيلفر ووك & سيلفر باي في سيلفر ساندس الساحل الشمالي 🌊"
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

/* ============ Lead Form (used in hero + bottom section) ============ */
function LeadForm({
  lang,
  compact,
  source,
}: {
  lang: Lang;
  compact?: boolean;
  source: string;
}) {
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
          subject: "New Lead — Silver Walk & Silver Bay (Silversands)",
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
    "w-full rounded-xl px-4 py-3 bg-white border border-ink/15 text-ink placeholder:text-ink/40 focus:border-champagne transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <input name="name" required placeholder={`${t.name} *`} aria-label={t.name} className={field} />
      <input
        name="phone" type="tel" inputMode="tel" required placeholder={`${t.phone} *`}
        aria-label={t.phone} className={field}
      />
      {!compact && (
        <input name="email" type="email" placeholder={t.email} aria-label={t.email} className={field} />
      )}
      <div className={compact ? "space-y-3.5" : "grid sm:grid-cols-2 gap-3.5"}>
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
      <button
        type="submit" disabled={submitting}
        className="btn-gold w-full rounded-xl py-4 text-lg disabled:opacity-60"
      >
        {submitting ? t.submitting : t.submit}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{t.error}</p>}
      <p className="text-[11px] leading-relaxed text-ink/45 text-center">{t.disclosure}</p>
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

  const sectionHead = (eyebrow: string, title: string, dark?: boolean) => (
    <div className="reveal mb-10">
      <p className={`text-sm font-bold tracking-wider mb-2 ${dark ? "text-champagne" : "text-[#a5812f]"}`}>
        — {eyebrow}
      </p>
      <h2 className={`display-ar text-3xl sm:text-[2.6rem] ${dark ? "text-silver-bright" : "text-night"}`}>
        {title}
      </h2>
    </div>
  );

  return (
    <main className="min-h-screen overflow-x-clip">
      {/* ===== Urgency top bar ===== */}
      <div className="bg-gradient-to-l from-[#c2933f] via-[#e9c87f] to-[#c2933f] text-night text-center text-[13px] sm:text-sm font-bold py-2 px-3">
        {t.topBar}
      </div>

      {/* ===== Header ===== */}
      <header className="sticky top-0 z-40 bg-night/90 backdrop-blur-md border-b border-silver/10">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="display-en text-xl silver-text whitespace-nowrap">Silversands</span>
            <span className="text-champagne text-[11px] hidden sm:inline whitespace-nowrap">
              {lang === "ar" ? "سيدي حنيش · الساحل الشمالي" : "Sidi Heneish · North Coast"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="btn-ghost text-sm rounded-full px-3 py-1.5"
              aria-label="Switch language"
            >
              {t.langLabel}
            </button>
            <a
              href={`tel:${PHONE_INTL}`} onClick={onCall} dir="ltr"
              className="hidden md:inline-block btn-ghost text-sm rounded-full px-4 py-1.5"
            >
              📞 {PHONE_DISPLAY}
            </a>
            <button onClick={scrollToForm} className="btn-gold text-sm rounded-full px-4 sm:px-5 py-2 whitespace-nowrap">
              {t.nav.register}
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="hero-night relative">
        {/* Optional hero image slot: put /public/images/hero.jpg */}
        <div
          className="absolute inset-0 img-cover opacity-40"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/40 to-night" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-20 sm:pt-20 sm:pb-24 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <p className="text-champagne text-sm sm:text-base font-semibold tracking-wide mb-4">
              {t.hero.eyebrow}
            </p>
            <h1 className="display-ar text-4xl sm:text-6xl leading-[1.2] mb-2">
              <span className="silver-text">{t.hero.title1}</span>
            </h1>
            <p className="display-ar text-2xl sm:text-4xl gold-text mb-6">{t.hero.title2}</p>
            <p className="max-w-xl text-silver-bright/85 text-base sm:text-lg leading-relaxed mb-6">
              {t.hero.sub}
            </p>
            <ul className="space-y-2.5 mb-8">
              {t.hero.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-silver-bright">
                  <span className="text-champagne">◆</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 mb-6">
              <button onClick={scrollToForm} className="btn-gold rounded-full px-8 py-4 text-lg">
                {t.hero.cta}
              </button>
              <a
                href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer"
                className="btn-wa rounded-full px-7 py-4 text-lg inline-flex items-center gap-2"
              >
                <WaIcon /> {t.hero.ctaWa}
              </a>
            </div>
            <p className="text-sm text-silver/70">✓ {t.hero.trust}</p>
          </div>

          {/* Hero lead form */}
          <div className="card-sand rounded-3xl p-6 sm:p-7 lg:mt-0">
            <h2 className="display-ar text-2xl text-night mb-1">{t.heroForm.title}</h2>
            <p className="text-sm text-ink/60 mb-5">{t.heroForm.sub}</p>
            <LeadForm lang={lang} compact source="hero" />
          </div>
        </div>
      </section>

      {/* ===== Promenade marquee ===== */}
      <div className="bg-night-2 border-y border-silver/10 py-3.5 overflow-hidden" dir="ltr">
        <div className="marquee-track">
          {[...t.marquee, ...t.marquee].map((m, i) => (
            <span key={i} className="mx-5 whitespace-nowrap text-silver-bright/80 text-sm flex items-center gap-5">
              {m} <span className="text-champagne">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== Stats ===== */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          {t.stats.map((s, i) => (
            <div key={i} className="reveal text-center">
              <div className="display-en text-3xl sm:text-4xl gold-text" dir="ltr">{s.value}</div>
              <div className="text-sm text-silver/75 mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <div className="hairline mx-auto max-w-4xl" />

      {/* ===== About destination ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="reveal">
          {sectionHead(t.about.eyebrow, t.about.title, true)}
          <p className="text-lg leading-relaxed text-silver-bright/85 mb-4">{t.about.body}</p>
          <p className="text-lg leading-relaxed text-silver-bright/85 mb-8">{t.about.body2}</p>
          <button onClick={scrollToForm} className="btn-gold rounded-full px-7 py-3.5">
            {t.about.cta}
          </button>
        </div>
        <div
          className="reveal rounded-3xl h-72 sm:h-96 img-cover border border-silver/15"
          style={{
            backgroundImage:
              "linear-gradient(150deg, rgba(214,183,124,0.25), rgba(8,22,37,0.4)), radial-gradient(600px 300px at 30% 20%, #14304c, #0c2136), url('/images/destination.jpg')",
          }}
          role="img"
          aria-label="Silversands"
        />
      </section>

      {/* ===== Location ===== */}
      <section className="bg-night-2 border-y border-silver/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {sectionHead(t.location.eyebrow, t.location.title, true)}
          <p className="reveal text-silver-bright/85 text-lg mb-8 -mt-4">{t.location.body}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {t.location.points.map((p, i) => (
              <div key={i} className="reveal card-glass rounded-2xl p-5 flex items-center justify-between gap-3">
                <span className="text-silver-bright font-semibold">{p.place}</span>
                <span className="gold-text font-bold whitespace-nowrap" dir="ltr">{p.dist}</span>
              </div>
            ))}
          </div>
          <button onClick={scrollToForm} className="reveal btn-ghost rounded-full px-7 py-3.5">
            {t.location.cta} ←
          </button>
        </div>
      </section>

      {/* ===== Launch ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        {sectionHead(t.launch.eyebrow, t.launch.title, true)}
        <p className="reveal max-w-3xl text-lg leading-relaxed text-silver-bright/85 mb-10 -mt-4">
          {t.launch.body}
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {t.launch.features.map((f, i) => (
            <div key={i} className="reveal card-glass rounded-3xl p-7">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="display-ar text-xl text-champagne mb-2">{f.title}</h3>
              <p className="text-silver-bright/80 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Units (sand section) ===== */}
      <section className="bg-sand text-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {sectionHead(t.units.eyebrow, t.units.title)}
          <div className="grid md:grid-cols-3 gap-6">
            {t.units.cards.map((c, i) => (
              <div key={i} className="reveal card-sand rounded-3xl overflow-hidden flex flex-col">
                <div
                  className="h-44 img-cover relative"
                  style={{
                    backgroundImage: `linear-gradient(160deg, rgba(8,22,37,0.25), rgba(8,22,37,0.55)), linear-gradient(${140 + i * 40}deg, #14304c, #0c2136 60%, #123a56), url('/images/unit-${i + 1}.jpg')`,
                  }}
                >
                  <span className="absolute top-4 start-4 bg-gradient-to-l from-[#e9c87f] to-[#c2933f] text-night text-xs font-extrabold rounded-full px-3.5 py-1.5">
                    {c.tag}
                  </span>
                  <span className="absolute bottom-4 end-4 display-en text-silver-bright text-lg" dir="ltr">
                    {c.area}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="display-ar text-2xl text-night mb-4">{c.type}</h3>
                  <ul className="space-y-2 mb-6 flex-1">
                    {c.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-ink/75">
                        <span className="text-[#a5812f] mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-5">
                    <div className="text-xs text-ink/50 mb-0.5">{t.units.priceLabel}</div>
                    <div className="display-ar text-[1.7rem] text-night">{c.price}</div>
                  </div>
                  <button onClick={scrollToForm} className="btn-gold w-full rounded-xl py-3.5">
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
        {sectionHead(t.amenities.eyebrow, t.amenities.title, true)}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {t.amenities.items.map((a, i) => (
            <div key={i} className="reveal card-glass rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2.5">{a.icon}</div>
              <div className="text-silver-bright font-semibold text-sm sm:text-base">{a.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Payment (sand) ===== */}
      <section className="bg-sand text-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {sectionHead(t.payment.eyebrow, t.payment.title)}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {t.payment.items.map((p, i) => (
              <div key={i} className="reveal card-sand rounded-3xl p-8 text-center">
                <div className="display-en text-6xl gold-text mb-3" dir="ltr">{p.value}</div>
                <div className="display-ar text-xl text-night mb-1">{p.label}</div>
                <div className="text-sm text-ink/60">{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="reveal text-center">
            <button onClick={scrollToForm} className="btn-gold rounded-full px-8 py-4 text-lg">
              {t.payment.cta}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Developer ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="reveal order-2 lg:order-1">
          <div
            className="rounded-3xl h-72 sm:h-96 img-cover border border-silver/15 relative"
            style={{
              backgroundImage:
                "linear-gradient(160deg, rgba(8,22,37,0.3), rgba(8,22,37,0.6)), radial-gradient(500px 320px at 70% 30%, #1a3d5c, #0c2136), url('/images/developer.jpg')",
            }}
            role="img"
            aria-label="ORA Developers"
          >
            <span className="absolute bottom-5 start-5 bg-night/80 border border-champagne/40 text-champagne text-sm font-bold rounded-full px-4 py-2">
              {t.developer.badge}
            </span>
          </div>
        </div>
        <div className="reveal order-1 lg:order-2">
          {sectionHead(t.developer.eyebrow, t.developer.title, true)}
          <p className="text-lg leading-relaxed text-silver-bright/85 mb-6 -mt-4">{t.developer.body}</p>
          <div className="flex flex-wrap gap-2.5">
            {t.developer.projects.map((p, i) => (
              <span key={i} className="border border-silver/25 text-silver-bright/85 text-sm rounded-full px-4 py-2">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why us (sand) ===== */}
      <section className="bg-sand text-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {sectionHead(t.why.eyebrow, t.why.title)}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.items.map((w, i) => (
              <div key={i} className="reveal border-t-[3px] border-[#c2933f] pt-5">
                <div className="text-2xl mb-2">{w.icon}</div>
                <h3 className="display-ar text-lg text-night mb-2">{w.title}</h3>
                <p className="text-ink/70 leading-relaxed text-[15px]">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        {sectionHead(t.faq.eyebrow, t.faq.title, true)}
        <div className="space-y-3">
          {t.faq.items.map((f, i) => (
            <details key={i} className="reveal card-glass rounded-2xl group">
              <summary className="cursor-pointer list-none p-5 sm:p-6 flex items-center justify-between gap-4">
                <span className="font-bold text-silver-bright">{f.q}</span>
                <span className="text-champagne text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="px-5 sm:px-6 pb-6 text-silver-bright/80 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== Bottom form ===== */}
      <section id="register" className="relative py-16 sm:py-24 border-t border-silver/10">
        <div
          className="absolute inset-0 img-cover opacity-25"
          style={{ backgroundImage: "url('/images/form-bg.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/85 to-night" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-4">
          <div className="reveal text-center mb-9">
            <p className="text-champagne text-sm font-bold tracking-wider mb-2">— {t.form.eyebrow}</p>
            <h2 className="display-ar text-3xl sm:text-4xl text-silver-bright mb-3">{t.form.title}</h2>
            <p className="text-silver/80">{t.form.sub}</p>
          </div>
          <div className="reveal card-sand rounded-3xl p-6 sm:p-9">
            <LeadForm lang={lang} source="bottom" />
          </div>
          <div className="reveal flex flex-wrap justify-center gap-4 mt-8 text-sm">
            <a href={`tel:${PHONE_INTL}`} onClick={onCall} dir="ltr" className="btn-ghost rounded-full px-6 py-3">
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
      <footer className="bg-[#050e18] text-silver/70 py-14 pb-32 md:pb-14 border-t border-silver/10">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-10">
          <div>
            <div className="display-en text-xl silver-text mb-3">Silversands</div>
            <p className="text-sm leading-relaxed">{t.footer.about}</p>
          </div>
          <div>
            <div className="font-bold text-silver-bright mb-3">{t.footer.linksTitle}</div>
            <ul className="space-y-2 text-sm">
              {t.footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-champagne transition">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-silver-bright mb-3">{t.footer.contactTitle}</div>
            <ul className="space-y-2 text-sm">
              <li><a href={`tel:${PHONE_INTL}`} onClick={onCall} dir="ltr" className="hover:text-champagne">{PHONE_DISPLAY}</a></li>
              <li><a href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">WhatsApp</a></li>
              <li>{t.footer.location}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 mt-10 pt-8 border-t border-silver/10">
          <p className="text-xs leading-relaxed text-silver/45 mb-4">{t.footer.disclaimer}</p>
          <p className="text-xs text-silver/35">© {new Date().getFullYear()} · {t.footer.rights}</p>
        </div>
      </footer>

      {/* ===== Floating buttons (always visible) ===== */}
      <div className="fixed bottom-24 md:bottom-8 end-4 md:end-6 z-50 flex flex-col gap-3 items-end">
        <a
          href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer"
          aria-label={t.floating.wa}
          className="btn-wa pulse rounded-full h-14 md:h-[3.4rem] px-0 md:px-6 w-14 md:w-auto flex items-center justify-center gap-2.5 text-base"
        >
          <WaIcon size={26} />
          <span className="hidden md:inline">{t.floating.wa}</span>
        </a>
        <a
          href={`tel:${PHONE_INTL}`} onClick={onCall}
          aria-label={t.floating.call}
          className="btn-gold pulse-gold rounded-full h-14 md:h-[3.4rem] px-0 md:px-6 w-14 md:w-auto flex items-center justify-center gap-2.5 text-base"
        >
          <PhoneIcon size={22} />
          <span className="hidden md:inline">{t.floating.call}</span>
        </a>
      </div>

      {/* ===== Sticky mobile bar ===== */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-night/95 backdrop-blur border-t border-silver/15 grid grid-cols-3 text-center text-sm font-bold">
        <a href={`tel:${PHONE_INTL}`} onClick={onCall} className="py-4 text-silver-bright flex items-center justify-center gap-1.5">
          <PhoneIcon size={17} /> {t.sticky.call}
        </a>
        <a href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer" className="py-4 text-[#2ee27a] flex items-center justify-center gap-1.5 border-x border-silver/15">
          <WaIcon size={18} /> {t.sticky.wa}
        </a>
        <button onClick={scrollToForm} className="py-4 bg-gradient-to-l from-[#e9c87f] to-[#c2933f] text-night">
          💰 {t.sticky.form}
        </button>
      </div>

      {/* ===== Popup ===== */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
          role="dialog" aria-modal="true"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="card-sand rounded-3xl max-w-md w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">⏳</div>
            <h3 className="display-ar text-2xl text-night mb-3">{t.popup.title}</h3>
            <p className="text-ink/70 leading-relaxed mb-6">{t.popup.body}</p>
            <button onClick={scrollToForm} className="btn-gold w-full rounded-xl py-4 mb-4">
              {t.popup.cta}
            </button>
            <a
              href={WA_URL} onClick={onWa} target="_blank" rel="noopener noreferrer"
              className="btn-wa w-full rounded-xl py-3.5 mb-4 flex items-center justify-center gap-2"
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
        <div className="fixed bottom-[4.6rem] md:bottom-4 start-4 z-40 max-w-sm card-glass rounded-2xl p-4 flex items-center gap-4">
          <p className="text-sm flex-1 text-silver-bright">{t.cookie.text}</p>
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
