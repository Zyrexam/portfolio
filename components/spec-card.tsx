export type SpecRow = {
  label: string;
  value: string;
};

export default function SpecCard({
  title,
  rows,
}: {
  title: string;
  rows: SpecRow[];
}) {
  return (
    <div className="border border-hairline bg-bg-2 w-full">
      {/* Terminal-style header */}
      <div className="flex items-center gap-2.5 border-b border-hairline bg-bg-3 px-5 py-3">
        <span className="size-1.5 rounded-full bg-status" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
          {title}
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-hairline-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[7rem_1fr] md:grid-cols-[8rem_1fr] px-5 py-2.5"
          >
            <span className="self-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-dim">
              {row.label}
            </span>
            <span className="font-mono text-sm text-fg">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
