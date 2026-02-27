"use client";

import { Component, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { clearSavedLocation } from "@/lib/api/geolocation";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

// Functional component handles translated UI — class components cannot use hooks
function ErrorFallback({ onReset }: { onReset: () => void }): ReactNode {
  const t = useTranslations("weather");
  return (
    <Alert variant="destructive" className="mx-auto max-w-lg">
      <AlertTriangle className="size-4" aria-hidden="true" />
      <AlertTitle>{t("errorTitle")}</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-4">{t("errorMessage")}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          {t("errorReset")}
        </Button>
      </AlertDescription>
    </Alert>
  );
}

/**
 * Error boundary that catches rendering errors in weather components.
 * Provides a "Reset Location" button to clear poisoned sessionStorage
 * and restore the user to the location selector.
 */
export class WeatherErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReset = (): void => {
    clearSavedLocation();
    this.setState({ hasError: false });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}
