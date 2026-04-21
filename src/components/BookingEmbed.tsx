"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";

type Props = {
  fallbackEmail?: string;
};

export default function BookingEmbed({
  fallbackEmail = "nico@menconimarketing.com",
}: Props) {
  useEffect(() => {
    if (!CAL_LINK) return;
    (async () => {
      const cal = await getCalApi({ namespace: "menconi-audit" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: {
            "cal-bg": "#0F1012",
            "cal-bg-emphasis": "#161719",
            "cal-bg-muted": "#222326",
            "cal-text": "#F0F1F3",
            "cal-text-emphasis": "#FFFFFF",
            "cal-text-muted": "#8B8D93",
            "cal-border": "#222326",
            "cal-border-subtle": "#161719",
            "cal-brand": "#5E6AD2",
            "cal-brand-text": "#08090A",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  // No Cal link configured \u2014 fall back to email link.
  if (!CAL_LINK) {
    return (
      <div
        className="p-10 text-center"
        style={{
          background: "rgba(15, 16, 18, 0.6)",
          border: "1px solid rgba(34, 35, 38, 0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p className="text-graphite text-xs uppercase tracking-[0.15em] mb-4">
          Calendar setup pending
        </p>
        <a
          href={`mailto:${fallbackEmail}`}
          data-cursor="cta"
          className="text-accent hover:text-accent-bright text-sm transition-colors duration-300 underline-offset-4 hover:underline"
        >
          Email Nico directly to book \u2192
        </a>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden"
      style={{
        background: "rgba(15, 16, 18, 0.6)",
        border: "1px solid rgba(94, 106, 210, 0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Cal
        namespace="menconi-audit"
        calLink={CAL_LINK}
        style={{ width: "100%", height: "640px", overflow: "hidden" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
