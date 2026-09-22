import { site } from '@/lib/content';

/**
 * Persistent disclosure strip. Sits above the header and never scrolls away
 * with it — it is the first thing on the page, every page.
 */
export default function TopDisclosureBar() {
  return (
    <div className="surface-royal relative z-50 w-full border-b border-white/10">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-br-cyan/40 to-transparent"
      />
      <div className="container-rail flex items-center justify-center gap-2 py-2 text-center">
        <span className="hidden h-1.5 w-1.5 shrink-0 animate-shimmer rounded-full bg-br-cyan sm:block" />
        <p className="text-[0.7rem] font-medium tracking-[0.1em] text-br-sky/75 uppercase sm:text-[0.74rem]">
          {site.disclosure}
        </p>
      </div>
    </div>
  );
}
