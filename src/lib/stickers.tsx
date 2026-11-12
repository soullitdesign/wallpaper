/**
 * Hand-drawn sticker shapes used to sell the "printed collage" feel.
 * All are inline SVG so they cost nothing extra to load.
 */
export function Star({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 0.8c.7 5.4 2.8 8.35 11.2 11.2-8.4 2.85-10.5 5.8-11.2 11.2-.7-5.4-2.8-8.35-11.2-11.2C9.2 9.15 11.3 6.2 12 .8Z" />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 2v6m0 8v6M2 12h6m8 0h6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sunflower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g fill="currentColor">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="16"
            cy="6.4"
            rx="2.1"
            ry="4.2"
            transform={`rotate(${i * 30} 16 16)`}
            opacity={0.85}
          />
        ))}
      </g>
      <circle cx="16" cy="16" r="4.6" fill="var(--seed, #3A2413)" />
    </svg>
  );
}

export function Moon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.9 3.2a13 13 0 1 0 7.9 18.9A11 11 0 0 1 20.9 3.2Z" />
    </svg>
  );
}

export function Crescent({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path
        d="M22.4 5.6a11.2 11.2 0 1 0 4.4 15.1 9 9 0 0 1-4.4-15.1Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Ribbon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M1 9c18-8 32 6 52 2S86 1 119 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 12" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M1 8c9-6 17 4 26-1s17 5 26 0 17 4 26 1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
