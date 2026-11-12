import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(233,168,76,0.16),transparent)] blur-[80px]"
      />
      <p className="label text-amber">404 — after hours</p>
      <h1 className="mt-6 font-display text-[clamp(3rem,9vw,6rem)] leading-[0.9] tracking-[-0.03em]">
        This page went
        <br />
        <em className="italic text-amber">home early</em>.
      </h1>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/60">
        The art is still hanging in the gallery. Let&apos;s get you back to the
        quiet hours.
      </p>
      <Link
        href="/"
        className="mt-9 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-amber"
      >
        Back to Soullit Design
      </Link>
    </main>
  );
}
