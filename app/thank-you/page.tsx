import Link from "next/link";

export const metadata = {
  title: "تم استلام طلبك — سيلفر ووك & سيلفر باي",
  robots: { index: false },
};

const PHONE_INTL = "+201123863254";
const WA_URL =
  "https://wa.me/201123863254?text=" +
  encodeURIComponent("مرحبًا، سجلت اهتمامي بسيلفر ووك & سيلفر باي وأريد التفاصيل");

export default function ThankYou() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 lagoon-hero text-white">
      <div className="bg-white text-ink rounded-3xl max-w-lg w-full p-10 text-center shadow-2xl">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-lagoon-deep mb-4">تم استلام طلبك بنجاح</h1>
        <p className="text-ink/70 leading-relaxed mb-8">
          فريقنا هيتواصل معاك في أقرب وقت بكل تفاصيل سيلفر ووك & سيلفر باي — الماستر بلان، الأسعار
          الرسمية، وخطط السداد.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-lagoon-deep text-white font-bold rounded-full py-3.5 mb-3 hover:bg-lagoon transition"
        >
          💬 أو كلمنا واتساب فورًا
        </a>
        <a
          href={`tel:${PHONE_INTL}`}
          className="block w-full border border-shell rounded-full py-3.5 mb-3 font-semibold text-lagoon-deep hover:bg-sand transition"
          dir="ltr"
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
