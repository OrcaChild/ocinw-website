"use client";

// global-error.tsx replaces the root layout, so Tailwind classes AND next-intl
// providers are unavailable. All styles must be inline. Locale is detected
// from window.location on first render; English is the SSR default.

import { useState } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const messages = {
  en: {
    title: "Something Went Wrong",
    description:
      "An unexpected error occurred. Please try again, or head back to the homepage.",
    retry: "Try Again",
    home: "Go to Homepage",
  },
  es: {
    title: "Algo salió mal",
    description:
      "Ocurrió un error inesperado. Por favor intenta de nuevo o regresa al inicio.",
    retry: "Intentar de nuevo",
    home: "Ir al inicio",
  },
} as const;

export default function GlobalError({ reset }: Props) {
  // Lazy initializer — runs on client first render, reads URL for locale
  const [locale] = useState<"en" | "es">(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/es")
    ) {
      return "es";
    }
    return "en";
  });

  const m = messages[locale];

  return (
    <html lang={locale}>
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#f7fafc",
          color: "#1a2332",
          margin: 0,
        }}
      >
        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, margin: 0 }}>
          {m.title}
        </h1>
        <p style={{ marginTop: "1rem", maxWidth: "28rem", color: "#506070" }}>
          {m.description}
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <button
            onClick={reset}
            style={{
              borderRadius: "0.625rem",
              backgroundColor: "#1a5f9e",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {m.retry}
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error replaces root layout, so next/link is unavailable */}
          <a
            href="/"
            style={{
              borderRadius: "0.625rem",
              border: "1px solid #c7d2da",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#1a2332",
              textDecoration: "none",
            }}
          >
            {m.home}
          </a>
        </div>
      </body>
    </html>
  );
}
