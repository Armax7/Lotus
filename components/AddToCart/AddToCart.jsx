import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

function AddToCart({ stock, ...props }) {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    if (value < stock) {
      const newValue = value + 1;
      setValue(newValue);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
    }
  };

  return (
    <>
      <Flex margin="50px 0 15px 0">
        <Button size="sm" onClick={handleDecrement} disabled={value <= 1}>
          -
        </Button>
        <Text mx={2} fontSize="md">
          {value}
        </Text>
        <Button size="sm" onClick={handleIncrement}>
          +
        </Button>
      </Flex>
      <Button
        backgroundColor="black"
        color="white"
        size="md"
        css={{
          "&:hover": {
            transition: "all 0.5s ease-in-out",
            color: "black",
          },
        }}
      >
        Agregar al carrito
      </Button>
    </>
  );
}

export default AddToCart;
