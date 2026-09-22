'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/* Layout effect on the client, plain effect on the server, so the zeroing
   below happens before paint without warning during prerender. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Counts an integer up to `value` the first time it enters the viewport.
 *
 * The number is a price, so correctness beats the animation every time:
 *
 *  - State starts at the FINAL value, not zero. The prerendered HTML
 *    therefore contains the real price, which is what a crawler or a
 *    visitor without JavaScript sees. An earlier version started at zero
 *    and shipped "$0" in the static export.
 *  - The reset to zero runs in a layout effect, before paint, so the
 *    count still starts from zero on screen with no flash of the total.
 *  - A guard timer force-sets the final value if the animation has not
 *    completed in time. requestAnimationFrame is suspended in a
 *    backgrounded tab, which would otherwise strand the display at zero.
 *
 * The element reserves its final width with an invisible copy of the
 * finished number, so the lockup does not reflow while digits change.
 */
export default function CountUp({
  value,
  duration = 1.1,
  delay = 0.45,
  className = '',
}: {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (reduce || !inView || started.current) return;
    started.current = true;

    setDisplay(0);

    let finished = false;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      onComplete: () => {
        finished = true;
      },
    });

    const guard = setTimeout(
      () => {
        if (!finished) {
          controls.stop();
          setDisplay(value);
        }
      },
      (delay + duration) * 1000 + 900,
    );

    return () => {
      controls.stop();
      clearTimeout(guard);
    };
  }, [inView, reduce, value, duration, delay]);

  return (
    <span ref={ref} className={`relative inline-grid ${className}`}>
      {/* width reservation — never announced, never visible */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span className="col-start-1 row-start-1 tabular-nums">{display}</span>
    </span>
  );
}
