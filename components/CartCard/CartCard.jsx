import { Box, Button, Flex, Spacer, Image, Text } from "@chakra-ui/react";


function CartItem({ product, onDelete}) {
  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="md"
      width="60%"
      margin="0 auto"
      marginTop={4}
      padding={4}
    >
      <Flex flexDirection={{ base: "column", md: "row" }} alignItems="center">
         <Image src={product.image} alt={product.name} height={{ base: "100px", md: "150px" }} objectFit="contain" marginRight={{ base: 0, md: 4 }} /> 
        <Box>
          <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="bold">{product.name}</Text>
          <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>Qty: {product.quantity}</Text>
          <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>${product.price}</Text>
        </Box>
        <Spacer />
        <Button variant="ghost" size="sm" onClick={() => onDelete(product.name)}>Remove</Button>
      </Flex>
      <Box textAlign="right" marginTop={4}>
        <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="bold">Total: ${product.quantity * product.price}</Text>
      </Box>
    </Box>
  );
}



export default CartItem;
