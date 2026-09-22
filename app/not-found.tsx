import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center surface-deep px-6 text-center">
      <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-br-cyan">
        404
      </p>
      <h1 className="mt-4 font-display text-[2.2rem] font-extrabold tracking-tight text-white sm:text-4xl">
        That page is not here
      </h1>
      <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-br-sky/60">
        The link may be out of date. Everything we offer lives on the main page.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-br-electric px-7 py-3.5 font-display font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
      >
        Back to plans
      </Link>
    </main>
  );
}
