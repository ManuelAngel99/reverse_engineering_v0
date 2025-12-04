import React, { Component, type ReactNode, Suspense } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("[v0-runtime] Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function NotFoundBoundary({ children, fallback }: ErrorBoundaryProps) {
  // TODO: Connect to router state to check for 404
  return <>{children}</>;
}

export function RenderThenable({ render }: { render: any }) {
  return <Suspense fallback={null}>{render}</Suspense>;
}
