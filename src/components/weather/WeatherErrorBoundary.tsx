"use client";

import { Component, type ReactNode } from "react";
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

/**
 * Error boundary that catches rendering errors in weather components.
 * Provides a "Reset Location" button to clear poisoned localStorage
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
      return (
        <Alert variant="destructive" className="mx-auto max-w-lg">
          <AlertTriangle className="size-4" aria-hidden="true" />
          <AlertTitle>Weather data error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              Something went wrong loading weather data. This can happen with certain
              location coordinates. Click below to reset and try a different location.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={this.handleReset}
              className="gap-2"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Reset Location & Retry
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
