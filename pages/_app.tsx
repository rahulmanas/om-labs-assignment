import React from "react";
import { AppProps } from "next/app";
import { GlobalProvider } from "../hooks/useGlobal";

import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
