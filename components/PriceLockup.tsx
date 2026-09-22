import type { PlanItem } from '@/lib/content';

type Tone = 'dark' | 'light';
type Size = 'md' | 'lg';

interface PriceLockupProps {
  plan: PlanItem;
  tone?: Tone;
  size?: Size;
  /** Hide the promotional qualifier line (used in tight card layouts). */
  hideQualifier?: boolean;
}

/**
 * The single price formatter for the entire site.
 *
 * Renders "As low as  $50⁰⁰ /mo" with a large integer, muted superscript
 * cents and the qualifier beneath. A plan without a `price` renders the
 * "Pricing by phone" lockup instead — never an invented number.
 */
export default function PriceLockup({
  plan,
  tone = 'dark',
  size = 'lg',
  hideQualifier = false,
}: PriceLockupProps) {
  const hasPrice = typeof plan.price === 'number';
  const isFree = plan.price === 0;

  const muted = tone === 'dark' ? 'text-br-sky/60' : 'text-br-ink/60';
  const strong = tone === 'dark' ? 'text-white' : 'text-br-abyss';
  const accent = tone === 'dark' ? 'text-br-sky/75' : 'text-br-royal/70';

  /* Large integer: 2.5rem at md, 3.5rem at lg — per the spec range. */
  const integerSize = size === 'lg' ? 'text-[3.5rem]' : 'text-[2.5rem]';
  const centsSize = size === 'lg' ? 'text-xl' : 'text-base';

  if (!hasPrice) {
    return (
      <div className="flex flex-col gap-1.5">
        <span
          className={`text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${muted}`}
        >
          Pricing by phone
        </span>
        <span
          className={`font-display font-bold leading-none tracking-tight ${strong} ${
            size === 'lg' ? 'text-[2.1rem]' : 'text-[1.6rem]'
          }`}
        >
          Quoted for your address
        </span>
        {!hideQualifier && plan.promoQualifier ? (
          <p className={`mt-1 text-[0.78rem] leading-snug ${muted}`}>{plan.promoQualifier}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${muted}`}>
        {isFree ? 'Promotional rate' : 'As low as'}
      </span>

      <div className="flex items-start gap-1">
        <span
          className={`font-display font-semibold leading-none ${accent} ${
            size === 'lg' ? 'mt-2 text-2xl' : 'mt-1.5 text-lg'
          }`}
        >
          $
        </span>

        <span
          className={`font-display font-bold leading-[0.85] tracking-[-0.045em] tabular-nums ${strong} ${integerSize}`}
        >
          {plan.price}
        </span>

        {plan.cents ? (
          <span
            className={`font-display font-semibold leading-none tabular-nums ${accent} ${centsSize} ${
              size === 'lg' ? 'mt-2' : 'mt-1.5'
            }`}
          >
            {plan.cents}
          </span>
        ) : null}

        <span
          className={`font-sans font-medium leading-none ${muted} ${
            size === 'lg' ? 'mt-[1.9rem] ml-1 text-sm' : 'mt-[1.35rem] ml-1 text-xs'
          }`}
        >
          /mo
        </span>
      </div>

      {!hideQualifier && plan.promoQualifier ? (
        <p className={`mt-1 max-w-[26ch] text-[0.78rem] leading-snug ${muted}`}>
          {plan.promoQualifier}
        </p>
      ) : null}
    </div>
  );
}
