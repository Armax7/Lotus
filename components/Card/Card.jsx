import * as Chakra from "@chakra-ui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import style from "./Card.module.css";
import { largeTextHandler } from "../../helpers/utils";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import * as SupaHelpers from "../../helpers/supabase_helpers/user_management";
import { getUserId } from "../../helpers/supabase_helpers/user_management";
import { updateFavorite } from "../../helpers/page_helpers/Home_helpers/query_fn";

function Card({
  artwork,
  baseHref = "/details",
  spacing: spacingProp = 4,
  className: classNameProp = null,
  ...props
}) {
  const {
    id,
    name,
    image,
    size,
    price,
    rating,
    stock,
    available,
    technique_id,
    category_id,
    support_id,
    author_id,
    price_id,
  } = artwork;

  const [value, setValue] = useState(1);
  const [isMaxQuantity, setIsMaxQuantity] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [click, setClick] = useState(false);

  const guardarProductoEnFavoritos = async () => {
    const userId = await getUserId();
    const FavoriteItems =
      JSON.parse(localStorage.getItem("favoriteItems")) || [];

    const index = FavoriteItems.findIndex((item) => item.name === name);

    const newFavoriteItem = {
      userId: userId,
      id,
      name,
      image,
      quantity: value,
      price,
      price_id,
      stock,
    };

    if (!click) {
      Swal.fire({
        text: "Añadido a favoritos",
        icon: "success",
        confirmButtonText: "OK",
      });
      setClick(true);
    } else {
      /*  Swal.fire({
        text: "Eliminado de favoritos",
        icon: "warning",
        confirmButtonText: "OK",
      }); */
      setIsAddedToCart(false);
      setClick(false);
    }

    if (index !== -1) {
      const updatedFavoriteItems = [...FavoriteItems];
      const existingFavoriteItem = updatedFavoriteItems[index];
      if (existingFavoriteItem.quantity + value > stock) {
        setIsMaxQuantity(true);
      } else {
        existingFavoriteItem.quantity += value;
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(updatedFavoriteItems)
        );
        if (userId) {
          updateFavorite(userId, updatedFavoriteItems);
        }
        setIsMaxQuantity(false);
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
      }
    } else {
      const newFavoritesItems = [...FavoriteItems, newFavoriteItem];
      localStorage.setItem("favoriteItems", JSON.stringify(newFavoritesItems));
      if (userId) {
        updateFavorite(userId, newFavoritesItems);
      }
      setIsMaxQuantity(false);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };

  //const userId = await getUserId();
  //const CartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const handleLinkClick = async () => {
    const data = await SupaHelpers.loggedStatus();
    if (data === true) {
      guardarProductoEnFavoritos();
    } else {
      Swal.fire({
        text: "Necesitas iniciar sesión para agregar Obras a favoritos",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Chakra.VStack
      className={`${classNameProp} ${style.cardContainer}`}
      spacing={spacingProp}
      {...props}
    >
      <Chakra.WrapItem>
        <Chakra.Stack spacing="3">
          <Chakra.Card
            bgColor={"var(--colo5)"}
            boxShadow={"none"}
            maxW="280px"
            minW="280px"
            // minH={"max-content"}
          >
            <Chakra.CardBody className={style.card}>
              <Link href={`${baseHref}/${id}`}>
                <img src={image} alt={name} className={style.img} />
              </Link>
              <div>
                <Chakra.Heading
                  size="md"
                  fontFamily={"Poppins"}
                  color={"var(--black)"}
                >
                  {largeTextHandler(20, name)}
                </Chakra.Heading>
                <Chakra.Text color="var(--black)" fontSize="2xl">
                  {`$${price}`}
                  <span className={style.coin}>USD</span>
                </Chakra.Text>
                <Chakra.Flex justifyContent="end" rounded="md" px={1}>
                  {click ? (
                    <Chakra.Icon
                      /*  as={click ? MdFavorite : MdFavoriteBorder} */
                      as={MdFavorite}
                      color="#80467491"
                      cursor="pointer"
                      boxSize={27}
                      onClick={handleLinkClick}
                    />
                  ) : (
                    <Chakra.Icon
                      /*  as={click ? MdFavorite : MdFavoriteBorder} */
                      as={MdFavoriteBorder}
                      color="#80467491"
                      cursor="pointer"
                      boxSize={27}
                      onClick={handleLinkClick}
                    />
                  )}
                </Chakra.Flex>
              </div>
            </Chakra.CardBody>
          </Chakra.Card>
        </Chakra.Stack>
      </Chakra.WrapItem>
    </Chakra.VStack>
  );
}

export default Card;
