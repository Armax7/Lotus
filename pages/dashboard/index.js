import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import { AdminLayout } from "../../layouts";
import * as Components from "../../components";
import * as Layouts from "../../layouts";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
import * as ArtworkFormsAxios from "../../helpers/page_helpers/ArtworkForms_helpers/query_fns";
//import * as Chakra from "@chakra-ui/react";

function Dashboard() {
  const queryClient = ReactQuery.useQueryClient();

  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

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

  const artworkPostMutation = ReactQuery.useMutation(
    ArtworkFormsAxios.postArtworkAxios,
    { onError: (error) => console.log(error) }
  );

  if (
    techniques.isLoading ||
    categories.isLoading ||
    supports.isLoading ||
    artworkPostMutation.isLoading
  ) {
    return <Components.Loading />;
  }

  return (
    <Chakra.Flex direction={"column"} w={"80%"} pt={"2rem"}>
      <Chakra.Box mx={"75%"}>
        <Chakra.Button
          onClick={onOpen}
          bgColor={"var(--color1)"}
          textColor={"white"}
          w={"250px"}
          minW={"100px"}
        >
          Agregar obra
        </Chakra.Button>
      </Chakra.Box>
      <Layouts.Artworks
        techniques={techniques.data}
        categories={categories.data}
        supports={supports.data}
        showAvailableOnly={false}
        baseHref={"/dashboard/artwork"}
      />
      <Chakra.Drawer
        isOpen={isOpen}
        placement={"top"}
        onClose={onClose}
        size={"full"}
      >
        <Chakra.DrawerOverlay />
        <Chakra.DrawerContent bgColor={"var(--color3)"}>
          <Chakra.DrawerBody>
            <Components.PostArtworkForm onSubmit={artworkPostMutation.mutate} onClose={onClose} />
          </Chakra.DrawerBody>
        </Chakra.DrawerContent>
      </Chakra.Drawer>
    </Chakra.Flex>
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
