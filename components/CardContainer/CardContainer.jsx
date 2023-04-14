import * as Chakra from "@chakra-ui/react";
import * as Components from "../../components";
import style from "./CartContainer.module.css";

function CardContainer({ cards, columns: columnsProp = 3, ...props }) {
  return (
      <div className={style.container}>
        {cards &&
          cards.map((artwork) => (
            <Components.Card key={artwork.id} artwork={artwork} />
          ))}
          <Components.ToTopButton />
      </div>
  );
}

export default CardContainer;
