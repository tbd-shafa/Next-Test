import type { AppProps } from "next/app";
import { useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/fonts.scss";
import "../styles/subscription.scss";
import "../styles/dashbord.scss";
import "../styles/globals.scss";
import "../styles/login.scss";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Import Bootstrap JS
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
