import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function AddToCart({ stock, name, price, image, price_id, ...props }) {
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
      name,
      image,
      quantity: value,
      price,
      price_id,
      limit: stock,
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
    <Flex margin="50px 0 15px 0">
      <Button
        size="sm"
        onClick={handleDecrement}
        disabled={value <= 1}
      >
        -
      </Button>
      <Text mx={2} fontSize="md">
        {value}
      </Text>
      <Button
        size="sm"
        onClick={handleIncrement}
        disabled={value >= stock}
      >
        +
      </Button>
    </Flex>
    {isMaxQuantity ? (
      <Alert status="error" marginBottom="10px">
        <AlertIcon />
        <AlertTitle mr={2}>UPS!:</AlertTitle>
        <AlertDescription>
          Cantidad máxima alcanzada
        </AlertDescription>
      </Alert>
    ) : (
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
        onClick={handleAddToCart}
        disabled={isMaxQuantity}
      >
        Agregar al carrito
      </Button>
    )}
    {isAddedToCart && (
      <Alert status="success" marginTop="10px">
        <AlertIcon />
        <AlertTitle mr={2}>Éxito:</AlertTitle>
        <AlertDescription>
          Agregado al carrito
        </AlertDescription>
      </Alert>
    )}
  </>
);
}

export default AddToCart;
