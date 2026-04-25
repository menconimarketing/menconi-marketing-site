const COLUMNS: [string, string[]][] = [
  ["Audit", ["Run the audit", "How it works", "Pricing"]],
  ["Work", ["Case studies", "Process", "FAQ"]],
  ["Direct", ["nico@menconimarketing.com", "Mon–Thu, 9–5 CT", "— N.M."]],
];

export default function Footer() {
  return (
    <footer
      style={{
        padding: "64px 48px 48px",
        background: "var(--mm-black)",
        display: "flex",
        flexDirection: "column",
        gap: 64,
      }}
    >
      <div
        className="grid gap-12"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
        }}
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
            One-person marketing studio. Websites, paid ads, and AI revenue tools for service businesses.
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
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      color: "var(--mm-fg-2)",
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--mm-charcoal)",
          paddingTop: 24,
          fontSize: 12,
          color: "var(--mm-fg-3)",
          letterSpacing: "0.06em",
        }}
      >
        <span>© 2026 Menconi Marketing</span>
        <span style={{ fontFamily: "ui-monospace, monospace" }}>v1.0 · CHI · 41.88°N</span>
      </div>
    </footer>
  );
}
