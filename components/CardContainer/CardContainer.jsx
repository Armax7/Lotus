import * as Chakra from "@chakra-ui/react";
import * as Components from "../../components";

function CardContainer({ cards, columns: columnsProp = 3, ...props }) {
  return (
    <Chakra.SimpleGrid columns={columnsProp}  gridColumnGap={"40px"} gridRowGap={"20px"}  margin={"0 auto"} {...props}>
      {cards &&
        cards.map((artwork) => (
          <Components.Card key={artwork.id} artwork={artwork} />
        ))}
    </Chakra.SimpleGrid>
  );
}

export default CardContainer;
