type PhoneMockupProps = {
  label?: string;
  className?: string;
};

export default function PhoneMockup({
  label = "Screenshot",
  className = "",
}: PhoneMockupProps) {
  return (
    <div
      className={
        "relative mx-auto w-[220px] sm:w-[260px] md:w-[280px] " + className
      }
      aria-hidden="true"
    >
      <div className="relative aspect-[9/19] rounded-[2.25rem] border-[3px] border-ink bg-card shadow-lg overflow-hidden">
        <div className="absolute top-0 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <div className="flex h-full w-full items-center justify-center bg-[#E8E4E0]">
          <span className="text-sm font-medium text-muted">{label}</span>
        </div>
      </div>
    </div>
  );
}
