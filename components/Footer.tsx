import Link from 'next/link';

import { footer, footerCta, legalPages, site } from '@/lib/content';
import { PhoneGlyph } from './Icons';

export default function Footer() {

  return (
    <footer className="surface-royal relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* ---- luminous seam ------------------------------------------------ */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-br-electric/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(8,102,255,0.14),transparent_70%)]"
      />
      <div aria-hidden className="grid-texture pointer-events-none absolute inset-0 opacity-25" />

      <div className="container-rail relative">
        {/* ---- call band -------------------------------------------------- */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/[0.08] py-10 sm:py-14 lg:flex-row lg:items-center lg:py-16">
          <div className="max-w-xl">
            <p className="font-display text-[1.45rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.1rem]">
              {footerCta.title}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-br-sky/70">
              {footerCta.description}
            </p>
          </div>

          <a
            href={site.phoneHref}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-br-electric px-7 py-4 font-display text-[1.05rem] font-bold tracking-tight text-white shadow-[0_14px_44px_-14px_rgba(8,102,255,1)] transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
          >
            <PhoneGlyph className="h-5 w-5" />
            <span className="tabular-nums">{site.phoneDisplay}</span>
          </a>
        </div>

        {/* ---- link columns ------------------------------------------------ */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span className="absolute inset-0 rounded-xl bg-linear-to-br from-br-electric to-br-cyan" />
                <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-white" aria-hidden>
                  <path d="M2 18.5 8.2 8l4 6 3-4.4L22 18.5H2Z" fill="currentColor" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1rem] font-bold tracking-tight text-white">
                  {site.retailerName}
                </span>
                <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-br-sky/50">
                  Authorized Retailer
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[0.85rem] leading-relaxed text-br-sky/55">
              {footer.tagline}
            </p>

            <p className="mt-5 text-[0.8rem] text-br-sky/45">{site.hours}</p>
          </div>

          {/* service + ordering columns */}
          {footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-br-sky/40">
                {column.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.85rem] text-br-sky/70 transition-colors duration-200 hover:text-br-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* legal column */}
          <nav aria-label="Legal">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-br-sky/40">
              Legal
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {legalPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/legal/${page.slug}`}
                    className="text-[0.85rem] text-br-sky/70 transition-colors duration-200 hover:text-br-cyan"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ---- disclosure --------------------------------------------------- */}
        <div className="border-t border-white/[0.08] py-9">
          <p className="max-w-5xl text-[0.78rem] leading-relaxed text-br-sky/45">
            {footer.disclosure}
          </p>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.76rem] text-br-sky/40">
              © {site.retailerName}. All rights reserved.
            </p>
            <p className="text-[0.76rem] text-br-sky/40">{site.disclosure}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
