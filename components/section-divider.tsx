export default function SectionDivider() {
  return (
    <div className="relative">
      <span
        className="absolute -top-3 left-0 size-5 bg-[#00D9FF] border-[3px] border-black rotate-12 z-10"
        aria-hidden="true"
      />
      <hr className="border-t-[3px] border-black m-0" />
    </div>
  );
}