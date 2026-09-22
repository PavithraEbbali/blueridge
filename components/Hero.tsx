'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, type FormEvent } from 'react';

import { hero, site } from '@/lib/content';
import CountUp from './CountUp';
import HeroBackdrop from './HeroBackdrop';
import MagneticButton from './MagneticButton';
import { Reveal, TextReveal } from './Reveal';
import { ArrowRight, Check, FeatureGlyph } from './Icons';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  /* Parallax depth: the ridges drift slower than the copy above them. */
  const ridgeY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const ridgeScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const copyFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'checked'>('idle');

  const handleZip = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\d{5}$/.test(zip.trim())) {
      setStatus('error');
      return;
    }
    setStatus('checked');
  };

  const offer = hero.featuredOffer;

  return (
    <section
      ref={ref}
      id="hero"
      className="surface-hero relative isolate overflow-hidden pt-10 pb-16 sm:pt-18 sm:pb-24 lg:pt-20 lg:pb-32"
    >
      {/* ---- ridge + aurora backdrop ------------------------------------ */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: ridgeY, scale: ridgeScale }}
        className="absolute inset-0 -z-20"
      >
        <HeroBackdrop />
      </motion.div>

      <div
        aria-hidden
        className="grid-texture mask-fade-b pointer-events-none absolute inset-0 -z-10 opacity-40"
      />

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyFade }}
        className="container-rail relative"
      >
        <div className="grid items-center gap-9 sm:gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* ================= copy column ================= */}
          <div>
            <Reveal from="down" distance={16}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-br-sky/30 bg-white/10 py-2 pl-2.5 pr-4 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-br-sky" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-br-sky" />
                </span>
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-br-sky">
                  {hero.promoBadge}
                </span>
              </span>
            </Reveal>

            <TextReveal
              as="h1"
              text={`${hero.headline} ${hero.headlineAccent}`}
              accentFrom={hero.headline.split(' ').length}
              accentClassName="text-accent-live"
              delay={0.12}
              className="mt-6 font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-white min-[400px]:text-[2.3rem] sm:mt-7 sm:text-[3.4rem] sm:leading-[1.03] sm:tracking-[-0.04em] lg:text-[3.9rem]"
            />

            {/* accent rule that wipes in once the headline has settled,
                then keeps its gradient panning */}
            <span
              aria-hidden
              className="headline-highlight mt-5 block h-[3px] w-44 rounded-full"
            >
              <span className="rule-live block h-full w-full rounded-full bg-linear-to-r from-br-cyan via-white to-br-electric" />
            </span>

            <Reveal delay={0.46}>
              <p className="mt-5 max-w-xl text-[0.94rem] leading-relaxed text-br-sky/80 sm:mt-6 sm:text-[1.06rem]">
                {hero.subhead}
              </p>
            </Reveal>

            {/* ---- ZIP availability checker ---------------------------- */}
            <Reveal delay={0.58}>
              <form
                onSubmit={handleZip}
                className="glass-panel mt-9 flex max-w-xl flex-col gap-2.5 rounded-[1.6rem] p-2.5 sm:flex-row sm:items-center sm:rounded-full sm:p-2"
              >
                <label htmlFor="zip" className="sr-only">
                  {hero.zipLabel}
                </label>
                <div className="flex flex-1 items-center gap-3 px-4 py-2.5 sm:py-1">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="h-[1.15rem] w-[1.15rem] shrink-0 text-br-sky"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <path d="M12 21s6.4-5.6 6.4-10.2a6.4 6.4 0 1 0-12.8 0C5.6 15.4 12 21 12 21Z" />
                    <circle cx="12" cy="10.6" r="2.4" />
                  </svg>
                  <input
                    id="zip"
                    name="zip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    value={zip}
                    onChange={(event) => {
                      setZip(event.target.value.replace(/\D/g, ''));
                      setStatus('idle');
                    }}
                    placeholder={hero.zipPlaceholder}
                    aria-describedby="zip-help"
                    className="w-full bg-transparent font-display text-base font-medium tracking-tight text-white placeholder:font-sans placeholder:font-normal placeholder:text-br-sky/50 focus:outline-none"
                  />
                </div>

                <MagneticButton type="submit" variant="light" className="!px-7" strength={10}>
                  {hero.zipCta}
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </form>

              <div
                id="zip-help"
                aria-live="polite"
                className="mt-3.5 min-h-[1.4rem] text-[0.82rem]"
              >
                {status === 'error' ? (
                  <span className="text-br-coral">Enter a five-digit ZIP code to continue.</span>
                ) : status === 'checked' ? (
                  <span className="inline-flex items-center gap-2 text-br-sky">
                    <Check className="h-3.5 w-3.5 text-br-sky" />
                    Checking offers for{' '}
                    <span className="font-semibold tabular-nums text-white">{zip}</span>.
                  </span>
                ) : (
                  <span className="text-br-sky/55">
                    {site.hours} · Serving {site.serviceArea}
                  </span>
                )}
              </div>
            </Reveal>

            {/* ---- stat rail -------------------------------------------- */}
            <Reveal delay={0.7}>
              <div className="mt-9 flex max-w-xl items-stretch divide-x divide-white/15 sm:mt-10">
                {hero.stats.map((stat, i) => (
                  <div key={stat.label} className={`flex-1 ${i === 0 ? 'pr-3 sm:pr-5' : 'px-3 sm:px-5'}`}>
                    <p className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.1em] text-br-sky/60 sm:text-[0.68rem] sm:tracking-[0.13em]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ================= featured offer ================= */}
          <Reveal from="right" distance={28} delay={0.24}>
            <div className="relative">
              {/* breathing glow behind the panel */}
              <span
                aria-hidden
                className="promo-glow pointer-events-none absolute -inset-4 rounded-[3.25rem] bg-br-cyan/25 blur-3xl"
              />

              <div className="promo-ring glass-panel levitate relative overflow-hidden rounded-4xl p-6 sm:rounded-5xl sm:p-9">
              {/* periodic light sweep across the panel */}
              <span
                aria-hidden
                className="sheen-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/22 to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-br-sky/20 blur-3xl"
              />

              <p className="relative text-[0.68rem] font-bold uppercase tracking-[0.2em] text-br-sky">
                {offer.eyebrow}
              </p>

              <h2 className="relative mt-3 font-display text-[1.25rem] font-bold leading-tight tracking-tight text-white sm:text-[1.65rem]">
                {offer.title}
              </h2>

              {/* price lockup */}
              <div className="relative mt-7 flex items-start gap-1 border-t border-white/15 pt-7">
                <span className="mt-2 font-display text-2xl font-semibold leading-none text-br-sky/80">
                  $
                </span>
                <CountUp
                  value={offer.price}
                  className="font-display text-[2.9rem] font-bold leading-[0.85] tracking-[-0.045em] text-white sm:text-[3.5rem]"
                />
                <span className="mt-2 font-display text-xl font-semibold leading-none tabular-nums text-br-sky/80">
                  {offer.cents}
                </span>
                <span className="mt-[1.9rem] ml-2 text-sm font-medium leading-none text-br-sky/70">
                  {offer.term}
                </span>
              </div>

              <ul className="relative mt-7 flex flex-col gap-3">
                {offer.inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.88rem] leading-snug text-white/90"
                  >
                    <span className="mt-[0.1rem] flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-br-sky/25 text-br-sky">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="relative mt-7 border-t border-white/15 pt-5 text-[0.76rem] leading-relaxed text-br-sky/60">
                {offer.qualifier}
              </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---- supporting promotions ------------------------------------ */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.8 } },
          }}
          className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4"
        >
          {hero.promos.map((promo) => (
            <motion.li
              key={promo.id}
              variants={{
                hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
              }}
              className="group glass-panel relative overflow-hidden rounded-2xl px-5 py-4 transition-colors duration-300 hover:border-br-sky/45"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-br-sky/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-br-sky/25 bg-white/10 text-br-sky transition-colors duration-300 group-hover:border-br-sky/50 group-hover:text-white">
                  <FeatureGlyph name={promo.icon} className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <div>
                  <p className="font-display text-[0.96rem] font-bold tracking-tight text-white">
                    {promo.title}
                  </p>
                  <p className="mt-1 text-[0.79rem] leading-snug text-br-sky/65">{promo.detail}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
