import React from "react";
import { AppProps } from "next/app";
import "../styles/index.scss";
import { ModalProvider } from "../hooks/useModalManager";
import { PlumModalProvider } from "../hooks/useConfirm";

import ErrorBoundary from "../components/ErrorBoundary";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <PlumModalProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </PlumModalProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
