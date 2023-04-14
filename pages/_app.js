import Head from "next/head";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../components";
import * as Layouts from "../layouts";
import * as UserAuth from "../helpers/supabase_helpers/user_management";

const theme = extendTheme({
  colors: {
    lotus: {
      100: "#804674",
      200: "#804674",
      300: "#804674",
      400: "#804674",
      500: "#804674",
      600: "#804674",
      700: "#f9f5e7",
      800: "#804674",
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new ReactQuery.QueryClient());
  useEffect(() => {
    async function createUserDetails() {
      try {
        const logged = await UserAuth.loggedStatus();
        if (logged) {
          const userId = await UserAuth.getUserId();
          const hasDetails = await UserAuth.hasUserDetails(userId);
          if (!hasDetails) {
            const userName = await UserAuth.getUserData().then(
              (user) => user.user_metadata?.name
            );
            const newUserDetails = await UserAuth.postUserDetails({
              id: userId,
              name: userName || "OAuth provided",
            });
            console.log("New User Created ");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    createUserDetails();
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <ChakraProvider theme={theme}>
      <ReactQuery.QueryClientProvider client={queryClient}>
        <ReactQuery.Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>Lotus Art Gallery</title>
            <meta name="description" content="Lotus Art Gallery" />
            <link rel="icon" href="/lotusIsotipo.svg" />
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
