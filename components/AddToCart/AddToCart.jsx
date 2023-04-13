import * as Chakra from "@chakra-ui/react";
import { useState } from "react";

function AddToCart({ id, stock, name, price, image, price_id, ...props }) {
  const [value, setValue] = useState(1);
  const [isMaxQuantity, setIsMaxQuantity] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleIncrement = () => {
    if (value < stock) {
      const newValue = value + 1;
      setValue(newValue);
      setIsMaxQuantity(false); // reset max quantity alert when incrementing
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      setIsMaxQuantity(false); // reset max quantity alert when decrementing
    }
  };

  function handleAddToCart() {
    const CartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const index = CartItems.findIndex((item) => item.name === name);

    const newCartItem = {
      id,
      name,
      image,
      quantity: value,
      price,
      price_id,
      stock,
    };

    if (index !== -1) {
      const updatedCartItems = [...CartItems];
      const existingCartItem = updatedCartItems[index];
      if (existingCartItem.quantity + value > stock) {
        setIsMaxQuantity(true);
      } else {
        existingCartItem.quantity += value;
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        setIsMaxQuantity(false);
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
      }
    } else {
      const newCartsItems = [...CartItems, newCartItem];
      localStorage.setItem("cartItems", JSON.stringify(newCartsItems));
      setIsMaxQuantity(false);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  }

  return (
    <>
      {stock <= 0 ? (
        <Chakra.Alert
          status="warning"
          margin="50px 0 15px 0"
          flexFlow={"column wrap"}
          justifyContent={"flex-start"}
          w={"30%"}
          minWidth={"210px"}
        >
          <Chakra.Flex>
            <Chakra.AlertIcon />
            <Chakra.AlertTitle>Lo sentimos...</Chakra.AlertTitle>
          </Chakra.Flex>
          <Chakra.AlertDescription textAlign={"center"}>
            No quedan más unidades de esta obra.
          </Chakra.AlertDescription>
        </Chakra.Alert>
      ) : (
        <>
          <Chakra.Flex
            mb={"18px"}
            w={"100%"}
            minW={"296px"}
            justifyContent={"space-between"}
          >
            <Chakra.Flex alignItems={"center"}>
              <Chakra.Button
                // size="sm"
                onClick={handleDecrement}
                disabled={value <= 1}
                bg={"var(--black)"}
                color={"var(--color5)"}
                _hover={{
                  background: "var(--color1)",
                  transform: "translateY(-4px)",
                }}
                borderRadius={"12px"}
              >
                -
              </Chakra.Button>
              <Chakra.Text mx={3} fontSize="26px" color={"var(--color1)"}>
                {value}
              </Chakra.Text>
              <Chakra.Button
                // size="sm"
                onClick={handleIncrement}
                disabled={value >= stock}
                bg={"var(--black)"}
                color={"var(--color5)"}
                _hover={{
                  background: "var(--color1)",
                  transform: "translateY(-4px)",
                }}
                borderRadius={"12px"}
              >
                +
              </Chakra.Button>
            </Chakra.Flex>

            <Chakra.Button
              backgroundColor="var(--black)"
              color="var(--color5)"
              _hover={{
                background: "var(--color1)",
                transform: "translateY(-4px)",
              }}
              borderRadius={"12px"}
              onClick={handleAddToCart}
              disabled={isMaxQuantity}
            >
              Agregar al carrito
            </Chakra.Button>
          </Chakra.Flex>
          {isMaxQuantity && (
            <Chakra.Alert borderRadius={"12px"} status="error">
              <Chakra.AlertIcon />
              <Chakra.AlertDescription fontSize={"16px"}>
                Cantidad máxima alcanzada
              </Chakra.AlertDescription>
            </Chakra.Alert>
          )}
          {isAddedToCart && (
            <Chakra.Alert status="success" borderRadius={"12px"}>
              <Chakra.AlertIcon />
              <Chakra.AlertDescription fontSize={"16px"}>
                Agregado al carrito
              </Chakra.AlertDescription>
            </Chakra.Alert>
          )}
        </>
      )}
    </>
  );
}

export default AddToCart;
