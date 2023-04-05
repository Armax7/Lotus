import * as Components from "../components";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../helpers/page_helpers/Home_helpers/query_fn";

export default function Home() {
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
    supports.isLoading
  ) {
    return <Components.Loading />;
  }

  if (
    artwork_isError ||
    techniques.isError ||
    categories.isError ||
    supports.isError
  ) {
    return (
      <h1>
        Error:{" "}
        {artwork_error ??
          techniques.error ??
          categories.error ??
          supports.error}
      </h1>
    );
  }

  return (
    <Components.NavBar
      artworks={artworks}
      techniques={techniques.data}
      categories={categories.data}
      supports={supports.data}
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

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}
