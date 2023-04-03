import axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as Components from "../components";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../helpers/page_helpers/Home_helpers/query_fn";
import * as Layouts from "../layouts";
import { useEffect } from "react";

export default function Home({ }) {
  const queryClient = ReactQuery.useQueryClient();

  const {
    isLoading: artwork_isLoading,
    isError: artwork_isError,
    data: artworks,
    error: artwork_error,
  } = ReactQuery.useQuery({
    queryKey: [QueryKeys.QK_ARTWORKS],
    queryFn: QueryFns.getAllArtworksAxios,
  });

  const artworksNames = ReactQuery.useQuery({
    queryKey:[QueryKeys.QK_ARTWORKS_BYNAME],
    queryFn: QueryFns.getArtworkByname,
  });

  const techniques = ReactQuery.useQuery(
    [QueryKeys.QK_TECHNIQUES],
    QueryFns.getTechniquesAxios
  );

  const categories = ReactQuery.useQuery(
    [QueryKeys.QK_CATEGORIES],
    QueryFns.getCategoriesAxios
  );

  const supports = ReactQuery.useQuery(
    [QueryKeys.QK_SUPPORTS],
    QueryFns.getSupportsAxios
  );

  if (
    artwork_isLoading ||
    techniques.isLoading ||
    categories.isLoading ||
    supports.isLoading ||
    artworksNames.isLoading
  ) {
    return <Components.Loading />;
  }

  if (
    artwork_isError ||
    techniques.isError ||
    categories.isError ||
    supports.isError ||
    artworksNames.isError


  ) {
    return (
      <h1>
        Error:{" "}
        {artwork_error ??
          techniques.error ??
          categories.error ??
          supports.error ??
          artworksNames.error}
      </h1>
    );
  }

  return (
    <Components.NavBar
      artworks={artworks}
      techniques={techniques.data}
      categories={categories.data}
      supports={supports.data}
      artworksNames={artworksNames}
    />
  );
}

export async function getServerSideProps() {
  const queryClient = new ReactQuery.QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_ARTWORKS],
    queryFn: QueryFns.getAllArtworksAxios,
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_SUPPORTS],
    queryFn: QueryFns.getSupportsAxios,
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_TECHNIQUES],
    queryFn: QueryFns.getTechniquesAxios,
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_ARTWORKS_BYNAME],
    queryFn: QueryFns.getArtworkByname,
  });

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}
