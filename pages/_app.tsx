import React from "react";
import { AppProps } from "next/app";
import "../styles/index.scss";
import { ModalProvider } from "../hooks/useModalManager";

import ErrorBoundary from "../components/ErrorBoundary";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
