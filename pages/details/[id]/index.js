import * as Components from "../../../components";
import * as Chakra from "@chakra-ui/react";

function DetailsPage({ artwork, showcase }) {
  const imageUrl = showcase.map((element) => {
    return element.image;
  });
  imageUrl.unshift(artwork.image);

  return (
    <Chakra.Box>
      <Components.BackButton href={"/"} />
      <div style={{ display: "flex", margin: "80px 20px" }}>
        <Components.Carousel images={imageUrl} />
        <Components.ArtworksInfo artwork={artwork} rate={true} />
      </div>
    </Chakra.Box>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const showcase = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/art-showcase/id/${id}`
  )
    .then((res) => res.json())
    .catch((error) => null);

  const artwork = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/artworks/id/${id}`
  )
    .then((res) => res.json())
    .then((artworks) => artworks.at(0))
    .catch((error) => null);

  return {
    props: { artwork, showcase },
  };
}

export default DetailsPage;
