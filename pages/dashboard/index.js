import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import { AdminLayout } from "../../layouts";
import { artworks_mock } from "../../helpers/mocks/layouts_mock/Artworks_mock";
import * as Components from "../../components";
import * as Layouts from "../../layouts";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
//import * as Chakra from "@chakra-ui/react";

function Dashboard() {
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

  return (
    <Chakra.Box w={"80%"}>
      <Layouts.Artworks
        techniques={techniques.data}
        categories={categories.data}
        supports={supports.data}
        showAvailableOnly={false}
        baseHref={"/dashboard/details"}
      />
    </Chakra.Box>
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

  return { props: { dehydratedState: ReactQuery.dehydrate(queryClient) } };
}

export default Dashboard;

Dashboard.getLayout = function PageLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
