import "../styles/globals.css";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new ReactQuery.QueryClient());

  return (
    <ChakraProvider>
      <ReactQuery.QueryClientProvider client={queryClient}>
        <ReactQuery.Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </ReactQuery.Hydrate>
      </ReactQuery.QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
