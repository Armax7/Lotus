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
      const author = await QueryFns.getAuthorByIdAxios(artworks[0].author_id);
      return { artwork: artworks[0], author: author };
    }
  );

  if (artwork.isLoading) {
    return <Components.Loading />;
  }

  const imageUrl = showcase.data.map((obj) => obj.image);
  imageUrl.unshift(artwork.data.artwork.image);

  return (
    <Chakra.Box>
      <Components.BackButton href={"/"} />
      <div style={{ display: "flex", margin: "80px 20px" }}>
        <Components.Carousel images={imageUrl} />
        <Components.ArtworksInfo
          author={artwork.data.author[0]}
          artwork={artwork.data.artwork}
        />
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
    const author = await QueryFns.getAuthorByIdAxios(artworks[0].author_id);
    return { artwork: artworks[0], author: author };
  });

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
    },
  };
}

export default DetailsPage;
