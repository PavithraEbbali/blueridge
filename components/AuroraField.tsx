/**
 * Ambient colour motion for a section background.
 *
 * Three brand-coloured blobs on independent drift paths, heavily blurred so
 * they read as a slow shift of light rather than discrete shapes. Pure CSS
 * keyframes on transform only — no rAF loop, no main-thread cost, and it is
 * a server component, so nothing ships to the client.
 *
 * `tone` picks the palette: brighter cyan/azure on the light surfaces where
 * the wash has to survive a white background, richer and more saturated on
 * the deep ones.
 */
export default function AuroraField({
  tone = 'light',
  className = '',
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const dark = tone === 'dark';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Sizes and blur radius scale down on small screens. A 38rem blob
          behind a 375px viewport covers the whole section in one flat
          colour, and a 150px blur is disproportionately expensive to
          composite on a phone GPU for an effect nobody can resolve. */}
      <div
        className={`aurora-a absolute -left-[12%] top-[-18%] h-[20rem] w-[20rem] rounded-full blur-[80px] sm:h-[38rem] sm:w-[38rem] sm:blur-[150px] ${
          dark ? 'bg-br-cyan/25' : 'bg-br-cyan/30'
        }`}
      />
      <div
        className={`aurora-b absolute -right-[10%] top-[18%] h-[18rem] w-[18rem] rounded-full blur-[80px] sm:h-[34rem] sm:w-[34rem] sm:blur-[150px] ${
          dark ? 'bg-br-electric/25' : 'bg-br-azure/22'
        }`}
      />
      <div
        className={`aurora-c absolute bottom-[-20%] left-[32%] h-[16rem] w-[16rem] rounded-full blur-[80px] sm:h-[30rem] sm:w-[30rem] sm:blur-[150px] ${
          dark ? 'bg-br-royal/45' : 'bg-br-sky/45'
        }`}
      />
    </div>
  );
}
