import axios from "axios";
import Head from "next/head";
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

        <Components.BackButton href={"/art-details"} />
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
        <Components.SearchBar/>

        <Components.CardContainer cards={artworks} columns={3} />

        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.instagram.com/galeriadeartesolidario/"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTAGRAM{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
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
