import * as Chakra from "@chakra-ui/react";
import Link from "next/link";
import style from "./Card.module.css";
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
    <Chakra.VStack className={classNameProp} spacing={spacingProp} {...props}>
      <Link href={`/details/${id}`}>
        <Chakra.WrapItem>
          <Chakra.Stack mt="6" spacing="3">
            <Chakra.Card className={style.card} maxW="sm">
              <Chakra.CardBody>
                <img src={image} alt={name} width={300} height={300} />

                <Chakra.Text color="blue.600" fontSize="2xl">
                   {`$${price}`}
                </Chakra.Text>

                <Chakra.Heading size="md">{name}</Chakra.Heading>
              </Chakra.CardBody>
            </Chakra.Card>
          </Chakra.Stack>
        </Chakra.WrapItem>
      </Link>
    </Chakra.VStack>
  );
}

export default Card;
