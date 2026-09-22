'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef, type MouseEvent } from 'react';

import { ctaLabel, formatSpeed, site, type PlanItem } from '@/lib/content';
import MagneticButton from './MagneticButton';
import PriceLockup from './PriceLockup';
import { ArrowRight, Check, Download, PhoneGlyph, ServiceGlyph, Upload } from './Icons';

interface PlanCardProps {
  plan: PlanItem;
  /** Dark cards sit on the deep-navy sections, light cards on the ice sections. */
  tone?: 'dark' | 'light';
}

/**
 * Pricing card with 3D tilt on mouse-move.
 *
 * The tilt is driven by spring-damped motion values so the card settles
 * rather than snapping, and a cursor-tracked specular highlight sells the
 * depth. Everything collapses to a flat card under prefers-reduced-motion
 * and on touch devices (which never fire mousemove).
 */
export default function PlanCard({ plan, tone = 'dark' }: PlanCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7.5, -7.5]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(178,236,255,0.16), transparent 62%)`;

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const dark = tone === 'dark';
  const down = plan.speedDown ? formatSpeed(plan.speedDown) : null;

  const shell = dark
    ? plan.isPopular
      ? 'glass-panel border-br-cyan/40 shadow-[0_0_0_1px_rgba(1,167,225,0.22),0_40px_90px_-40px_rgba(8,102,255,0.75)]'
      : 'glass-panel'
    : plan.isPopular
      ? 'bg-white border border-br-electric/30 shadow-[0_28px_70px_-32px_rgba(8,102,255,0.45)]'
      : 'bg-white border border-br-navy/10 shadow-[0_18px_46px_-30px_rgba(2,21,98,0.45)]';

  const titleColor = dark ? 'text-white' : 'text-br-abyss';
  const bodyColor = dark ? 'text-br-sky/70' : 'text-br-ink/75';
  const ruleColor = dark ? 'border-white/10' : 'border-br-navy/10';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-4xl p-6 transition-colors duration-300 will-change-transform sm:p-8 ${shell}`}
    >
      {/* cursor-tracked specular highlight */}
      {!reduce ? (
        <motion.span
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}

      {/* ---- badge rail -------------------------------------------------
           The badge used to be absolutely positioned at the top right,
           where it collided with longer plan names. It now sits in normal
           flow, and the rail keeps its height on every card so the speed
           block, price and CTA still line up across a row. */}
      <div className="relative mb-4 flex h-6 items-center justify-end">
        {plan.isPopular ? (
          <span className="rounded-full bg-br-electric px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white shadow-[0_6px_20px_-6px_rgba(8,102,255,0.9)]">
            Most popular
          </span>
        ) : null}
      </div>

      {/* ---- header ---------------------------------------------------- */}
      <div className="relative flex items-start gap-3.5">
        {/* service-line badge, so a card is identifiable at a glance */}
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
            dark
              ? 'border-br-sky/25 bg-white/10 text-br-sky group-hover:border-br-sky/50 group-hover:text-white'
              : 'border-br-cyan/25 bg-br-ice text-br-electric group-hover:border-br-electric/40 group-hover:bg-br-electric group-hover:text-white'
          }`}
        >
          <ServiceGlyph line={plan.serviceLine} className="h-[1.15rem] w-[1.15rem]" />
        </span>

        <div className="min-w-0">
          {plan.eyebrow ? (
            <p
              className={`mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${
                dark ? 'text-br-cyan' : 'text-br-electric'
              }`}
            >
              {plan.eyebrow}
            </p>
          ) : null}

          <h3 className={`font-display text-xl font-bold leading-tight sm:text-2xl ${titleColor}`}>
            {plan.name}
          </h3>
        </div>
      </div>

      {/* ---- speed readout --------------------------------------------- */}
      {down ? (
        <div className="relative mt-5 flex items-end gap-4">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-display text-[2.6rem] font-bold leading-[0.82] tracking-[-0.05em] tabular-nums ${
                dark ? 'text-accent-glow' : 'text-accent-deep'
              }`}
            >
              {down.value}
            </span>
            <span
              className={`font-display text-sm font-semibold uppercase tracking-widest ${
                dark ? 'text-br-sky/70' : 'text-br-royal/70'
              }`}
            >
              {down.unit}
            </span>
          </div>

          {plan.speedUp ? (
            <div
              className={`flex flex-col gap-1 pb-1 text-[0.72rem] font-medium ${
                dark ? 'text-br-sky/60' : 'text-br-ink/60'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Download className="h-3 w-3" /> up to {plan.speedDown} Mbps down
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Upload className="h-3 w-3" /> up to {plan.speedUp} Mbps up
              </span>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* ---- price ------------------------------------------------------
           Sits directly under the speed readout, which is a uniform height
           across every card, so the price lockups line up across the row.
           The "Ideal for" chips wrap to a variable number of lines and are
           placed below, where they cannot knock the prices out of register. */}
      <div className={`relative mt-6 border-t pt-6 ${ruleColor}`}>
        <PriceLockup plan={plan} tone={tone} size="lg" />
      </div>

      {/* ---- ideal for -------------------------------------------------- */}
      {plan.idealFor?.length ? (
        <div className="relative mt-6">
          <p
            className={`mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] ${
              dark ? 'text-br-sky/50' : 'text-br-ink/45'
            }`}
          >
            Ideal for
          </p>
          <ul className={`flex flex-wrap gap-x-2 gap-y-1.5 text-[0.78rem] ${bodyColor}`}>
            {plan.idealFor.map((item) => (
              <li
                key={item}
                className={`rounded-full px-2.5 py-1 ${
                  dark ? 'bg-white/[0.06]' : 'bg-br-ice'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* ---- meta chips -------------------------------------------------- */}
      {plan.contractTerm || plan.dataPolicy || plan.equipmentFee ? (
        <ul className="relative mt-5 flex flex-wrap gap-1.5">
          {[plan.contractTerm, plan.dataPolicy, plan.equipmentFee]
            .filter(Boolean)
            .map((chip) => (
              <li
                key={chip as string}
                className={`rounded-full border px-2.5 py-1 text-[0.7rem] font-medium ${
                  dark
                    ? 'border-br-cyan/20 bg-br-cyan/[0.07] text-br-sky/80'
                    : 'border-br-navy/12 bg-br-ice text-br-royal'
                }`}
              >
                {chip}
              </li>
            ))}
        </ul>
      ) : null}

      {/* ---- features ---------------------------------------------------- */}
      <ul className={`relative mt-6 flex flex-1 flex-col gap-2.5 text-[0.86rem] ${bodyColor}`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 leading-snug">
            <span
              className={`mt-[0.15rem] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                dark ? 'bg-br-cyan/15 text-br-cyan' : 'bg-br-electric/10 text-br-electric'
              }`}
            >
              <Check className="h-2.5 w-2.5" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* ---- CTA ---------------------------------------------------------- */}
      <div className="relative mt-7">
        <MagneticButton
          href={site.phoneHref}
          variant={plan.isPopular ? 'primary' : dark ? 'ghost' : 'outline'}
          full
          ariaLabel={`${ctaLabel(plan)} — ${plan.name}`}
        >
          <PhoneGlyph className="h-4 w-4" />
          {ctaLabel(plan)}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </MagneticButton>
      </div>
    </motion.div>
  );
}
