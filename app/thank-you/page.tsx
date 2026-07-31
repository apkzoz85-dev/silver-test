import Link from "next/link";

export const metadata = {
  title: "تم استلام طلبك — سيلفر ووك & سيلفر باي",
  robots: { index: false },
};

const PHONE_INTL = "+201123863254";
const WA_URL =
  "https://wa.me/201123863254?text=" +
  encodeURIComponent("مرحبًا، سجلت اهتمامي بسيلفر ووك & سيلفر باي وأريد الأسعار الرسمية 🌊");

export default function ThankYou() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 hero-night">
      <div className="card-sand rounded-3xl max-w-lg w-full p-10 text-center text-ink">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="display-ar text-3xl text-night mb-4">تم استلام طلبك بنجاح</h1>
        <p className="text-ink/70 leading-relaxed mb-8">
          فريقنا هيتواصل معاك في أقرب وقت بقائمة الأسعار الرسمية والماستر بلان وخطط السداد الكاملة
          لسيلفر ووك & سيلفر باي.
        </p>
        <a
          href={WA_URL} target="_blank" rel="noopener noreferrer"
          className="btn-wa block w-full rounded-xl py-4 mb-3"
        >
          💬 مستعجل؟ كلمنا واتساب فورًا
        </a>
        <a
          href={`tel:${PHONE_INTL}`} dir="ltr"
          className="btn-gold block w-full rounded-xl py-4 mb-4"
        >
          📞 011 2386 3254
        </a>
        <Link href="/" className="text-sm text-ink/50 hover:text-ink">
          الرجوع للصفحة الرئيسية
        </Link>
      </div>
    </main>
  );
}
