import * as Chakra from "@chakra-ui/react";
import * as Components from "../../components";
import style from "./CartContainer.module.css";

function CardContainer({
  cards,
  columns: columnsProp = 3,
  showAvailableOnly = true,
  ...props
}) {
  return (
    <div className={style.container}>
      {cards &&
        cards.map((artwork) => {
          if (showAvailableOnly) {
            return artwork.available ? (
              <Components.Card key={artwork.id} artwork={artwork} />
            ) : null;
          } else {
            return <Components.Card key={artwork.id} artwork={artwork} />;
          }
        })}
      <Components.ToTopButton />
    </div>
  );
}

export default CardContainer;
