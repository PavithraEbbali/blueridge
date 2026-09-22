'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { faqIntro, faqs, site } from '@/lib/content';
import AuroraField from './AuroraField';
import MagneticButton from './MagneticButton';
import { ChevronDown, PhoneGlyph } from './Icons';
import { Reveal, TextReveal } from './Reveal';

export default function Faq() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="surface-white relative overflow-hidden py-14 sm:py-24 lg:py-28"
      aria-labelledby="faq-heading"
    >
      <AuroraField tone="light" />

      <div className="container-rail relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ---- heading column ------------------------------------------- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal from="left" distance={18}>
            <span className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-br-electric">
              <span className="h-px w-8 bg-br-electric/40" aria-hidden />
              {faqIntro.eyebrow}
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text={faqIntro.title}
            delay={0.06}
            className="mt-4 font-display text-[1.7rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-br-navy min-[400px]:text-[1.9rem] sm:text-[2.6rem] sm:leading-[1.08] sm:tracking-[-0.035em]"
          />

          <Reveal delay={0.2}>
            <p className="mt-5 text-[1rem] leading-relaxed text-br-ink/80">
              {faqIntro.description}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8">
              <MagneticButton href={site.phoneHref} variant="primary" ariaLabel="Call to order">
                <PhoneGlyph className="h-4 w-4" />
                Call to order
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* ---- accordion -------------------------------------------------- */}
        <div>
          <h2 id="faq-heading" className="sr-only">
            Frequently asked questions
          </h2>

          <div className="flex flex-col gap-3">
            {faqs.map((item, index) => {
              const isOpen = open === item.id;
              return (
                <Reveal key={item.id} delay={Math.min(index * 0.04, 0.24)}>
                  <div
                    className={`overflow-hidden rounded-3xl border bg-white transition-all duration-300 ${
                      isOpen
                        ? 'border-br-electric/30 shadow-[0_22px_56px_-34px_rgba(8,102,255,0.5)]'
                        : 'border-br-navy/10 hover:border-br-electric/20'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`${item.id}-panel`}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-7"
                      >
                        <span
                          className={`font-display text-[1rem] font-bold leading-snug tracking-tight transition-colors sm:text-[1.06rem] ${
                            isOpen ? 'text-br-electric' : 'text-br-abyss'
                          }`}
                        >
                          {item.question}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen
                              ? 'rotate-180 border-br-electric bg-br-electric text-white'
                              : 'border-br-navy/15 text-br-royal'
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`${item.id}-panel`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-br-navy/[0.07] px-6 pb-6 pt-5 text-[0.92rem] leading-relaxed text-br-ink/80 sm:px-7">
                            {item.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
