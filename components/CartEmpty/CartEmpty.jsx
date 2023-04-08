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
      height="80vh"
    >
      <AlertIcon boxSize="80px" mr={0} />
      <AlertTitle mt={4} mb={10} fontSize="4xl" textAlign="center">
        No hay productos en tu carrito
      </AlertTitle>
      <AlertDescription fontSize="xl" textAlign="center">
        Agrega productos a tu carrito para poder realizar la compra.
      </AlertDescription>
    </Alert>
  );
}

export default CartEmpty;
