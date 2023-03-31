import axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as Components from "../components";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFn from "../helpers/page_helpers/Home_helpers/query_fn";
import * as Layouts from "../layouts";

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

  return <Layouts.Home artworks={artworks} />;
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
