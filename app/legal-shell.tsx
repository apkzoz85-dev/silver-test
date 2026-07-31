import Link from "next/link";

export default function LegalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-[var(--line)] bg-paper">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="display-en font-semibold text-lg text-navy">Silversands</Link>
          <Link href="/" className="text-sm text-gold-deep hover:text-navy transition">
            ← الرجوع للصفحة الرئيسية
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="display-ar text-3xl sm:text-4xl text-navy mb-8">{title}</h1>
        <div className="space-y-5 text-lg leading-relaxed text-ink/80">{children}</div>
      </article>
    </main>
  );
}
