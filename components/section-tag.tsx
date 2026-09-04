export default function SectionTag({ label, num }: { label: string; num?: string }) {
  return (
    <div className="inline-flex items-center gap-2 border border-hairline rounded-none bg-bg-2 font-mono px-3 py-1 text-xs font-bold uppercase tracking-wider">
      {num ? <span className="text-fg-dim">{"//"}{num}</span> : null}
      <span className="size-2.5 bg-accent shrink-0" aria-hidden="true" />
      {label}
    </div>
  );
}
