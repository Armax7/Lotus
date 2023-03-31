import Head from "next/head";
import "../styles/globals.css";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../components";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new ReactQuery.QueryClient());

  return (
    <ChakraProvider>
      <ReactQuery.QueryClientProvider client={queryClient}>
        <ReactQuery.Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>Lotus Art Gallery</title>
            <meta name="description" content="Lotus Art Gallery" />
            <link rel="icon" href="/Lotus_Tab_logo.png" />
          </Head>
          <Components.NavBar />
          <Component {...pageProps} />
          <Components.Footer />
        </ReactQuery.Hydrate>
      </ReactQuery.QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
