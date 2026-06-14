"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class LandingErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              background: "#080814",
              color: "#9898b0",
              fontFamily: "system-ui, sans-serif",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            <div>
              <p style={{ fontSize: "32px", marginBottom: "12px" }}>⚡</p>
              <p style={{ fontWeight: 600, color: "#edede7", marginBottom: "8px" }}>
                This page couldn&apos;t be rendered
              </p>
              <p>The landing config contains an error. Check the section data.</p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
