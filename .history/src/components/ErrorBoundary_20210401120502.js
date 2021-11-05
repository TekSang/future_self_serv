import React from "react";

import { logError } from "../libs/errorLib";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <div style={{ textAlign: "center", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h2>Sorry there was a problem loading this page</h2>
      </div>
    ) : (
      this.props.children
    );
  }
}
