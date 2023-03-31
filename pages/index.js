import axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as Components from "../components";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFn from "../helpers/page_helpers/Home_helpers/query_fn";

export default function Home() {
  const queryClient = ReactQuery.useQueryClient();

  const {
    isLoading: artwork_isLoading,
    isError: artwork_isError,
    data: artworks,
    error: artwork_error,
  } = ReactQuery.useQuery({
    queryKey: [QueryKeys.QK_ARTWORKS],
    queryFn: QueryFn.getAllArtworksAxios,
  });

  if (artwork_isLoading) {
    return <h1>IS LOADING...................</h1>;
  }

  if (artwork_isError) {
    return <h1>Error: {artwork_error}</h1>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img src="/Lotus_Logo.jpeg" alt="Loto" />

        <p className={styles.description}>
          <code>
            SOMOS LOTUS Te ayudamos a convertir tu casa, departamento, oficina,
            dormitorio o el lugar que quieras, en tu espacio favorito.
          </code>
        </p>
        <Chakra.Box
          as="h1"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color="black"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
          paddingTop="15px"
        >
          ✨CUADROS DESTACADOS DE NUESTRA SELECCIÓN✨
        </Chakra.Box>

        <Components.CardContainer cards={artworks} columns={3} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const queryClient = new ReactQuery.QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_ARTWORKS],
    queryFn: QueryFn.getAllArtworksAxios,
  });

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}
