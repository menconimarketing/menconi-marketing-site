const COLUMNS: [string, string[]][] = [
  ["System", ["Websites", "Paid ads", "AI revenue"]],
  ["Site", ["Audit", "Work", "Founder", "FAQ"]],
  ["Direct", ["hello@menconimarketing.com", "Mon–Thu, 9–5 CT", "— N.M."]],
];

export default function Footer() {
  return (
    <footer
      style={{
        padding: "80px 48px 48px",
        background: "var(--mm-black)",
        display: "flex",
        flexDirection: "column",
        gap: 64,
      }}
    >
      <div className="max-w-[1400px] mx-auto w-full" style={{ display: "flex", flexDirection: "column", gap: 64 }}>
        <div
          className="grid"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}
        >
          <div>
            <img
              src="/brand/wordmark/wordmark-white.svg"
              alt="Menconi Marketing"
              style={{ height: 24, width: "auto", marginBottom: 24 }}
            />
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "var(--mm-fg-2)",
                maxWidth: 340,
                lineHeight: 1.5,
              }}
            >
              One-person marketing studio. Websites, paid ads, AI revenue systems for service businesses.
            </p>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 12,
                color: "var(--mm-fg-3)",
              }}
            >
              Chicago, IL · by appointment
            </p>
          </div>
          {COLUMNS.map(([heading, items]) => (
            <div key={heading}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  fontWeight: 500,
                  marginBottom: 18,
                }}
              >
                {heading}
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {items.map((it) => (
                  <li key={it}>
                    <a
                      href="#"
                      style={{
                        color: "var(--mm-fg-2)",
                        fontSize: 14,
                        textDecoration: "none",
                      }}
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark — SVG so it scales to fit any width perfectly */}
        <div
          style={{
            borderTop: "1px solid var(--mm-charcoal)",
            borderBottom: "1px solid var(--mm-charcoal)",
            padding: "24px 0",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 1000 140"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "auto", display: "block" }}
            aria-hidden
          >
            <text
              x="500"
              y="115"
              textAnchor="middle"
              fontFamily="var(--font-afacad), Afacad, sans-serif"
              fontWeight="600"
              fontSize="148"
              letterSpacing="-5"
              fill="var(--mm-ink)"
            >
              MENCONI MARKETING
            </text>
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            color: "var(--mm-fg-3)",
            letterSpacing: "0.06em",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>© 2026 Menconi Marketing</span>
          <span style={{ fontFamily: "ui-monospace, monospace" }}>
            v1.0 · CHI · 41.88°N
          </span>
        </div>
      </div>
    </footer>
  );
}
