import { useRouter } from "next/router";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../../helpers/page_helpers/Home_helpers/query_fn";
import * as Components from "../../../components";

function DetailsPage(context) {
  const queryClient = ReactQuery.useQueryClient();
  const router = useRouter();
  const { id: artworkId } = router.query;

  const showcase = ReactQuery.useQuery([QueryKeys.QK_SHOWCASE], async () => {
    const showcases = await QueryFns.getShowcaseByIdAxios(artworkId);
    return showcases;
  });

  const artwork = ReactQuery.useQuery(
    [QueryKeys.QK_ARTWORK_BY_ID],
    async () => {
      const artworks = await QueryFns.getArtworkByIdAxios(artworkId);
      return artworks.at(0);
    }
  );

  if (showcase.isLoading || artwork.isLoading) {
    return <Components.Loading />;
  }

  const imageUrl = showcase.data.map((element) => {
    return element.image;
  });
  imageUrl.unshift(artwork.data.image);

  return (
    <Chakra.Box>
      <Components.BackButton href={"/"} />
      <div style={{ display: "flex", margin: "80px 20px" }}>
        <Components.Carousel images={imageUrl} />
        <Components.ArtworksInfo artwork={artwork.data} rate={true} />
      </div>
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
    return artworks.at(0);
  });

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}

export default DetailsPage;