import * as Chakra from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import style from "./CartCard.module.css";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../../helpers/page_helpers/Home_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/Home_helpers/query_fn";
function CartItem({ product, onDelete }) {
  const queryClient = new ReactQuery.QueryClient();

  const stripeProduct = ReactQuery.useQuery(
    [QueryKeys.QK_ARTWORK_STRIPE_BY_ID, product.id],
    () => QueryFns.getArtworkFromStripeByIdAxios(product.id),
    {
      onError: (error) => console.log(error),
    }
  );

  return (
    <Chakra.Box
      bg="var(--color3)"
      color={"var(--black)"}
      boxShadow="md"
      borderRadius="12px"
      width="100%"
      maxW={"1000px"}
      minW={"min-content"}
      h={"220px"}
      minH={"200px"}
      margin="12px auto"
    >
      <Chakra.Flex
        alignItems="center"
        justifyContent={"space-between"}
        h={"100%"}
      >
        <div className={style.contentContainer}>
          <div className={style.imgWrapper}>
            <Chakra.Image
              src={product.image}
              alt={product.name}
              w={"100%"}
              h={"100%"}
              objectFit="cover"
              marginRight={{ base: 0, md: 4 }}
              borderRadius={"inherit"}
            />
          </div>
          <Chakra.Flex flexDir={"column"}>
            <Chakra.Box width={"100%"} minW={"150px"}>
              <Chakra.Text
                fontSize={{ base: "md", md: "2xl" }}
                fontWeight="bold"
              >
                {product.name}
              </Chakra.Text>
              <Chakra.Text fontSize={{ base: "sm", md: "md" }}>
                Cantidad: {product.quantity}
              </Chakra.Text>
              <Chakra.Text fontSize={{ base: "sm", md: "md" }}>
                Precio: ${product.price}
              </Chakra.Text>
              <hr className={style.hr} />
              <Chakra.Text
                fontSize={{ base: "md", md: "2xl" }}
                fontWeight="bold"
              >
                Total: ${product.quantity * product.price}
              </Chakra.Text>
            </Chakra.Box>
            {stripeProduct.isLoading ? (
              <Chakra.Alert
                status="info"
                mx={"5px"}
                maxW={"200px"}
                minWidth={"100px"}
              >
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Revisando pedido...</Chakra.AlertTitle>
                <Chakra.Spinner size={"md"} />
              </Chakra.Alert>
            ) : stripeProduct.isError ? (
              <Chakra.Alert
                status="error"
                mx={"5px"}
                maxW={"200px"}
                minWidth={"100px"}
              >
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Error: </Chakra.AlertTitle>
                <Chakra.AlertDescription>
                  {stripeProduct.error.message || "Unhandled Error..."}
                </Chakra.AlertDescription>
                <Chakra.Spinner size={"md"} />
              </Chakra.Alert>
            ) : product.limit <= 0 || !stripeProduct.data.active ? (
              <Chakra.Alert
                status="error"
                maxW={"200px"}
                minWidth={"100px"}
                mx={"5px"}
              >
                <Chakra.Flex>
                  <Chakra.AlertIcon />
                  <Chakra.AlertTitle lineHeight={"14px"}>
                    Revisando pedido...
                  </Chakra.AlertTitle>
                  <Chakra.Spinner size={"md"} />
                </Chakra.Flex>
              </Chakra.Alert>
            ) : stripeProduct.isError ? (
              <Chakra.Alert
                status="error"
                maxW={"calc(100% - 10px)"}
                borderRadius={"100px"}
                fontSize={"14px"}
              >
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Error: </Chakra.AlertTitle>
                <Chakra.AlertDescription>
                  {stripeProduct.error.message}
                </Chakra.AlertDescription>
                <Chakra.Spinner size={"md"} />
              </Chakra.Alert>
            ) : product.limit <= 0 || !stripeProduct.data.active ? (
              <Chakra.Alert
                status="error"
                margin="50px 0 15px 0"
                flexFlow={"column wrap"}
                justifyContent={"flex-start"}
                maxW={"calc(100% - 10px)"}
                borderRadius={"100px"}
                fontSize={"14px"}
                mx={"5px"}
              >
                <Chakra.Flex>
                  <Chakra.AlertIcon />
                  <Chakra.AlertTitle>Lo sentimos...</Chakra.AlertTitle>
                </Chakra.Flex>
                <Chakra.AlertDescription textAlign={"center"}>
                  Estas obra ya no está disponible
                </Chakra.AlertDescription>
              </Chakra.Alert>
            ) : (
              <Chakra.Alert
                status="success"
                maxW={"calc(100% - 10px)"}
                borderRadius={"100px"}
                fontSize={"14px"}
              >
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Disponible</Chakra.AlertTitle>
              </Chakra.Alert>
            )}
          </Chakra.Flex>
        </div>
        <Chakra.Button
          bg={"var(--color2)"}
          color={"var(--black)"}
          height={"100%"}
          borderRadius={"0 12px 12px 0"}
          onClick={() => onDelete(product.name)}
          _hover={{ background: "var(--color1)", color: "var(--color5)" }}
        >
          <DeleteIcon boxSize={5} color={"var(--color5)"} />
        </Chakra.Button>
      </Chakra.Flex>
    </Chakra.Box>
  );
}

export default CartItem;
