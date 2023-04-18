import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as Components from "../../../../components";
import * as ArtworkFormAxios from "../../../../helpers/page_helpers/ArtworkForms_helpers/query_fns";
import * as QueryFns from "../../../../helpers/page_helpers/Home_helpers/query_fn";
import * as QueryKeys from "../../../../helpers/page_helpers/Home_helpers/query_keys";
import * as Layouts from "../../../../layouts";

function ArtworkByIdDashboard({ artworkId }) {
  const queryClient = ReactQuery.useQueryClient();
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

  const showcase = ReactQuery.useQuery([QueryKeys.QK_SHOWCASE], async () => {
    const showcases = await QueryFns.getShowcaseByIdAxios(artworkId);
    return showcases;
  });

  const artwork = ReactQuery.useQuery(
    [QueryKeys.QK_ARTWORK_BY_ID],
    async () => {
      const artworks = await QueryFns.getArtworkByIdAxios(artworkId);
      const author = await QueryFns.getAuthorByIdAxios(artworks[0].author_id);
      return { artwork: artworks[0], author: author };
    }
  );

  const artworkMutation = ReactQuery.useMutation(
    ArtworkFormAxios.updateArtworkAxios,
    {
      onSuccess: () =>
        queryClient.invalidateQueries(QueryKeys.QK_ARTWORK_BY_ID),
      onError: (error) => console.log(error),
    }
  );

  if (artwork.isLoading || artworkMutation.isLoading) {
    return <Components.Loading />;
  }

  if (artwork.isError || artworkMutation.isError) {
    return (
      <Components.Alert
        status={"error"}
        title={"Error: "}
        description={`${artwork.error ?? artworkMutation.error}`}
      />
    );
  }

  const imageUrl = showcase.data.map((obj) => obj.image);
  imageUrl.unshift(artwork.data.artwork.image);

  return (
    <Chakra.Box bgColor={"var(--color5)"} p={"15px"} pt={"2em"}>
      <Chakra.Flex w={"100%"} justifyContent={"space-between"}>
        <Components.BackButton ml={"12px"} />
      </Chakra.Flex>
      <Chakra.Box m={"auto"}>
        <Chakra.SimpleGrid padding={"12px"} mt={"5%"} columns={2} gap={"15%"}>
          <Components.ArtworksInfo
            author={artwork.data.author[0]}
            artwork={artwork.data.artwork}
            showAddToCart={false}
          />
          <Components.Carousel images={imageUrl} />
        </Chakra.SimpleGrid>
        <Chakra.Button
          onClick={onOpen}
          bgColor={"var(--color1)"}
          textColor={"white"}
          m={"auto"}
          w={"250px"}
          minW={"100px"}
        >
          Editar
        </Chakra.Button>
        <Chakra.Drawer
          isOpen={isOpen}
          placement={"top"}
          onClose={onClose}
          size={"full"}
        >
          <Chakra.DrawerOverlay />
          <Chakra.DrawerContent bgColor={"var(--color3)"}>
            <Chakra.DrawerBody>
              <Components.UpdateArtworkForm
                artwork={artwork.data.artwork}
                onSubmit={artworkMutation.mutate}
                onClose={onClose}
                py={"1rem"}
              />
            </Chakra.DrawerBody>
          </Chakra.DrawerContent>
        </Chakra.Drawer>
      </Chakra.Box>
    </Chakra.Box>
  );
}

export async function getServerSideProps(context) {
  const queryClient = new ReactQuery.QueryClient();
  const { id } = context.query;

  await queryClient.prefetchQuery([QueryKeys.QK_SHOWCASE], async () => {
    const showcases = await QueryFns.getShowcaseByIdAxios(id);
    return showcases;
  });

  await queryClient.prefetchQuery([QueryKeys.QK_ARTWORK_BY_ID], async () => {
    const artworks = await QueryFns.getArtworkByIdAxios(id);
    const author = await QueryFns.getAuthorByIdAxios(artworks[0].author_id);
    return { artwork: artworks[0], author: author };
  });

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
      artworkId: id,
    },
  };
}

export default ArtworkByIdDashboard;

ArtworkByIdDashboard.getLayout = function PageLayout(page) {
  return <Layouts.AdminLayout>{page}</Layouts.AdminLayout>;
};
