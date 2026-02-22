"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: Props) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 text-center text-gray-900">
        <h1 className="text-3xl font-bold">Something Went Wrong</h1>
        <p className="mt-4 max-w-md text-gray-600">
          An unexpected error occurred. Please try again, or head back to the
          homepage.
        </p>
        <div className="mt-8 flex gap-4">
          <button
            onClick={reset}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Try Again
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error replaces root layout, so next/link is unavailable */}
          <a
            href="/"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Go to Homepage
          </a>
        </div>
      </body>
    </html>
  );
}
