"use client";

import { useMemo } from "react";

interface MDXContentProps {
  /** Compiled MDX body string from Velite */
  code: string;
}

/**
 * Renders compiled MDX content from Velite.
 * Velite compiles MDX into a function string that creates React elements.
 * This component evaluates that function with the React JSX runtime.
 */
export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => {
    // Velite compiles MDX to a function body that expects {Fragment, jsx, jsxs}
    // We create a module from this code and extract the default export
    const fn = new Function(code);
    const { default: MDXComponent } = fn({
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- Velite MDX runtime needs React JSX factories
      ...require("react/jsx-runtime"),
    });
    return MDXComponent;
  }, [code]);

  return <Component />;
}
