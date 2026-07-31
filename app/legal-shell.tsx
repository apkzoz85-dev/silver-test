import Link from "next/link";

export default function LegalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-sand">
      <header className="bg-lagoon-deep text-white">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="display-en text-lg">
            Silversands
          </Link>
          <Link href="/" className="text-sm text-aqua hover:text-white transition">
            ← الرجوع للصفحة الرئيسية
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-lagoon-deep mb-8">{title}</h1>
        <div className="space-y-5 text-lg leading-relaxed text-ink/80">{children}</div>
      </article>
    </main>
  );
}
