import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function CartEmpty({ empty, ...props }) {
  return (
    <Alert
      backgroundColor="#f9f5e7"
      status="warning"
      justifyContent="center"
      flexDirection="column"
      h={"100vh"}
      minH={"400px"}
      maxH="calc(100vh - 235px)"
      fontFamily={"Poppins"}
    >
      <AlertIcon boxSize={"60px"} mr={0} />
      <AlertTitle lineHeight={"60px"} fontSize="4xl" textAlign="center">
        No hay productos en tu carrito
      </AlertTitle>
      <AlertDescription
        fontSize="xl"
        textAlign="center"
        color={"var(--color1)"}
      >
        Agrega productos a tu carrito para poder realizar la compra.
      </AlertDescription>
    </Alert>
  );
}

export default CartEmpty;
