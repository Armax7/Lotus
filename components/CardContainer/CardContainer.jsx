import * as Chakra from "@chakra-ui/react";
import * as Components from "../../components";

function CardContainer({ cards, columns: columnsProp = 3, ...props }) {
  return (
    <Chakra.SimpleGrid columns={columnsProp} {...props}>
      {cards.length !== 0 ? (
        cards.map((artwork) => {
          return <Components.Card key={artwork.id} artwork={artwork} />;
        })
      ) : (
        <Components.Loading />
      )}
    </Chakra.SimpleGrid>
  );
}

export default CardContainer;
