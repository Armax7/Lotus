import * as Components from "../../../components";

function DetailsPage({ author, artwork, showcase }) {
  const imageUrl = showcase.map((element) => {
    return element.image;
  });
  imageUrl.unshift(artwork.image);

  return (
    <div>
      <div style={{ display: "flex", margin: "80px 20px" }}>
        <Components.Carousel images={imageUrl} />
        <Components.ArtworksInfo
          author={author}
          artwork={artwork}
          rate={false}
        />
        
      </div>
      
    </div>
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

  const author = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/authors/id/${artwork.author_id}`
  )
    .then((res) => res.json())
    .then((authors) => authors.at(0))
    .catch((error) => null);

  return {
    props: { artwork, showcase, author },
  };
}

export default DetailsPage;


