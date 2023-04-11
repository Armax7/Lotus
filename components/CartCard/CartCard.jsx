import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import style from "./CartCard.module.css";
function CartItem({ product, onDelete }) {
  return (
    <Box
      bg="var(--color3)"
      color={"var(--black)"}
      boxShadow="md"
      borderRadius="12px"
      width="100%"
      maxW={"1000px"}
      minW={"min-content"}
      h={"200px"}
      margin="12px auto"
    >
      <Flex alignItems="center" justifyContent={"space-between"} h={"100%"}>
        <div className={style.contentContainer}>
          <div className={style.imgWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              w={"100%"}
              h={"100%"}
              objectFit="cover"
              marginRight={{ base: 0, md: 4 }}
              borderRadius={"inherit"}
            />
          </div>
          <Box width={"100%"}>
            <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="bold">
              {product.name}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Cantidad: {product.quantity}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Precio: ${product.price}
            </Text>
            <hr className={style.hr} />
            <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="bold">
              Total: ${product.quantity * product.price}
            </Text>
          </Box>
        </div>
        <Button
          bg={"#ae6b79"}
          color={"var(--black)"}
          height={"100%"}
          borderRadius={"0 12px 12px 0"}
          onClick={() => onDelete(product.name)}
          _hover={{ background: "var(--color1)", color: "var(--color5)" }}
        >
          <DeleteIcon boxSize={5} color={"var(--color5)"} />
        </Button>
      </Flex>
    </Box>
  );
}

export default CartItem;
