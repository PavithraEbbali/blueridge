/**
 * The four section backgrounds the page alternates between.
 *
 * Each gradient is lifted verbatim from https://www.brctv.com — see the
 * header comment in app/globals.css for where each one appears on their
 * site. `dark` drives the text/― card treatment inside the section.
 */
export type Surface = 'deep' | 'vibrant' | 'light' | 'white';

export const SURFACES: Record<Surface, { className: string; dark: boolean }> = {
  /** Deep navy anchor — #00368C to #021562. */
  deep: { className: 'surface-deep', dark: true },
  /** Their hero-deal gradient — #0077DD to #00368C. */
  vibrant: { className: 'surface-vibrant', dark: true },
  /** Their speeds-section gradient — #FFFFFF to #F2FCFF to #B2ECFF. */
  light: { className: 'surface-light', dark: false },
  /** Their products-section gradient — #FFFFFF down to #CDF9FD. */
  white: { className: 'surface-white', dark: false },
};

/** Components below section level only need to know light vs dark. */
export const toneOf = (surface: Surface): 'dark' | 'light' =>
  SURFACES[surface].dark ? 'dark' : 'light';
