import type { FeatureIcon, ServiceLine } from '@/lib/content';
import type { SVGProps } from 'react';

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...common} strokeWidth={1.9} {...props}>
      <path d="M3 8.4 6.2 11.6 13 4.8" />
    </svg>
  );
}

export function PhoneGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden {...common} {...props}>
      <path d="M6.6 3.2 8 6.1 6.5 7.6a10.4 10.4 0 0 0 5.9 5.9l1.5-1.5 2.9 1.4v2.7c0 .7-.6 1.3-1.3 1.2A14.4 14.4 0 0 1 2.6 4.5c-.1-.7.5-1.3 1.2-1.3h2.8Z" />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden {...common} {...props}>
      <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
    </svg>
  );
}

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden {...common} {...props}>
      <path d="M4.5 7 9 11.5 13.5 7" />
    </svg>
  );
}

export function Download(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden {...common} {...props}>
      <path d="M10 3v10m0 0 4-4m-4 4-4-4M3.5 16.5h13" />
    </svg>
  );
}

export function Upload(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden {...common} {...props}>
      <path d="M10 17V7m0 0 4 4m-4-4-4 4M3.5 3.5h13" />
    </svg>
  );
}

export function Infinity(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 22 20" aria-hidden {...common} {...props}>
      <path d="M8.2 10c0 2-1.4 3.6-3.1 3.6S2 12 2 10s1.4-3.6 3.1-3.6c2.6 0 3.6 2.2 5.9 3.6 2.3 1.4 3.3 3.6 5.9 3.6 1.7 0 3.1-1.6 3.1-3.6s-1.4-3.6-3.1-3.6c-2.6 0-3.6 2.2-5.9 3.6" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Feature glyphs for the "Why Blue Ridge" grid
   -------------------------------------------------------------------------- */

const featureGlyphs: Record<FeatureIcon, React.ReactElement> = {
  shield: (
    <>
      <path d="M12 3.2 4.8 6v5.4c0 4.3 3 8.1 7.2 9.4 4.2-1.3 7.2-5.1 7.2-9.4V6L12 3.2Z" />
      <path d="M9 12.1l2.1 2.1L15.2 10" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.8 8.9a14 14 0 0 1 18.4 0" />
      <path d="M6 12.2a9.4 9.4 0 0 1 12 0" />
      <path d="M9.2 15.5a4.8 4.8 0 0 1 5.6 0" />
      <circle cx="12" cy="18.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s6.4-5.6 6.4-10.2a6.4 6.4 0 1 0-12.8 0C5.6 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.6" r="2.4" />
    </>
  ),
  bolt: <path d="M13.4 2.8 5.2 13.4h5.6l-.8 7.8 8.2-10.6h-5.6l.8-7.8Z" />,
  receipt: (
    <>
      <path d="M6 2.8h12v18.4l-2.4-1.6-2.4 1.6-2.4-1.6-2.4 1.6L6 19.6V2.8Z" />
      <path d="M9.4 8h5.2M9.4 12h5.2" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9.2" r="5.6" />
      <path d="M8.6 13.8 7.2 21.2l4.8-2.4 4.8 2.4-1.4-7.4" />
    </>
  ),
  headset: (
    <>
      <path d="M4.4 14.4v-2.6a7.6 7.6 0 0 1 15.2 0v2.6" />
      <path d="M4.4 13.4h1.8a1.4 1.4 0 0 1 1.4 1.4v2.4a1.4 1.4 0 0 1-1.4 1.4H4.4a1.4 1.4 0 0 1-1.4-1.4v-2.4a1.4 1.4 0 0 1 1.4-1.4Z" />
      <path d="M19.6 13.4h-1.8a1.4 1.4 0 0 0-1.4 1.4v2.4a1.4 1.4 0 0 0 1.4 1.4h1.8a1.4 1.4 0 0 0 1.4-1.4v-2.4a1.4 1.4 0 0 0-1.4-1.4Z" />
      <path d="M18.4 18.6v.6a2.2 2.2 0 0 1-2.2 2.2H13" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.6 17.4a9 9 0 1 1 16.8 0" />
      <path d="M12 17.4 16.2 9.8" />
      <circle cx="12" cy="17.6" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  gift: (
    <>
      <path d="M3.8 11.2h16.4v8.6a1.4 1.4 0 0 1-1.4 1.4H5.2a1.4 1.4 0 0 1-1.4-1.4v-8.6Z" />
      <path d="M2.8 7.6h18.4v3.6H2.8z" />
      <path d="M12 7.6v13.6" />
      <path d="M12 7.6S10.6 3 8.2 3a2.3 2.3 0 0 0 0 4.6H12Zm0 0S13.4 3 15.8 3a2.3 2.3 0 0 1 0 4.6H12Z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2.8 2.8 7.4 12 12l9.2-4.6L12 2.8Z" />
      <path d="M2.8 12.4 12 17l9.2-4.6" />
      <path d="M2.8 16.9 12 21.5l9.2-4.6" />
    </>
  ),
};

/* --------------------------------------------------------------------------
   Service-line glyphs — one per product family, used as the badge on plan
   cards and as the column marker in the inclusions table.
   -------------------------------------------------------------------------- */

const serviceGlyphs: Record<ServiceLine, React.ReactElement> = {
  /* fibre strands converging into a connector */
  fiber: (
    <>
      <path d="M2.8 20.4c1.6-7.6 7.4-13 15-14.4" />
      <path d="M6.6 20.4c1.2-5.2 5-8.9 10.2-10.1" />
      <path d="M10.4 20.4c.8-2.8 2.7-4.8 5.4-5.7" />
      <circle cx="19.4" cy="4.6" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  /* modem / router with a signal arc */
  cable: (
    <>
      <rect x="3" y="13.4" width="18" height="6.4" rx="1.8" />
      <path d="M6.6 16.6h.01M9.8 16.6h.01" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="17.4" cy="16.6" r="1.3" />
      <path d="M8.4 9.6a5.4 5.4 0 0 1 7.2 0" />
      <path d="M5.8 6.4a9.2 9.2 0 0 1 12.4 0" />
    </>
  ),
  /* stacked packages */
  bundle: (
    <>
      <path d="M12 2.8 3.4 7v10L12 21.2 20.6 17V7L12 2.8Z" />
      <path d="M3.4 7 12 11.2 20.6 7" />
      <path d="M12 11.2v10" />
    </>
  ),
  /* television with stand */
  tv: (
    <>
      <rect x="2.8" y="4.4" width="18.4" height="12.4" rx="2" />
      <path d="M8.6 20.6h6.8" />
      <path d="M12 16.8v3.8" />
    </>
  ),
  /* handset with signal */
  mobile: (
    <>
      <rect x="7" y="2.6" width="10" height="18.8" rx="2.2" />
      <path d="M10.8 18.4h2.4" />
      <path d="M19.6 7.4a5.6 5.6 0 0 1 0 9.2" strokeOpacity="0.55" />
      <path d="M4.4 7.4a5.6 5.6 0 0 0 0 9.2" strokeOpacity="0.55" />
    </>
  ),
  /* desk telephone */
  phone: (
    <>
      <path d="M4.2 13.6V9.8a7.8 7.8 0 0 1 15.6 0v3.8" />
      <path d="M2.8 13.6h5.4v4.2H4.6a1.8 1.8 0 0 1-1.8-1.8v-2.4Z" />
      <path d="M21.2 13.6h-5.4v4.2h3.6a1.8 1.8 0 0 0 1.8-1.8v-2.4Z" />
      <path d="M8.2 20.8h7.6" />
    </>
  ),
};

export function ServiceGlyph({
  line,
  className = 'h-5 w-5',
}: {
  line: ServiceLine;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...common}>
      {serviceGlyphs[line]}
    </svg>
  );
}

export function FeatureGlyph({
  name,
  className = 'h-6 w-6',
}: {
  name: FeatureIcon;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...common}>
      {featureGlyphs[name]}
    </svg>
  );
}
