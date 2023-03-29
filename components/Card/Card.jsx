// import { WrapItem,CardBody,Card, Heading,Text, Stack, Divider, CardFooter, Button, ButtonGroup, SimpleGrid, VStack, Wrap} from "@chakra-ui/react";

import * as Chakra from "@chakra-ui/react";

function Cards({ artwork, ...props }) {
  const { name, price, image } = artwork;

  return (
    <div>
      hola que tal esto es una targeta con {name} {price}{" "}
    </div>
  );
}

export default Cards;

/*  <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody> */
