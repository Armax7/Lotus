import * as Chakra from "@chakra-ui/react";
import Link from "next/link";
import style from "./Card.module.css";
import { largeTextHandler } from "../../helpers/utils";
function Card({
  artwork,
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

  return (
    <Chakra.VStack
      className={`${classNameProp} ${style.cardContainer}`}
      spacing={spacingProp}
      {...props}
    >
      <Link href={`/details/${id}`} >
        <Chakra.WrapItem >
          <Chakra.Stack mt="6" spacing="3" >
            <Chakra.Card bgColor={"var(--colo5)"} boxShadow={"none"} maxW="300px" minH={"400px"}>
              <Chakra.CardBody className={style.card}>
                <img src={image} alt={name} className={style.img}/>
                <div>
                  <Chakra.Text color="var(--color1)" fontSize="2xl">
                    {`${price}$`}
                  </Chakra.Text>

                  <Chakra.Heading
                    size="md"
                    fontFamily={"Poppins"}
                    color={"var(--color1)"}
                  >
                    {largeTextHandler(20, name)}
                  </Chakra.Heading>
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
