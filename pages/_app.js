import "../styles/globals.css";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../components"

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new ReactQuery.QueryClient());

  return (
    <ChakraProvider>
      <ReactQuery.QueryClientProvider client={queryClient}>
        <ReactQuery.Hydrate state={pageProps.dehydratedState}>
          <Components.NavBar/>
          <Component {...pageProps} />
        </ReactQuery.Hydrate>
      </ReactQuery.QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
