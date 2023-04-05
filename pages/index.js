import * as Components from "../components";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../helpers/page_helpers/Home_helpers/query_fn";
import * as Layouts from "../layouts";

export default function Home() {
  const queryClient = ReactQuery.useQueryClient();

  const artworks = ReactQuery.useQuery({
    queryKey: [QueryKeys.QK_ARTWORKS],
    queryFn: QueryFns.getAllArtworksAxios,
  });

  if (artworks.isLoading) {
    return <Components.Loading />;
  }

  if (artworks.isError) {
    return <h1>Error: {artworks.error}</h1>;
  }

  return <Layouts.Home artworks={artworks.data} />;
}

export async function getServerSideProps() {
  const queryClient = new ReactQuery.QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_ARTWORKS],
    queryFn: QueryFns.getAllArtworksAxios,
  });

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}
