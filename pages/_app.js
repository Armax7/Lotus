import Head from "next/head";
import "../styles/globals.css";
import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../components";

const theme = extendTheme({
  colors: {
    lotus: {
      100: "#804674",
      200: "#804674",
      300: "#804674",
      400: "#804674",
      500: "#804674",
      600: "#804674",
      700: "#804674",
      800: "#804674",
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new ReactQuery.QueryClient());
  return (
    <ChakraProvider theme={theme}>
      <ReactQuery.QueryClientProvider client={queryClient}>
        <ReactQuery.Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>Lotus Art Gallery</title>
            <meta name="description" content="Lotus Art Gallery" />
            <link rel="icon" href="/lotusIsotipo.svg" />
          </Head>
          <Component {...pageProps} />
          <Components.Footer />
        </ReactQuery.Hydrate>
      </ReactQuery.QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
