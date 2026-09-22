'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { nav, site } from '@/lib/content';
import MagneticButton from './MagneticButton';
import { PhoneGlyph } from './Icons';

/**
 * Sticky header. Transparent over the hero, then condenses into a frosted
 * navy bar once the page scrolls, with a scroll-spy underline tracking the
 * section currently in view.
 */
export default function Header() {
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((item) => item.href.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* The header is sticky in normal flow, so it sits on the page
          background rather than over the hero. Leaving it transparent meant
          it rendered against white, and the scrim that was meant to darken
          the hero just produced a grey band. It carries its own brand
          surface instead: deep navy under the royal disclosure bar, going
          frosted once the page scrolls. */}
      <div
        className={`relative w-full transition-all duration-500 ${
          condensed
            ? 'border-b border-white/10 bg-br-abyss/85 backdrop-blur-xl supports-[backdrop-filter]:bg-br-abyss/75'
            : 'border-b border-white/[0.06] bg-br-abyss'
        }`}
      >
        {/* a whisper of azure so the bar is not a flat block of navy */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_180%_at_50%_0%,rgba(0,119,221,0.35),transparent_70%)]"
        />
        <div
          className={`container-rail relative flex items-center justify-between transition-all duration-500 ${
            condensed ? 'py-3' : 'py-4 lg:py-5'
          }`}
        >
          {/* ---- wordmark ------------------------------------------------ */}
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.retailerName} home`}>
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 rounded-xl bg-linear-to-br from-br-electric to-br-cyan opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-0 rounded-xl bg-br-cyan/40 blur-md transition-all duration-300 group-hover:blur-lg" />
              {/* Ridge mark */}
              <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-white" aria-hidden>
                <path
                  d="M2 18.5 8.2 8l4 6 3-4.4L22 18.5H2Z"
                  fill="currentColor"
                  fillOpacity="0.95"
                />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.86rem] font-bold tracking-tight text-white sm:text-[0.98rem]">
                {site.retailerName}
              </span>
              <span className="mt-0.5 text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-br-sky sm:text-[0.6rem] sm:tracking-[0.16em]">
                Authorized Retailer
              </span>
            </span>
          </Link>

          {/* ---- anchor nav ---------------------------------------------- */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Section navigation">
            {nav.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-[0.84rem] font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-br-cyan/25"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* ---- call CTA -------------------------------------------------- */}
          <div className="flex items-center gap-2">
            {/* Wrapped rather than given `hidden` directly: MagneticButton's
                base classes include `inline-flex`, which sits in the same
                CSS layer as `hidden` and wins regardless of attribute
                order, so the desktop button was rendering on phones and
                pushing the header past the viewport. */}
            <div className="hidden sm:block">
              <MagneticButton
                href={site.phoneHref}
                variant="primary"
                className="!px-5 !py-3"
                ariaLabel={`Call ${site.phoneDisplay}`}
              >
                <PhoneGlyph className="h-4 w-4" />
                <span className="tabular-nums">Call {site.phoneDisplay}</span>
              </MagneticButton>
            </div>

            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phoneDisplay}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-br-electric text-white shadow-[0_8px_24px_-8px_rgba(8,102,255,0.9)] sm:hidden"
            >
              <PhoneGlyph className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[1.5px] w-full rounded bg-current transition-all duration-200 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ---- mobile sheet ------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-white/[0.08] bg-br-abyss/96 backdrop-blur-2xl lg:hidden"
          >
            <nav className="container-rail flex flex-col py-4" aria-label="Mobile navigation">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/[0.06] py-3.5 font-display text-base font-semibold text-br-ice/90 transition-colors last:border-0 hover:text-br-cyan"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={site.phoneHref}
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-br-electric px-6 py-3.5 font-display font-semibold text-white"
              >
                <PhoneGlyph className="h-4 w-4" />
                <span className="tabular-nums">Call {site.phoneDisplay}</span>
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
