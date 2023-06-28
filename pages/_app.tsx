import React from "react";
import { AppProps } from "next/app";
import "../styles/index.scss";
import { ModalProvider } from "../hooks/useModalManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
