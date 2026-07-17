export function GridPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hh-grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path
            d="M56 0H0V56"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.08"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hh-grid)" />
    </svg>
  );
}
