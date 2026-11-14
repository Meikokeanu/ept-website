type WordmarkProps = {
  className?: string;
  label?: string;
};

// The app wordmark (black PNG) used as a mask, so it takes the current text color.
export function Wordmark({ className, label = "EPT" }: WordmarkProps) {
  return (
    <span
      className={"wordmark" + (className ? " " + className : "")}
      role="img"
      aria-label={label}
    />
  );
}

type StoreButtonProps = {
  variant?: "dark" | "light";
  className?: string;
};

// The app is not live yet. This stays a non-interactive label until the App Store link exists.
export function StoreButton({ variant = "dark", className }: StoreButtonProps) {
  return (
    <span
      className={
        "store store--" + variant + (className ? " " + className : "")
      }
    >
      <svg
        className="store__glyph"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="2"
          width="12"
          height="20"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M10 5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="store__text">
        <span className="store__small">Bald im</span>
        <span className="store__big">App Store</span>
      </span>
    </span>
  );
}

export function GhostIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M16 30 a16 16 0 0 1 32 0 v21 l-4 -3.5 l-4 3.5 l-4 -3.5 l-4 3.5 l-4 -3.5 l-4 3.5 z"
        fill="currentColor"
      />
      <circle cx="26" cy="29" r="2.8" fill="var(--ghost-eye, #EDE8E3)" />
      <circle cx="38" cy="29" r="2.8" fill="var(--ghost-eye, #EDE8E3)" />
    </svg>
  );
}
