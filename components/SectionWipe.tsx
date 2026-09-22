'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/* --------------------------------------------------------------------------
   ClipWipe — the transition between major service sections.

   As the divider scrolls through the viewport, an angled clip-path opens
   from the leading edge, so one surface appears to wipe over the next
   rather than simply abutting it.
   -------------------------------------------------------------------------- */

interface ClipWipeProps {
  /** Tailwind background class for the panel being wiped in. */
  toneClass: string;
  /** Angle of the wipe edge. */
  direction?: 'left' | 'right';
  height?: string;
  children?: ReactNode;
}

export function ClipWipe({
  toneClass,
  direction = 'right',
  height = 'h-24 sm:h-32 lg:h-40',
  children,
}: ClipWipeProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // 0 -> fully clipped away, 1 -> fully revealed.
  const reveal = useTransform(scrollYProgress, [0, 0.62], [0, 100]);

  const clip = useTransform(reveal, (v) =>
    direction === 'right'
      ? `polygon(0 0, ${v}% 0, ${Math.max(0, v - 18)}% 100%, 0 100%)`
      : `polygon(${100 - v}% 0, 100% 0, 100% 100%, ${Math.min(100, 100 - v + 18)}% 100%)`,
  );

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${height}`}>
      <motion.div
        className={`absolute inset-0 ${toneClass}`}
        style={reduce ? undefined : { clipPath: clip, WebkitClipPath: clip }}
      />
      {/* luminous seam that travels with the wipe edge */}
      {!reduce ? (
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-transparent via-br-cyan/45 to-transparent"
          style={{ clipPath: clip, WebkitClipPath: clip, opacity: 0.35 }}
        />
      ) : null}
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Parallax — depth on background imagery and decorative layers.
   -------------------------------------------------------------------------- */

interface ParallaxProps {
  children: ReactNode;
  /** Pixels of travel across the full scroll pass. Negative moves upward. */
  distance?: number;
  className?: string;
}

export function Parallax({ children, distance = 90, className }: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
