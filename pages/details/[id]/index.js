import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../../helpers/page_helpers/Home_helpers/query_fn";
import * as Components from "../../../components";
import style from "../../../styles/Details.module.css";

function DetailsPage(context) {
  const [review, setReview] = useState([]);

  const queryClient = ReactQuery.useQueryClient();
  const router = useRouter();
  const { id: artworkId } = router.query;

  useEffect(() => {
    async function fetchreviews() {
      const reviewsData = await QueryFns.getReviewsByArtworkId(artworkId);
      setReview(reviewsData);
    }
    fetchreviews();
  }, [artworkId]);

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

  const handleDeleteReviews = async (id) => {
    const res = await QueryFns.deleteReview(id);
    
    setReview(review.filter((reviews) => reviews.id !== id));
  };

  const handleUpdateReviews = async (id, rating, comment) => {

  await QueryFns.updateReview(rating, comment, id);

    const index = review.findIndex((review) => review.id === id);
    const reviewToUpdate = { ...review[index] };
    reviewToUpdate.rating = rating;
    reviewToUpdate.comment = comment;
    const updatedReviews = [...review];
    updatedReviews[index] = reviewToUpdate;
    
    
    setReview(updatedReviews);
  };
  
  return (
    <>
      <Chakra.Box className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.backButton}>
          <Components.BackButton/>
          </div>
          <Components.Carousel images={imageUrl} />
          <Components.ArtworksInfo
            author={artwork.data.author[0]}
            artwork={artwork.data.artwork}
          />
        </div>
      </Chakra.Box>
      <div style={{background: "#f9f5e7"}} >
      <Chakra.Heading as="h1" size="xl">
        Valoraciones
      </Chakra.Heading>
      <Chakra.Flex flexWrap="wrap" justifyContent="space-between">
        {review && review.length > 0
          ? review.map((review) => (
              <Components.Opinions
                key={review.id}
                user_id={review.user_id}
                rating={review.rating}
                comment={review.comment}
                name={review.user_name}
                date={review.created_at}
                imageUrl={review.user_image}
                id={review.id}
                handleDelete={handleDeleteReviews}
                handleUpdate={handleUpdateReviews}
              />
            ))
          : null}
      </Chakra.Flex>
      </div>
    </>
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
