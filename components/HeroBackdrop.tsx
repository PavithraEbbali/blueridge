import Image from 'next/image';

import heroRidges from '@/public/images/hero-ridges-dusk.webp';

/**
 * Hero backdrop: the blue-hour photograph of the Pennsylvania ridges,
 * shown as shot.
 *
 * No tint, no wash, no colour grade over the image — earlier versions ran
 * a flat navy wash and three drifting blue blooms on top, which pulled the
 * whole frame toward one flat colour and buried the ridgelines.
 *
 * What remains is the minimum the type needs to stay readable: a scrim on
 * the left that is fully clear by the middle of the frame, and a wash
 * along the bottom edge so the section hands off to the next one. The
 * right-hand two thirds of the photograph are untouched.
 */
export default function HeroBackdrop({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* `sizes` has to over-declare. With object-cover the browser crops
          the sides and scales to fill the container HEIGHT, so the pixels
          actually needed are containerHeight x sourceAspect — well beyond
          the viewport width. Declaring 100vw made Next.js serve a variant
          that then had to be upscaled several times over, which is what
          made the photograph look soft. */}
      <Image
        src={heroRidges}
        alt=""
        fill
        priority
        quality={90}
        sizes="(min-width: 1280px) 150vw, (min-width: 768px) 200vw, 340vw"
        placeholder="blur"
        className="object-cover object-center"
      />

      {/* Legibility scrim.

          On desktop the copy sits in the left column, so the scrim runs
          left-to-right with hard stops and is completely gone past ~55% —
          the right of the photograph is untouched.

          On phones the copy spans the full width, so a left-weighted scrim
          would leave the ends of every line unshaded. Below sm the scrim
          runs top-to-bottom instead, following where the copy actually is. */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(2,21,98,0.72) 0%, rgba(2,21,98,0.62) 45%, rgba(2,21,98,0.55) 70%, rgba(2,21,98,0.72) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(2,21,98,0.80) 0%, rgba(2,21,98,0.62) 18%, rgba(2,21,98,0.28) 36%, rgba(2,21,98,0.06) 48%, rgba(2,21,98,0) 56%)',
        }}
      />

      {/* Light motes rising through the frame — points of light, not a wash. */}
      {[
        { left: '12%', bottom: '18%', size: 3, dur: 14, delay: 0 },
        { left: '26%', bottom: '8%', size: 2, dur: 18, delay: 3 },
        { left: '47%', bottom: '24%', size: 2.5, dur: 16, delay: 6 },
        { left: '63%', bottom: '12%', size: 2, dur: 20, delay: 1.5 },
        { left: '78%', bottom: '28%', size: 3, dur: 15, delay: 8 },
        { left: '89%', bottom: '16%', size: 2, dur: 19, delay: 4.5 },
      ].map((m, i) => (
        <span
          key={i}
          className="mote absolute rounded-full bg-white/70"
          style={{
            left: m.left,
            bottom: m.bottom,
            width: m.size,
            height: m.size,
            animationDuration: `${m.dur}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}

      {/* Base wash into the next section. Confined to the bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-br-abyss via-br-abyss/55 to-transparent" />
    </div>
  );
}
