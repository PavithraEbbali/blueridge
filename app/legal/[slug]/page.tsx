import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { legalPages, site } from '@/lib/content';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TopDisclosureBar from '@/components/TopDisclosureBar';
import { ArrowRight, PhoneGlyph } from '@/components/Icons';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages.find((entry) => entry.slug === slug);
  if (!page) return { title: 'Not found' };

  return {
    title: page.title,
    description: page.summary,
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = legalPages.find((entry) => entry.slug === slug);
  if (!page) notFound();

  const others = legalPages.filter((entry) => entry.slug !== slug);

  return (
    <>
      <TopDisclosureBar />
      <Header />

      <main id="hero" className="surface-deep relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(75%_100%_at_50%_0%,rgba(8,102,255,0.16),transparent_70%)]"
        />
        <div
          aria-hidden
          className="grid-texture mask-fade-b pointer-events-none absolute inset-0 opacity-40"
        />

        <div className="container-rail relative py-16 sm:py-20 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[0.78rem] text-br-sky/45">
              <li>
                <Link href="/" className="transition-colors hover:text-br-cyan">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-br-sky/70">Legal</li>
              <li aria-hidden>/</li>
              <li className="text-white">{page.title}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
            <article>
              <h1 className="font-display text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-white sm:text-[2.9rem]">
                {page.title}
              </h1>

              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-br-sky/65">
                {page.summary}
              </p>

              <div className="mt-12 flex flex-col gap-10">
                {page.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-[1.2rem] font-bold tracking-tight text-white sm:text-[1.35rem]">
                      {section.heading}
                    </h2>
                    <div className="mt-4 flex flex-col gap-4">
                      {section.body.map((paragraph, index) => (
                        <p
                          key={index}
                          className="max-w-2xl text-[0.94rem] leading-relaxed text-br-sky/65"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="glass-panel mt-14 flex flex-col gap-4 rounded-4xl p-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-[0.9rem] leading-relaxed text-br-sky/70">
                  Ready to get connected? Our ordering team confirms what is available at your
                  address and places the order on the spot.
                </p>
                <a
                  href={site.phoneHref}
                  aria-label="Call to order"
                  className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-br-electric px-6 py-3.5 font-display font-semibold text-white shadow-[0_12px_36px_-12px_rgba(8,102,255,0.9)] transition-transform duration-300 hover:scale-[1.02]"
                >
                  <PhoneGlyph className="h-4 w-4" />
                  Call to order
                </a>
              </div>
            </article>

            {/* ---- sibling policy index ------------------------------- */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-br-sky/40">
                Other policies
              </p>
              <ul className="mt-4 flex flex-col gap-1">
                {others.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/legal/${entry.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[0.84rem] text-br-sky/70 transition-all duration-200 hover:border-br-cyan/25 hover:bg-white/[0.05] hover:text-white"
                    >
                      {entry.title}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
