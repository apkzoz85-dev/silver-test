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
  "مرحبًا، مهتم بتفاصيل سيلفر ووك & سيلفر باي في سيلفر ساندس الساحل الشمالي"
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
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Page() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("ar");
  const t = content[lang];

  const [popupOpen, setPopupOpen] = useState(false);
  const popupShown = useRef(false);
  const [cookieOk, setCookieOk] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);

  useReveal();

  // Language direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  // Cookie consent
  useEffect(() => {
    setCookieOk(localStorage.getItem("cookie-ok") === "1");
  }, []);

  // Popup: 55% scroll or 16s, once per session
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
      const scrolled =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= 0.55) open();
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(false);
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
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
          language: lang,
        }),
      });
      const json = await res.json();
      if (json.success) {
        trackFormLead();
        router.push("/thank-you");
      } else {
        setFormError(true);
      }
    } catch {
      setFormError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen">
      {/* ===== Header ===== */}
      <header className="fixed top-0 inset-x-0 z-40 bg-lagoon-deep/85 backdrop-blur-md text-white">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="display-en text-xl tracking-wide">Silversands</span>
            <span className="text-aqua text-xs hidden sm:inline">
              {lang === "ar" ? "الساحل الشمالي" : "North Coast"}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="text-sm border border-white/30 rounded-full px-3 py-1.5 hover:bg-white/10 transition"
              aria-label="Switch language"
            >
              {t.langLabel}
            </button>
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={onCall}
              className="hidden sm:inline-block text-sm border border-gold/60 text-gold-soft rounded-full px-4 py-1.5 hover:bg-gold hover:text-lagoon-deep transition"
              dir="ltr"
            >
              {PHONE_DISPLAY}
            </a>
            <button
              onClick={scrollToForm}
              className="bg-gold text-lagoon-deep text-sm font-semibold rounded-full px-4 py-2 hover:brightness-110 transition"
            >
              {t.nav.register}
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="lagoon-hero relative text-white pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <p className="text-aqua-soft/90 text-sm sm:text-base tracking-wide mb-4">
            {t.hero.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-3">
            {lang === "en" ? (
              <span className="display-en font-normal">{t.hero.title1}</span>
            ) : (
              t.hero.title1
            )}
          </h1>
          <p className="text-xl sm:text-3xl text-gold-soft font-medium mb-6">{t.hero.title2}</p>
          <p className="max-w-2xl text-white/90 text-base sm:text-lg leading-relaxed mb-8">
            {t.hero.sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={scrollToForm}
              className="bg-gold text-lagoon-deep font-bold rounded-full px-8 py-3.5 text-lg hover:brightness-110 transition shadow-lg"
            >
              {t.hero.cta}
            </button>
            <a
              href={WA_URL}
              onClick={onWa}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/70 rounded-full px-8 py-3.5 text-lg font-semibold hover:bg-white hover:text-lagoon-deep transition"
            >
              {t.hero.ctaWa}
            </a>
          </div>
          <p className="mt-8 text-sm text-aqua-soft/80 max-w-xl">✓ {t.hero.trust}</p>
        </div>
        {/* Shore wave */}
        <svg
          className="absolute bottom-0 inset-x-0 w-full"
          viewBox="0 0 1440 70"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 45C240 10 480 70 720 45C960 20 1200 60 1440 30V70H0V45Z"
            fill="var(--sand)"
          />
        </svg>
      </section>

      {/* ===== Stats ===== */}
      <section className="mx-auto max-w-6xl px-4 -mt-2 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10">
          {t.stats.map((s, i) => (
            <div key={i} className="reveal text-center">
              <div className="display-en text-3xl sm:text-4xl text-lagoon-deep" dir="ltr">
                {s.value}
              </div>
              <div className="text-sm text-ink/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="hairline-gold" />
      </section>

      {/* ===== About Silversands ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="reveal max-w-3xl">
          <p className="text-lagoon text-sm font-semibold tracking-wide mb-2">{t.about.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-lagoon-deep mb-6">{t.about.title}</h2>
          <p className="text-lg leading-relaxed text-ink/80 mb-4">{t.about.body}</p>
          <p className="text-lg leading-relaxed text-ink/80">{t.about.body2}</p>
        </div>
      </section>

      {/* ===== Launch ===== */}
      <section className="bg-lagoon-deep text-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal max-w-3xl mb-10">
            <p className="text-aqua text-sm font-semibold tracking-wide mb-2">{t.launch.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              {lang === "en" ? (
                <span className="display-en font-normal">{t.launch.title}</span>
              ) : (
                t.launch.title
              )}
            </h2>
            <p className="text-lg leading-relaxed text-white/85">{t.launch.body}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.launch.features.map((f, i) => (
              <div
                key={i}
                className="reveal flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <span className="text-gold text-xl leading-none mt-0.5">✦</span>
                <span className="text-white/90 leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Units ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="reveal mb-10">
          <p className="text-lagoon text-sm font-semibold tracking-wide mb-2">{t.units.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-lagoon-deep">{t.units.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.units.cards.map((c, i) => (
            <div
              key={i}
              className="reveal bg-white rounded-3xl border border-shell shadow-sm hover:shadow-lg transition p-7 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-xl font-bold text-lagoon-deep">{c.type}</h3>
                <span className="display-en text-lagoon text-sm" dir="ltr">
                  {c.area}
                </span>
              </div>
              <p className="text-ink/70 leading-relaxed mb-6 flex-1">{c.desc}</p>
              <div className="mb-5">
                <div className="text-xs text-ink/50">{c.priceLabel}</div>
                <div className="text-2xl font-bold text-gold" dir={lang === "en" ? "ltr" : "rtl"}>
                  {c.price}
                </div>
              </div>
              <button
                onClick={scrollToForm}
                className="w-full bg-lagoon-deep text-white rounded-full py-3 font-semibold hover:bg-lagoon transition"
              >
                {c.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="reveal mt-6 text-sm text-ink/50">* {t.units.note}</p>
      </section>

      {/* ===== Payment ===== */}
      <section className="bg-aqua-soft/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mb-10">
            <p className="text-lagoon text-sm font-semibold tracking-wide mb-2">
              {t.payment.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-lagoon-deep">{t.payment.title}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {t.payment.items.map((p, i) => (
              <div key={i} className="reveal bg-white rounded-3xl p-8 text-center shadow-sm">
                <div className="display-en text-5xl text-lagoon-deep mb-2" dir="ltr">
                  {p.value}
                </div>
                <div className="font-bold text-lg text-ink mb-1">{p.label}</div>
                <div className="text-sm text-ink/60">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why register ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="reveal mb-10 max-w-3xl">
          <p className="text-lagoon text-sm font-semibold tracking-wide mb-2">{t.why.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-lagoon-deep">{t.why.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.why.items.map((w, i) => (
            <div key={i} className="reveal border-t-2 border-gold pt-5">
              <h3 className="font-bold text-lg text-lagoon-deep mb-2">{w.title}</h3>
              <p className="text-ink/70 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Form ===== */}
      <section id="register" className="bg-lagoon-deep text-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="reveal text-center mb-10">
            <p className="text-aqua text-sm font-semibold tracking-wide mb-2">{t.form.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.form.title}</h2>
            <p className="text-white/80">{t.form.sub}</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="reveal bg-white text-ink rounded-3xl p-6 sm:p-10 shadow-2xl space-y-5"
          >
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <div>
              <label className="block text-sm font-semibold mb-1.5" htmlFor="name">
                {t.form.name} *
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full border border-shell rounded-xl px-4 py-3 bg-sand/50 focus:border-lagoon"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" htmlFor="phone">
                {t.form.phone} *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                dir="ltr"
                className="w-full border border-shell rounded-xl px-4 py-3 bg-sand/50 focus:border-lagoon"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" htmlFor="email">
                {t.form.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                className="w-full border border-shell rounded-xl px-4 py-3 bg-sand/50 focus:border-lagoon"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1.5" htmlFor="unit">
                  {t.form.unit}
                </label>
                <select
                  id="unit"
                  name="unit"
                  className="w-full border border-shell rounded-xl px-4 py-3 bg-sand/50"
                >
                  {t.form.unitOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" htmlFor="buyer_type">
                  {t.form.buyer}
                </label>
                <select
                  id="buyer_type"
                  name="buyer_type"
                  className="w-full border border-shell rounded-xl px-4 py-3 bg-sand/50"
                >
                  {t.form.buyerOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold text-lagoon-deep font-bold text-lg rounded-full py-4 hover:brightness-110 transition disabled:opacity-60"
            >
              {submitting ? t.form.submitting : t.form.submit}
            </button>
            {formError && <p className="text-red-600 text-sm text-center">{t.form.error}</p>}
            <p className="text-xs text-ink/50 leading-relaxed text-center">{t.form.disclosure}</p>
          </form>
          <div className="reveal flex flex-wrap justify-center gap-4 mt-8 text-sm">
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={onCall}
              className="border border-white/40 rounded-full px-6 py-2.5 hover:bg-white/10 transition"
              dir="ltr"
            >
              📞 {PHONE_DISPLAY}
            </a>
            <a
              href={WA_URL}
              onClick={onWa}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-aqua/60 text-aqua-soft rounded-full px-6 py-2.5 hover:bg-aqua/10 transition"
            >
              💬 {t.nav.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-ink text-white/70 py-14 pb-28 md:pb-14">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-10">
          <div>
            <div className="display-en text-xl text-white mb-3">Silversands</div>
            <p className="text-sm leading-relaxed">{t.footer.about}</p>
          </div>
          <div>
            <div className="font-bold text-white mb-3">{t.footer.linksTitle}</div>
            <ul className="space-y-2 text-sm">
              {t.footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-gold transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-3">{t.footer.contactTitle}</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${PHONE_INTL}`} onClick={onCall} dir="ltr" className="hover:text-gold">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WA_URL}
                  onClick={onWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  WhatsApp
                </a>
              </li>
              <li>{t.footer.location}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 mt-10 pt-8 border-t border-white/10">
          <p className="text-xs leading-relaxed text-white/50 mb-4">{t.footer.disclaimer}</p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} · {t.footer.rights}
          </p>
        </div>
      </footer>

      {/* ===== Sticky mobile bar ===== */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-shell grid grid-cols-3 text-center text-sm font-semibold">
        <a
          href={`tel:${PHONE_INTL}`}
          onClick={onCall}
          className="py-3.5 text-lagoon-deep border-e border-shell"
        >
          📞 {t.sticky.call}
        </a>
        <a
          href={WA_URL}
          onClick={onWa}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3.5 text-lagoon border-e border-shell"
        >
          💬 {t.sticky.wa}
        </a>
        <button onClick={scrollToForm} className="py-3.5 bg-gold text-lagoon-deep">
          ✍️ {t.sticky.form}
        </button>
      </div>

      {/* ===== Popup ===== */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">⏳</div>
            <h3 className="text-2xl font-bold text-lagoon-deep mb-3">{t.popup.title}</h3>
            <p className="text-ink/70 leading-relaxed mb-6">{t.popup.body}</p>
            <button
              onClick={scrollToForm}
              className="w-full bg-gold text-lagoon-deep font-bold rounded-full py-3.5 mb-3 hover:brightness-110 transition"
            >
              {t.popup.cta}
            </button>
            <button
              onClick={() => setPopupOpen(false)}
              className="text-sm text-ink/50 hover:text-ink"
            >
              {t.popup.close}
            </button>
          </div>
        </div>
      )}

      {/* ===== Cookie consent ===== */}
      {!cookieOk && (
        <div className="fixed bottom-16 md:bottom-4 inset-x-4 z-40 mx-auto max-w-lg bg-lagoon-deep text-white rounded-2xl p-4 flex items-center gap-4 shadow-xl">
          <p className="text-sm flex-1">{t.cookie.text}</p>
          <button
            onClick={() => {
              localStorage.setItem("cookie-ok", "1");
              setCookieOk(true);
            }}
            className="bg-gold text-lagoon-deep font-semibold rounded-full px-5 py-2 text-sm"
          >
            {t.cookie.accept}
          </button>
        </div>
      )}
    </main>
  );
}
