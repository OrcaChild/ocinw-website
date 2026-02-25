import * as runtime from "react/jsx-runtime";

interface MDXContentProps {
  /** Compiled MDX body string from Velite */
  code: string;
}

/**
 * Renders compiled MDX content from Velite.
 * Server component — new Function() runs in Node.js where CSP doesn't apply.
 * This avoids needing 'unsafe-eval' in the browser's Content Security Policy.
 */
export function MDXContent({ code }: MDXContentProps) {
  const fn = new Function(code);
  const { default: MDXComponent } = fn(runtime);
  return <MDXComponent />;
}
