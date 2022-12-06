import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default trpc.withTRPC(App);
