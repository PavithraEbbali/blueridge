import Image from 'next/image';

import type { Media } from '@/lib/content';

interface SectionMediaProps {
  media: Media;
  /** Framing of the crop. The source files are roughly 2:1 and 1.6:1. */
  ratio?: 'wide' | 'card' | 'tall';
  tone?: 'dark' | 'light';
  /** Responsive `sizes` hint so the browser picks the right candidate. */
  sizes?: string;
  /** Set on the first photo in the viewport to avoid a lazy-load pop-in. */
  priority?: boolean;
  className?: string;
}

const RATIOS = {
  wide: 'aspect-[16/7]',
  card: 'aspect-[16/9]',
  tall: 'aspect-[4/3]',
} as const;

/**
 * A photograph in a rounded frame, with the treatment that keeps it sitting
 * on brand rather than looking pasted on: a brand-tinted gradient veil, an
 * inner hairline, and a soft shadow matched to the surface it lands on.
 */
export default function SectionMedia({
  media,
  ratio = 'card',
  tone = 'light',
  sizes = '(min-width: 1024px) 45vw, (min-width: 640px) 92vw, 100vw',
  priority = false,
  className = '',
}: SectionMediaProps) {
  const dark = tone === 'dark';

  return (
    <figure
      className={`group relative overflow-hidden rounded-4xl ${RATIOS[ratio]} ${
        dark
          ? 'shadow-[0_28px_70px_-36px_rgba(1,13,63,0.9)]'
          : 'shadow-[0_28px_70px_-40px_rgba(2,21,98,0.55)]'
      } ${className}`}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />

      {/* Brand veil — a cool navy wash so the photography reads as part of
          the palette instead of an unrelated stock image. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-br-abyss/55 via-br-abyss/5 to-transparent mix-blend-multiply"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-br-azure/10 mix-blend-overlay"
      />

      {/* Inner hairline, so the frame has an edge on both light and dark. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ${
          dark ? 'ring-white/15' : 'ring-br-navy/10'
        }`}
      />
    </figure>
  );
}
