import type { Metadata } from "next";
import { Inter, Nunito, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orcachildinthewild.com";

const DESCRIPTION =
  "Youth-run nonprofit dedicated to aquatic conservation, marine education, and coastal community engagement in Southern California.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Orca Child in the Wild",
    default: "Orca Child in the Wild",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Orca Child in the Wild",
    title: "Orca Child in the Wild",
    description: DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Orca Child in the Wild — Youth-run aquatic conservation in Southern California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orca Child in the Wild",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Organization JSON-LD structured data — helps Google understand who we are
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  name: "Orca Child in the Wild",
  alternateName: "OCINW",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DESCRIPTION,
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Jordyn Rosario",
  },
  areaServed: {
    "@type": "State",
    name: "California",
    containsPlace: [
      { "@type": "City", name: "Los Angeles" },
      { "@type": "City", name: "San Diego" },
    ],
  },
  knowsAbout: [
    "Marine conservation",
    "Aquatic ecosystems",
    "Ocean education",
    "Coastal cleanup",
    "Marine wildlife",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "General Inquiry",
    url: `${SITE_URL}/en/contact`,
  },
  sameAs: ["https://github.com/OrcaChild"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${nunito.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
