type Props = {
  number: string;
  label: string;
  className?: string;
};

// Eyebrow with gradient leading number — distributed brand presence.
// Format: [GRADIENT NUMBER] / [muted label]
export default function Eyebrow({ number, label, className = "" }: Props) {
  return (
    <div
      className={`mm-eyebrow ${className}`}
      style={{ color: "var(--mm-fg-3)" }}
    >
      <span className="mm-gradient-text" style={{ fontWeight: 600 }}>
        {number}
      </span>
      <span> / {label}</span>
    </div>
  );
}
