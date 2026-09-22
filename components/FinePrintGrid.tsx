'use client';

import { finePrint } from '@/lib/content';
import AuroraField from './AuroraField';
import { ServiceGlyph } from './Icons';
import { Reveal, StaggerGroup, StaggerItem, TextReveal } from './Reveal';

/**
 * Inclusions and fees, side by side.
 *
 * Renders as a true table on desktop and as stacked per-column cards on
 * mobile, so the comparison stays readable instead of scrolling sideways.
 */
export default function FinePrintGrid() {
  const [colFiber, colCable, colBundle] = finePrint.columns;
  /* `key` doubles as the service-line glyph name, so each column carries
     the same badge the matching plan cards use. */
  const columns = [
    { key: 'fiber' as const, label: colFiber },
    { key: 'cable' as const, label: colCable },
    { key: 'bundle' as const, label: colBundle },
  ];

  return (
    <section
      id="fine-print"
      className="surface-deep relative overflow-hidden py-14 sm:py-24 lg:py-28"
      aria-labelledby="fine-print-heading"
    >
      <div aria-hidden className="grid-texture pointer-events-none absolute inset-0 opacity-40" />
      <AuroraField tone="dark" />

      <div className="container-rail relative">
        <div className="max-w-3xl">
          <Reveal from="left" distance={18}>
            <span className="inline-flex items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-br-cyan">
              <span className="h-px w-8 bg-br-cyan/50" aria-hidden />
              {finePrint.eyebrow}
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text={finePrint.title}
            delay={0.06}
            className="mt-4 font-display text-[1.7rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-white min-[400px]:text-[1.9rem] sm:text-[2.7rem] sm:leading-[1.06] sm:tracking-[-0.035em] lg:text-[3.1rem]"
          />

          <Reveal delay={0.2}>
            <p className="mt-5 text-[1rem] leading-relaxed text-br-sky/65 sm:text-[1.05rem]">
              {finePrint.description}
            </p>
          </Reveal>
        </div>

        {/* ---- desktop table --------------------------------------------- */}
        <Reveal delay={0.12}>
          <div className="glass-panel mt-14 hidden overflow-hidden rounded-4xl lg:mt-16 lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only" id="fine-print-heading">
                {finePrint.title}
              </caption>
              <thead>
                <tr className="border-b border-white/[0.09]">
                  <th
                    scope="col"
                    className="px-7 py-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-br-sky/45"
                  >
                    Inclusion
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="px-7 py-5 font-display text-[0.95rem] font-bold tracking-tight text-white"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-br-sky/25 bg-white/10 text-br-sky">
                          <ServiceGlyph line={column.key} className="h-4 w-4" />
                        </span>
                        {column.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finePrint.rows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={`border-b border-white/[0.055] transition-colors duration-200 last:border-0 hover:bg-white/[0.035] ${
                      index % 2 === 1 ? 'bg-white/[0.015]' : ''
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-7 py-4 text-[0.88rem] font-medium text-br-sky/75"
                    >
                      {row.label}
                    </th>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-7 py-4 text-[0.88rem] font-medium text-white/85"
                      >
                        {row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ---- mobile / tablet stack -------------------------------------- */}
        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {columns.map((column) => (
            <StaggerItem key={column.key} className="h-full">
              <div className="glass-panel h-full rounded-4xl p-6">
                <h3 className="flex items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-tight text-white">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-br-sky/25 bg-white/10 text-br-sky">
                    <ServiceGlyph line={column.key} className="h-4 w-4" />
                  </span>
                  {column.label}
                </h3>
                <dl className="mt-4 flex flex-col divide-y divide-white/[0.07]">
                  {finePrint.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-4 py-2.5"
                    >
                      <dt className="text-[0.78rem] text-br-sky/55">{row.label}</dt>
                      <dd className="text-right text-[0.78rem] font-medium text-white/85">
                        {row[column.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* ---- notes -------------------------------------------------------- */}
        <StaggerGroup className="mt-10 grid gap-3 sm:grid-cols-2">
          {finePrint.notes.map((note) => (
            <StaggerItem key={note}>
              <p className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 text-[0.8rem] leading-relaxed text-br-sky/55">
                <span
                  aria-hidden
                  className="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-br-cyan/70"
                />
                {note}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
