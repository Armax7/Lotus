import { Box, Heading, Badge, Text } from "@chakra-ui/react";
import RatingStars from "../RatingStars/RatingStars";
import AddToCart from "../AddToCart/AddToCart";

const ArtworksInfo = ({ author, rate, artwork, ...props }) => {
  //const [isAvailable, setIsAvailable] = useState(true);
  return (
    <Box fontFamily={"Poppins"} w={"100%"} minW={"296px"} maxW={"520px"}>
      <Heading
        fontFamily={"Poppins"}
        as="h1"
        fontWeight="bold"
        color="var(--black)"
        lineHeight={"10px"}
        fontSize="36px"
        mb={"20px"}
      >
        {artwork.name}
      </Heading>
      <Heading
        fontFamily={"Poppins"}
        as="h3"
        fontSize="16px"
        color={"var(--color2)"}
        mb={"20px"}
      >
        By: {author.name} {author.lastname}
      </Heading>
      <Badge
        borderRadius={"12px"}
        padding={"12px 24px"}
        colorScheme="lotus"
        variant="solid"
        fontSize="25px"
        mb={"20px"}
      >
        $ {artwork.price}
      </Badge>

      <Text
        fontSize="lg"
        color="var(--black)"
        mb={"20px"}
        textAlign={"justify"}
      >
        {artwork.description
          ? artwork.description
          : "Esta obra no cuenta con una descripcion"}
      </Text>

      {artwork.stock > 1 ? (
        <Text fontSize="lg" color="var(--black)" mb={"20px"}>
          Todavia quedan{" "}
          <b style={{ color: "var(--color1)" }}>{artwork.stock}</b> unidades
        </Text>
      ) : artwork.stock > 0 ? (
        <Text fontSize="lg" color="var(--black)" mb={"20px"}>
          Todavia queda <b>{artwork.stock}</b> unidad
        </Text>
      ) : (
        <Text fontSize="lg" color="gray.700" marginTop="25px">
          Ya no quedan unidades de esta obra...
        </Text>
      )}

      <RatingStars ratingDb={artwork.rating} />
      <AddToCart
        id={artwork.id}
        stock={artwork.stock}
        name={artwork.name}
        price={artwork.price}
        price_id={artwork.stripe_price_id}
        image={artwork.image}
      />
    </Box>
  );
};

export default ArtworksInfo;
