import Head from "next/head";
import "../styles/globals.css";
import { useState } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../components";
import * as Layouts from "../layouts";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new ReactQuery.QueryClient());
  const router = useRouter();

  theme.colors.teal = { 600: "#804674" };

  return (
    <ChakraProvider>
      <ReactQuery.QueryClientProvider client={queryClient}>
        <ReactQuery.Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>Lotus Art Gallery</title>
            <meta name="description" content="Lotus Art Gallery" />
            <link rel="icon" href="/Lotus_Tab_logo.png" />
          </Head>
          <Layouts.AppLayout>
            <Component {...pageProps} />
          </Layouts.AppLayout>
        </ReactQuery.Hydrate>
      </ReactQuery.QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
