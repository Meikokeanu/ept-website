import type { CSSProperties } from "react";

type PhoneProps = {
  src: string;
  alt: string;
  tone?: "light" | "dark";
  className?: string;
  eager?: boolean;
  style?: CSSProperties;
};

export function StatusBar({ time = "9:41" }: { time?: string }) {
  return (
    <div className="phone__status" aria-hidden="true">
      <span className="phone__time">{time}</span>
      <span className="phone__icons">
        <svg width="18" height="12" viewBox="0 0 18 12">
          <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path
            d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4C5.2.4 2.7 1.5.8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.3-1.3A6.6 6.6 0 0 0 8 4c-1.8 0-3.5.7-4.7 1.8l1.3 1.3c.9-.8 2.1-1.3 3.4-1.3Zm0 3.5c-.6 0-1.1.2-1.5.6L8 11.6l1.5-1.7c-.4-.4-.9-.6-1.5-.6Z"
            fill="currentColor"
          />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="12"
            rx="3.8"
            fill="none"
            stroke="currentColor"
            opacity="0.4"
          />
          <rect x="2" y="2" width="20" height="9" rx="2.5" fill="currentColor" />
          <path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

export default function Phone({
  src,
  alt,
  tone = "light",
  className,
  eager,
  style,
}: PhoneProps) {
  return (
    <div
      className={"phone phone--" + tone + (className ? " " + className : "")}
      style={style}
    >
      <div className="phone__screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={780}
          height={1688}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
        <StatusBar />
        <span className="phone__island" aria-hidden="true" />
      </div>
    </div>
  );
}
