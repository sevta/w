import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextNProgress />
      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
