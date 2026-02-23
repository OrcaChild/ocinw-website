"use client";

// global-error.tsx replaces the root layout, so Tailwind classes are unavailable.
// All styles must be inline. Colors match the OCINW ocean theme.

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: Props) {
  return (
    <html lang="en">
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
          Something Went Wrong
        </h1>
        <p style={{ marginTop: "1rem", maxWidth: "28rem", color: "#506070" }}>
          An unexpected error occurred. Please try again, or head back to the
          homepage.
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
            Try Again
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
            Go to Homepage
          </a>
        </div>
      </body>
    </html>
  );
}
