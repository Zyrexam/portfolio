export default function SectionTag({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 border-[2px] border-solid border-black rounded-none bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
      <span className="size-2.5 bg-[#00D9FF] shrink-0" aria-hidden="true" />
      {label}
    </div>
  );
}