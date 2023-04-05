import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const RatingStars = ({ ratingDb }) => {
  // Crea un array de 5 elementos para renderizar 5 estrellas
  const stars = Array.from({ length: 5 });

  return (
    <Flex marginTop="50px">
      {stars.map((_, index) => {
        // Calcula la posición de la estrella actual en la calificación
        const position = index + 1;
        // Determina si la estrella debe estar llena o vacía
        const filled = position <= ratingDb;

        return (
          <Icon
            
            key={index}
            fontSize="10px"
            as={StarIcon}
            color={filled ? "orange" : "gray.300"}
            width="30px"
            height="35px"
          />
        );
      })}
      <Box ml={2}>
        <Text fontWeight="bold">{ratingDb}</Text>
      </Box>
    </Flex>
  );
};
export default RatingStars;
