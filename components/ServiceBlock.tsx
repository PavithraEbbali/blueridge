'use client';

import Image from 'next/image';

import { ctaLabel, site, streamOptions, type ServiceSection } from '@/lib/content';
import MagneticButton from './MagneticButton';
import PlanCard from './PlanCard';
import PriceLockup from './PriceLockup';
import AuroraField from './AuroraField';
import SectionMedia from './SectionMedia';
import { Reveal, StaggerGroup, StaggerItem, TextReveal } from './Reveal';
import { SURFACES, toneOf, type Surface } from './Surfaces';
import { ArrowRight, Check, PhoneGlyph, ServiceGlyph } from './Icons';

interface ServiceBlockProps {
  section: ServiceSection;
  surface: Surface;
}

type Tone = 'dark' | 'light';

/* --------------------------------------------------------------------------
   Shared section chrome
   -------------------------------------------------------------------------- */

function SectionHeading({ section, tone }: { section: ServiceSection; tone: Tone }) {
  const dark = tone === 'dark';

  return (
    <div className="max-w-3xl">
      <Reveal from="left" distance={18}>
        <span
          className={`inline-flex items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] ${
            dark ? 'text-br-sky' : 'text-br-electric'
          }`}
        >
          <span className={`h-px w-8 ${dark ? 'bg-br-sky/50' : 'bg-br-electric/40'}`} aria-hidden />
          {section.eyebrow}
        </span>
      </Reveal>

      <TextReveal
        as="h2"
        text={section.title}
        delay={0.06}
        className={`mt-4 font-display text-[1.7rem] font-extrabold leading-[1.12] tracking-[-0.03em] min-[400px]:text-[1.9rem] sm:text-[2.6rem] sm:leading-[1.08] sm:tracking-[-0.035em] lg:text-[2.9rem] ${
          dark ? 'text-white' : 'text-br-navy'
        }`}
      />

      <Reveal delay={0.22}>
        <p
          className={`mt-4 text-[0.94rem] leading-relaxed sm:mt-5 sm:text-[1.05rem] ${
            dark ? 'text-br-sky/75' : 'text-br-ink/80'
          }`}
        >
          {section.description}
        </p>
      </Reveal>
    </div>
  );
}

function Footnote({ text, tone }: { text: string; tone: Tone }) {
  return (
    <Reveal delay={0.1}>
      <p
        className={`mt-10 max-w-3xl border-l-2 pl-4 text-[0.82rem] leading-relaxed ${
          tone === 'dark'
            ? 'border-br-sky/40 text-br-sky/60'
            : 'border-br-electric/30 text-br-ink/60'
        }`}
      >
        {text}
      </p>
    </Reveal>
  );
}

/* --------------------------------------------------------------------------
   Layout: single-plan split (fiber, home phone)
   -------------------------------------------------------------------------- */

