import type { ReactNode } from 'react';

interface MarqueeProps {
  items: readonly string[];
  /** 'reverse' scrolls right-to-left inverted, used for the second rail. */
  direction?: 'normal' | 'reverse';
  tone?: 'dark' | 'light';
  separator?: ReactNode;
}

/**
 * Infinite trust-marker ticker.
 *
 * The item list is duplicated once and translated -50%, which produces a
 * seamless loop from a pure CSS animation — no JS on the main thread, and
 * it pauses on hover so a visitor can actually read a marker.
 */
export default function Marquee({
  items,
  direction = 'normal',
  tone = 'dark',
  separator,
}: MarqueeProps) {
  const track = [...items, ...items];

  const text = tone === 'dark' ? 'text-br-sky/70' : 'text-br-royal/80';
  const dot = tone === 'dark' ? 'bg-br-cyan/60' : 'bg-br-electric/50';

  return (
    <div className="mask-fade-x relative overflow-hidden py-1">
      <div
        className={`flex w-max items-center gap-8 ${
          direction === 'reverse' ? 'animate-marquee-reverse' : 'animate-marquee'
        } hover:[animation-play-state:paused]`}
      >
        {track.map((item, i) => (
          <div key={`${item}-${i}`} className="flex shrink-0 items-center gap-8">
            <span
              className={`whitespace-nowrap font-display text-[0.82rem] font-semibold uppercase tracking-[0.15em] ${text}`}
            >
              {item}
            </span>
            {separator ?? <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />}
          </div>
        ))}
      </div>
    </div>
  );
}
