import Link from "next/link";

export default function LegalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-night">
      <header className="border-b border-silver/10">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="display-en text-lg silver-text">Silversands</Link>
          <Link href="/" className="text-sm text-champagne hover:text-silver-bright transition">
            ← الرجوع للصفحة الرئيسية
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="display-ar text-3xl sm:text-4xl text-silver-bright mb-8">{title}</h1>
        <div className="space-y-5 text-lg leading-relaxed text-silver-bright/80">{children}</div>
      </article>
    </main>
  );
}