function SplitLayout({ section, tone }: { section: ServiceSection; tone: Tone }) {
  const dark = tone === 'dark';
  const plan = section.plans[0];
  /* Only shown as a framed card when it is not already the backdrop. */
  const inlineMedia = section.mediaAsBackground ? null : section.media;

  return (
    <div className="mt-10 grid items-start gap-6 sm:mt-14 sm:gap-8 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
      {/* ---- plan panel --------------------------------------------------- */}
      <Reveal from="left" distance={26}>
        <div
          className={`relative overflow-hidden rounded-4xl p-6 sm:rounded-5xl sm:p-10 ${
            dark ? 'glass-panel' : 'solid-panel'
          }`}
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl ${
              dark ? 'bg-br-sky/18' : 'bg-br-cyan/12'
            }`}
          />

          <div className="relative">
            <span
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${
                dark
                  ? 'border-br-sky/25 bg-white/10 text-br-sky'
                  : 'border-br-cyan/25 bg-br-ice text-br-electric'
              }`}
            >
              <ServiceGlyph line={plan.serviceLine} className="h-6 w-6" />
            </span>

            {plan.eyebrow ? (
              <p
                className={`text-[0.68rem] font-bold uppercase tracking-[0.2em] ${
                  dark ? 'text-br-sky' : 'text-br-electric'
                }`}
              >
                {plan.eyebrow}
              </p>
            ) : null}

            <h3
              className={`mt-3 font-display text-[1.55rem] font-bold tracking-tight sm:text-[2.2rem] ${
                dark ? 'text-white' : 'text-br-navy'
              }`}
            >
              {plan.name}
            </h3>

            <div className={`mt-7 border-t pt-7 ${dark ? 'border-white/15' : 'border-br-navy/10'}`}>
              <PriceLockup plan={plan} tone={tone} size="lg" />
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2.5 text-[0.88rem] leading-snug ${
                    dark ? 'text-white/85' : 'text-br-ink/80'
                  }`}
                >
                  <span
                    className={`mt-[0.15rem] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      dark ? 'bg-br-sky/25 text-br-sky' : 'bg-br-electric/10 text-br-electric'
                    }`}
                  >
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {plan.contractTerm || plan.dataPolicy || plan.equipmentFee ? (
              <ul className="mt-7 flex flex-wrap gap-1.5">
                {[plan.contractTerm, plan.dataPolicy, plan.equipmentFee]
                  .filter(Boolean)
                  .map((chip) => (
                    <li
                      key={chip as string}
                      className={`rounded-full border px-3 py-1.5 text-[0.72rem] font-medium ${
                        dark
                          ? 'border-br-sky/25 bg-white/10 text-br-sky'
                          : 'border-br-navy/12 bg-br-ice text-br-royal'
                      }`}
                    >
                      {chip}
                    </li>
                  ))}
              </ul>
            ) : null}

            <div className="mt-9">
              <MagneticButton
                href={site.phoneHref}
                variant={dark ? 'light' : 'primary'}
                ariaLabel={`${ctaLabel(plan)} — ${plan.name}`}
              >
                <PhoneGlyph className="h-4 w-4" />
                {ctaLabel(plan)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- supporting column --------------------------------------------
           When the section photo is the background, it is not repeated as a
           card here. */}
      {inlineMedia || plan.idealFor?.length ? (
        <Reveal from="right" distance={26} delay={0.12}>
          {inlineMedia ? (
            <SectionMedia
              media={inlineMedia}
              ratio="card"
              tone={tone}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="mb-4"
            />
          ) : null}

          <StaggerGroup className="grid gap-3 sm:grid-cols-2">
            {(plan.idealFor ?? []).map((item) => (
              <StaggerItem key={item}>
                <div
                  className={`h-full rounded-3xl p-6 ${
                    dark ? 'border border-white/12 bg-white/[0.07]' : 'solid-panel'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      dark ? 'bg-br-sky/20 text-br-sky' : 'bg-br-electric/10 text-br-electric'
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <p
                    className={`mt-4 text-[0.88rem] font-medium leading-snug ${
                      dark ? 'text-white/85' : 'text-br-ink/80'
                    }`}
                  >
                    {item}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Layout: plan grid (cable, bundles, mobile)
   -------------------------------------------------------------------------- */

function GridLayout({ section, tone }: { section: ServiceSection; tone: Tone }) {
  const count = section.plans.length;
  const cols =
    count >= 4
      ? 'sm:grid-cols-2 xl:grid-cols-3'
      : count === 3
        ? 'sm:grid-cols-2 lg:grid-cols-3'
        : 'sm:grid-cols-2';

  return (
    <StaggerGroup className={`mt-10 grid gap-5 sm:mt-14 lg:mt-16 lg:gap-6 ${cols}`}>
      {section.plans.map((plan) => (
        <StaggerItem key={plan.id} className="h-full">
          <PlanCard plan={plan} tone={tone} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

/* --------------------------------------------------------------------------
   Layout: TV — Stream platforms above the Live TV tier ladder
   -------------------------------------------------------------------------- */

function TvLayout({ section, tone }: { section: ServiceSection; tone: Tone }) {
  const dark = tone === 'dark';

  return (
    <>
      <StaggerGroup className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
        {streamOptions.map((option) => (
          <StaggerItem key={option.id} className="h-full">
            <div
              className={`group relative flex h-full flex-col overflow-hidden rounded-5xl transition-colors duration-300 ${
                dark ? 'glass-panel hover:border-br-sky/45' : 'solid-panel hover:border-br-electric/30'
              }`}
            >
              {/* photo header, bleeding to the card edges */}
              <div className="relative aspect-[16/8] w-full overflow-hidden">
                <Image
                  src={option.media.src}
                  alt={option.media.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-linear-to-t ${
                    dark ? 'from-br-abyss/85' : 'from-white/85'
                  } via-transparent to-transparent`}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-br-azure/12 mix-blend-overlay"
                />
              </div>

              <div className="relative flex flex-1 flex-col p-6 pt-5 sm:p-9 sm:pt-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-br-cyan/12 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <h3
                className={`relative font-display text-xl font-bold tracking-tight sm:text-2xl ${
                  dark ? 'text-white' : 'text-br-navy'
                }`}
              >
                {option.name}
              </h3>
              <p
                className={`relative mt-4 text-[0.92rem] leading-relaxed ${
                  dark ? 'text-br-sky/75' : 'text-br-ink/78'
                }`}
              >
                {option.description}
              </p>
              <ul className="relative mt-6 flex flex-1 flex-wrap content-start gap-2">
                {option.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className={`rounded-full border px-3 py-1.5 text-[0.76rem] font-medium ${
                      dark
                        ? 'border-br-sky/25 bg-white/10 text-br-sky'
                        : 'border-br-navy/10 bg-br-ice text-br-royal'
                    }`}
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="relative mt-8">
                <MagneticButton
                  href={site.phoneHref}
                  variant={dark ? 'ghost' : 'outline'}
                  full
                  ariaLabel={`Call for pricing — ${option.name}`}
                >
                  <PhoneGlyph className="h-4 w-4" />
                  Call for pricing
                </MagneticButton>
              </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* ---- live TV tier ladder ------------------------------------------ */}
      <Reveal delay={0.08}>
        <p
          className={`mt-16 text-[0.72rem] font-bold uppercase tracking-[0.2em] ${
            dark ? 'text-br-sky/70' : 'text-br-ink/50'
          }`}
        >
          Live TV packages
        </p>
      </Reveal>

      <StaggerGroup className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {section.plans.map((plan) => (
          <StaggerItem key={plan.id} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-4xl p-6 transition-all duration-300 ${
                dark
                  ? plan.isPopular
                    ? 'glass-panel border-br-sky/45'
                    : 'border border-white/12 bg-white/[0.06] hover:bg-white/[0.1]'
                  : plan.isPopular
                    ? 'border border-br-electric/30 bg-white shadow-[0_22px_58px_-34px_rgba(8,102,255,0.5)]'
                    : 'solid-panel hover:border-br-electric/25'
              }`}
            >
              {plan.isPopular ? (
                <span className="absolute -top-2.5 left-6 rounded-full bg-br-electric px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white">
                  Most popular
                </span>
              ) : null}

              <span
                className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl border ${
                  dark
                    ? 'border-br-sky/25 bg-white/10 text-br-sky'
                    : 'border-br-cyan/25 bg-br-ice text-br-electric'
                }`}
              >
                <ServiceGlyph line={plan.serviceLine} className="h-[1.05rem] w-[1.05rem]" />
              </span>

              {plan.eyebrow ? (
                <p
                  className={`text-[0.64rem] font-semibold uppercase tracking-[0.18em] ${
                    dark ? 'text-br-sky/85' : 'text-br-electric/80'
                  }`}
                >
                  {plan.eyebrow}
                </p>
              ) : null}

              <h4
                className={`mt-2 font-display text-[1.05rem] font-bold leading-tight ${
                  dark ? 'text-white' : 'text-br-navy'
                }`}
              >
                {plan.name}
              </h4>

              <ul
                className={`mt-4 flex flex-1 flex-col gap-2 text-[0.8rem] leading-snug ${
                  dark ? 'text-br-sky/75' : 'text-br-ink/75'
                }`}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span
                      className={`mt-[0.3rem] h-1 w-1 shrink-0 rounded-full ${
                        dark ? 'bg-br-sky' : 'bg-br-electric'
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={`mt-5 border-t pt-4 ${dark ? 'border-white/15' : 'border-br-navy/10'}`}>
                <a
                  href={site.phoneHref}
                  aria-label={`${ctaLabel(plan)} — ${plan.name}`}
                  className={`group/link inline-flex items-center gap-1.5 text-[0.8rem] font-semibold transition-colors ${
                    dark ? 'text-br-sky hover:text-white' : 'text-br-electric hover:text-br-navy'
                  }`}
                >
                  <PhoneGlyph className="h-3.5 w-3.5" />
                  {ctaLabel(plan)}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </a>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </>
  );
}

/* --------------------------------------------------------------------------
   Public component
   -------------------------------------------------------------------------- */

export default function ServiceBlock({ section, surface }: ServiceBlockProps) {
  /* A section whose photo is the background always runs the dark treatment,
     whatever surface the page assigned it. */
  const bleed = Boolean(section.mediaAsBackground && section.media);
  const { className: surfaceClass, dark: surfaceDark } = SURFACES[surface];
  const dark = bleed ? true : surfaceDark;
  const tone: Tone = dark ? 'dark' : 'light';
  const single = section.plans.length === 1;

  return (
    <section
      id={section.id}
      className={`${bleed ? 'bg-br-abyss' : surfaceClass} relative overflow-hidden py-14 sm:py-24 lg:py-28`}
      aria-labelledby={`${section.id}-heading`}
    >
      {/* ---- full-bleed section photograph -------------------------------- */}
      {bleed && section.media ? (
        <>
          <Image
            src={section.media.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-center"
          />
          {/* Graded the same way as the hero: only enough shading to carry
              white type, weighted left so the copy column has contrast and
              the photograph stays readable on the right. */}
          <div className="absolute inset-0 bg-br-abyss/22" />
          <div className="absolute inset-0 bg-linear-to-r from-br-abyss/88 via-br-abyss/45 to-br-abyss/10" />
          <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-br-abyss to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-br-abyss to-transparent" />
        </>
      ) : null}

      {/* ---- ambient depth ------------------------------------------------ */}
      {bleed ? null : dark ? (
        <>
          <div aria-hidden className="grid-texture pointer-events-none absolute inset-0 opacity-40" />
          <AuroraField tone="dark" />
        </>
      ) : (
        <>
          {/* the Blue Ridge peak motif, as it appears on their own sections */}
          <div
            aria-hidden
            className="ridge-motif pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
          />
          <AuroraField tone="light" />
        </>
      )}

      <div className="container-rail relative">
        <span id={`${section.id}-heading`} className="sr-only">
          {section.title}
        </span>

        {/* On a grid layout the section photo sits beside the heading; on a
            split layout it belongs to the supporting column instead. */}
        {!single && section.serviceLine !== 'tv' && section.media && !section.mediaAsBackground ? (
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <SectionHeading section={section} tone={tone} />
            <Reveal from="right" distance={26} delay={0.14}>
              <SectionMedia
                media={section.media}
                ratio="card"
                tone={tone}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </Reveal>
          </div>
        ) : (
          <SectionHeading section={section} tone={tone} />
        )}

        {section.serviceLine === 'tv' ? (
          <TvLayout section={section} tone={tone} />
        ) : single ? (
          <SplitLayout section={section} tone={tone} />
        ) : (
          <GridLayout section={section} tone={tone} />
        )}

        {section.footnote ? <Footnote text={section.footnote} tone={tone} /> : null}
      </div>
    </section>
  );
}
