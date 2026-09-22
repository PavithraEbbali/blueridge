'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------------------------------------------------------
   useSafeInView

   Framer Motion's own `whileInView` is a thin wrapper over
   IntersectionObserver, which stays silent in a few real situations — a tab
   that loads while hidden, a prerender or screenshot pass, some embedded
   webviews. In those cases every animated element would be stranded at
   opacity 0 and the page would read as blank.

   This hook observes normally, but arms a short fallback timer at mount. If
   the observer has not reported at all by the time it fires, the content is
   revealed anyway. Any genuine observer callback disarms the timer, so
   below-the-fold content still animates on scroll as intended.
   -------------------------------------------------------------------------- */
function useSafeInView<T extends HTMLElement>(margin = '-12% 0px -8% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    let fallback: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        // The observer is alive; the safety net is no longer needed.
        if (fallback) {
          clearTimeout(fallback);
          fallback = undefined;
        }
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );

    observer.observe(el);
    fallback = setTimeout(() => {
      setInView(true);
      observer.disconnect();
    }, 1400);

    return () => {
      if (fallback) clearTimeout(fallback);
      observer.disconnect();
    };
  }, [margin]);

  return { ref, inView };
}

/* --------------------------------------------------------------------------
   Reveal — scroll-triggered entrance for any block of content.
   -------------------------------------------------------------------------- */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds of delay before the reveal begins. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  from = 'up',
  distance = 28,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, inView } = useSafeInView<HTMLDivElement>('-12% 0px -10% 0px');

  const offset =
    from === 'up'
      ? { y: distance }
      : from === 'down'
        ? { y: -distance }
        : from === 'left'
          ? { x: -distance }
          : from === 'right'
            ? { x: distance }
            : {};

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   TextReveal — headline animation. Each word rises and unblurs in sequence
   behind a clipping mask, which reads as typography settling into place
   rather than a generic fade.
   -------------------------------------------------------------------------- */

interface TextRevealProps {
  text: string;
  className?: string;
  /** Applied to the words from `accentFrom` onward. */
  accentClassName?: string;
  accentFrom?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

export function TextReveal({
  text,
  className,
  accentClassName,
  accentFrom,
  delay = 0,
  as = 'h2',
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const { ref, inView } = useSafeInView<HTMLHeadingElement>('-12% 0px -8% 0px');
  const words = text.split(' ');

  const Tag = motion[as];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: reduce ? { opacity: 1 } : { y: '110%', opacity: 0, filter: 'blur(6px)' },
    visible: {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: EASE },
    },
  };

  return (
    <Tag
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            variants={word}
            className={`inline-block ${
              accentFrom !== undefined && i >= accentFrom ? (accentClassName ?? '') : ''
            }`}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* --------------------------------------------------------------------------
   Stagger — parent/child pair for grid entrance animations.
   -------------------------------------------------------------------------- */

export function StaggerGroup({
  children,
  className,
  stagger = 0.085,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, inView } = useSafeInView<HTMLDivElement>('-8% 0px -8% 0px');

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 34, scale: 0.975 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.75, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
