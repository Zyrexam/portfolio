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
    <div className="border-brutal shadow-brutal bg-brutal-white w-full">
      {/* Accent header bar */}
      <div className="bg-brutal-accent border-b border-brutal-border px-5 py-3">
        <span className="font-bold uppercase text-sm tracking-wider text-brutal-fg">
          {title}
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-brutal-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[7rem_1fr] md:grid-cols-[8rem_1fr] px-5 py-2.5"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brutal-border/50">
              {row.label}
            </span>
            <span className="font-mono text-sm font-bold text-brutal-fg">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
