import * as Chakra from "@chakra-ui/react";
import Link from "next/link";
import style from "./Card.module.css";
import { largeTextHandler } from "../../helpers/utils";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";


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
  } = artwork;

  const handleLinkClick = () => {
    alert("por favor loguerse")
  };

  return (
    <Chakra.VStack
      className={`${classNameProp} ${style.cardContainer}`}
      spacing={spacingProp}
      {...props}
    >
      <Link href={`${baseHref}/${id}`}>
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
                <img src={image} alt={name} className={style.img} />
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
                    <Chakra.Icon
                      as={MdFavoriteBorder}
                      color="#FB8500"
                      cursor="pointer"
                      boxSize={23}
                      onClick={handleLinkClick}
                    />
                  </Chakra.Flex>
                </div>
              </Chakra.CardBody>
            </Chakra.Card>
          </Chakra.Stack>
        </Chakra.WrapItem>
      </Link>
    </Chakra.VStack>
  );
}

export default Card;
