'use client';

import Image from 'next/image';

import { whyUs } from '@/lib/content';
import AuroraField from './AuroraField';
import { FeatureGlyph } from './Icons';
import { Reveal, StaggerGroup, StaggerItem, TextReveal } from './Reveal';

/**
 * Premium staggered feature grid on the light surface.
 *
 * Cards enter in sequence rather than together, and two of them span a
 * double column so the grid reads as a composed layout rather than a
 * uniform card wall.
 */
export default function WhyUs() {
  const photoItems = whyUs.items.filter((item) => item.media);
  const glyphItems = whyUs.items.filter((item) => !item.media);

  return (
    <section
      id="why"
      className="surface-light relative overflow-hidden py-14 sm:py-24 lg:py-28"
      aria-labelledby="why-heading"
    >
      <div
        aria-hidden
        className="ridge-motif pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
      />
      <AuroraField tone="light" />

      <div className="container-rail relative">
        <div className="max-w-3xl">
          <Reveal from="left" distance={18}>
            <span className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-br-electric">
              <span className="h-px w-8 bg-br-electric/40" aria-hidden />
              {whyUs.eyebrow}
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text={whyUs.title}
            delay={0.06}
            className="mt-4 font-display text-[1.7rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-br-navy min-[400px]:text-[1.9rem] sm:text-[2.6rem] sm:leading-[1.08] sm:tracking-[-0.035em] lg:text-[2.9rem]"
          />

          <Reveal delay={0.2}>
            <p className="mt-5 text-[1rem] leading-relaxed text-br-ink/80 sm:text-[1.05rem]">
              {whyUs.description}
            </p>
          </Reveal>
        </div>

        {/* Photo cards first, in their own even pair. Mixing them into the
            glyph grid forced every text card to stretch to a photo card's
            height, which left them mostly empty. */}
        <StaggerGroup stagger={0.08} className="mt-10 grid gap-5 sm:mt-14 lg:mt-16 lg:grid-cols-2">
          {photoItems.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <article className="group solid-panel relative flex h-full flex-col overflow-hidden rounded-4xl transition-all duration-300 hover:-translate-y-1 hover:border-br-electric/30 hover:shadow-[0_28px_70px_-40px_rgba(8,102,255,0.55)]">
                {/* photo header on the cards that carry one */}
                {item.media ? (
                  <div className="relative aspect-[16/7] w-full overflow-hidden">
                    <Image
                      src={item.media.src}
                      alt={item.media.alt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/80 via-transparent to-transparent"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-br-azure/12 mix-blend-overlay"
                    />
                  </div>
                ) : null}

                <div className={`relative flex flex-1 flex-col p-7 ${item.media ? 'pt-5' : ''}`}>
                  {/* corner bloom on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-br-cyan/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {/* top hairline */}
                  {!item.media ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-br-electric/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  ) : null}

                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-br-cyan/25 bg-br-ice text-br-electric transition-colors duration-300 group-hover:border-br-electric/40 group-hover:bg-br-electric group-hover:text-white">
                    <FeatureGlyph name={item.icon} className="h-[1.3rem] w-[1.3rem]" />
                  </span>

                  <h3 className="relative mt-5 font-display text-[1.06rem] font-bold leading-snug tracking-tight text-br-navy">
                    {item.title}
                  </h3>

                  <p className="relative mt-2.5 text-[0.87rem] leading-relaxed text-br-ink/75">
                    {item.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* The remaining commitments, on an even three-up grid so every card
            is the same width and the rows line up. */}
        <StaggerGroup
          stagger={0.06}
          delay={0.1}
          className="mt-5 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {glyphItems.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <article className="group solid-panel relative flex h-full flex-col overflow-hidden rounded-4xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-br-electric/30 hover:shadow-[0_28px_70px_-40px_rgba(8,102,255,0.55)]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-br-cyan/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-br-electric/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-br-cyan/25 bg-br-ice text-br-electric transition-colors duration-300 group-hover:border-br-electric/40 group-hover:bg-br-electric group-hover:text-white">
                  <FeatureGlyph name={item.icon} className="h-[1.3rem] w-[1.3rem]" />
                </span>

                <h3 className="relative mt-5 font-display text-[1.06rem] font-bold leading-snug tracking-tight text-br-navy">
                  {item.title}
                </h3>

                <p className="relative mt-2.5 text-[0.87rem] leading-relaxed text-br-ink/75">
                  {item.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <span id="why-heading" className="sr-only">
        {whyUs.title}
      </span>
    </section>
  );
}
