import { Box, Heading, Badge, Text } from "@chakra-ui/react";
import RatingStars from "../RatingStars/RatingStars";

const ArtworksInfo = ({ rate, artwork, ...props }) => {
  return (
    <Box width="70%" flex="1" overflow="hidden" minHeight="200px">
      <Heading as="h1" size="xl" fontWeight="bold" color="#000" fontSize="40px">
        {artwork.name}
      </Heading>
      <Heading as="h3" fontSize="20px" color="gray.500" marginTop="5px">
        By: {artwork.author}
      </Heading>
      <Badge
        colorScheme="green"
        variant="solid"
        fontSize="25px"
        marginTop="25px"
      >
        $ {artwork.price}
      </Badge>

      <Text fontSize="lg" color="" marginTop="25px">
        {artwork.description}
      </Text>

      { artwork.stock > 1 ?
           <Text fontSize="lg" color="gray.700" marginTop="25px">
          Todavia quedan <b>{artwork.stock}</b> unidades
        </Text>
       : (
        <Text fontSize="lg" color="gray.700" marginTop="25px">
          Todavia queda <b>{artwork.stock}</b> unidad
        </Text>
      )}

      <RatingStars ratingDb={artwork.rating} rate={rate} />
    </Box>
  );
};

export default ArtworksInfo;
