import { Fragment } from 'react';

import { marqueeItems, serviceSections } from '@/lib/content';
import Faq from '@/components/Faq';
import FinePrintGrid from '@/components/FinePrintGrid';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ServiceBlock from '@/components/ServiceBlock';
import { ClipWipe } from '@/components/SectionWipe';
import TopDisclosureBar from '@/components/TopDisclosureBar';
import WhyUs from '@/components/WhyUs';
import { SURFACES, type Surface } from '@/components/Surfaces';

/**
 * Section order is fixed by the brief:
 *   disclosure -> header -> hero -> fiber -> cable -> bundles -> tv ->
 *   mobile -> phone -> fine print -> why us -> faq -> footer
 *
 * Surfaces follow the distribution on brctv.com: predominantly light, with
 * vibrant and deep-navy bands used as anchors. Bundles gets their hero-deal
 * gradient because it is the offer-led section, exactly as they use it.
 */
const SERVICE_SURFACES: Surface[] = [
  'light', // fiber
  'white', // cable
  'vibrant', // bundles — the offer band
  'light', // tv
  'white', // mobile
  'light', // phone
];

export default function HomePage() {
  return (
    <>
      <TopDisclosureBar />
      <Header />

      <main>
        <Hero />

        {/* ---- trust ticker ------------------------------------------- */}
        <section
          aria-label="Service highlights"
          className="surface-royal relative border-y border-white/10 py-5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_140%_at_50%_50%,rgba(0,167,225,0.22),transparent_72%)]"
          />
          <div className="relative flex flex-col gap-3">
            <Marquee items={marqueeItems} tone="dark" />
            <Marquee items={[...marqueeItems].reverse()} direction="reverse" tone="dark" />
          </div>
        </section>

        {/* ---- service lines, in the prescribed order ------------------ */}
        {serviceSections.map((section, index) => {
          const surface = SERVICE_SURFACES[index] ?? 'light';
          const previous = index === 0 ? 'vibrant' : SERVICE_SURFACES[index - 1];
          const crossesTone = SURFACES[surface].dark !== SURFACES[previous].dark;

          return (
            <Fragment key={section.id}>
              {crossesTone ? (
                <ClipWipe
                  toneClass={SURFACES[surface].className}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                />
              ) : null}
              <ServiceBlock section={section} surface={surface} />
            </Fragment>
          );
        })}

        {/* ---- fine print (deep navy anchor) ---------------------------- */}
        <ClipWipe toneClass="surface-deep" direction="left" />
        <FinePrintGrid />

        {/* ---- why blue ridge (light) ----------------------------------- */}
        <ClipWipe toneClass="surface-light" direction="right" />
        <WhyUs />

        {/* ---- faq (white, same tone — a hairline seam instead of a wipe) */}
        <Faq />
      </main>

      <Footer />
    </>
  );
}
