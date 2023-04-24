import * as Chakra from "@chakra-ui/react";
import * as Components from "../../components";
import style from "./CartContainer.module.css";

function CardContainer({
  cards,
  showAvailableOnly = true,
  baseHref: baseHrefProp,
  columns: columnsProp = 3,
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
            return (
              <Components.Card
                key={artwork.id}
                artwork={artwork}
                baseHref={baseHrefProp}
              />
            );
          }
        })}
      <Components.ToTopButton />
    </div>
  );
}

export default CardContainer;
