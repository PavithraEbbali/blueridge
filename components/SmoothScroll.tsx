'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Mounts Lenis smooth scrolling for the whole document and wires anchor
 * navigation through it, so in-page links glide instead of jumping.
 *
 * Bails out entirely when the visitor prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Route same-page anchors through Lenis, offset for the sticky header.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;

      const raw = anchor.getAttribute('href');
      if (!raw) return;

      const hashIndex = raw.indexOf('#');
      if (hashIndex === -1) return;

      const path = raw.slice(0, hashIndex);
      // Only intercept links that resolve to the current page.
      if (path && path !== '/' && path !== window.location.pathname) return;
      if (window.location.pathname !== '/') return;

      const id = raw.slice(hashIndex + 1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -96, duration: 1.25 });
      window.history.replaceState(null, '', `#${id}`);
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
