import * as Components from "../../components";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as Layouts from "../../layouts";

function Artworks() {
  const queryClient = ReactQuery.useQueryClient();

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

  if (techniques.isLoading || categories.isLoading || supports.isLoading) {
    return <Components.Loading />;
  }

  return (
    <Layouts.Artworks
      techniques={techniques.data}
      categories={categories.data}
      supports={supports.data}
    />
  );
}

export async function getServerSideProps() {
  const queryClient = new ReactQuery.QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_SUPPORTS],
    queryFn: QueryFns.getSupportsAxios,
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_TECHNIQUES],
    queryFn: QueryFns.getTechniquesAxios,
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.QK_CATEGORIES],
    queryFn: QueryFns.getCategoriesAxios,
  });

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}

export default Artworks;
