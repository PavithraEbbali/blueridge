'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, type MouseEvent, type ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'light' | 'outline';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  /** How far the button drifts toward the cursor, in pixels. */
  strength?: number;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  full?: boolean;
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-tight ' +
  'px-7 py-3.5 text-[0.95rem] leading-none select-none isolate overflow-hidden ' +
  'transition-[box-shadow,color,background-color,border-color] duration-300 will-change-transform';

const variants: Record<Variant, string> = {
  primary:
    'bg-br-electric text-white shadow-[0_10px_34px_-10px_rgba(8,102,255,0.85)] hover:shadow-[0_18px_46px_-10px_rgba(8,102,255,1)]',
  ghost:
    'bg-white/[0.06] text-br-ice border border-white/15 backdrop-blur-md hover:bg-white/[0.12] hover:border-br-cyan/45',
  light:
    'bg-white text-br-abyss shadow-[0_10px_30px_-12px_rgba(2,21,98,0.55)] hover:shadow-[0_16px_40px_-12px_rgba(2,21,98,0.7)]',
  outline:
    'bg-transparent text-br-navy border border-br-navy/25 hover:border-br-electric hover:text-br-electric',
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  strength = 14,
  ariaLabel,
  type = 'button',
  full = false,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 260, damping: 18, mass: 0.45 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  // The label drifts slightly further than the shell for a layered pull.
  const labelX = useTransform(x, (v) => v * 0.35);
  const labelY = useTransform(y, (v) => v * 0.35);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    mx.set((relX / (rect.width / 2)) * strength);
    my.set((relY / (rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const content = (
    <>
      {/* Sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 translate-x-[-120%] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
      />
      <motion.span style={{ x: labelX, y: labelY }} className="inline-flex items-center gap-2.5">
        {children}
      </motion.span>
    </>
  );

  const classes = `${base} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={{ x, y }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
