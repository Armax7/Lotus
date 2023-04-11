import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../../helpers/page_helpers/CheckoutSession_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/CheckoutSession_helpers/query_fn";

function Purchase({ success, session_id }) {
  const queryClient = ReactQuery.useQueryClient();

  const session = ReactQuery.useQuery(
    [QueryKeys.QK_CHECKOUT_SESSION_BY_ID, session_id],
    async () => await QueryFns.getCheckoutSessionByIdAxios(session_id),
    {
      onSuccess: (data) => {
        localStorage.removeItem("cartItems");
      },
    }
  );

  // const stockMutation = ReactQuery.useMutation({
  //   mutationFn: QueryFns.updateStockOnSuccessfulCheckoutAxios,
  //   onSettled: (data)=> console.log(data),
  //   onError: (error) => {
  //     return (
  //       <Chakra.Alert
  //         status="warning"
  //         display={"flex"}
  //         flexDir={"column"}
  //         alignItems={"center"}
  //         justifyContent={"center"}
  //         maxW={"400px"}
  //         w={"100%"}
  //         minH={"400px"}
  //         h={"100%"}
  //         borderRadius={"1000px"}
  //         m={"auto"}
  //         color={"var(--black)"}
  //       >
  //         <Chakra.AlertIcon m={"0 auto"} transform={"scale(2)"} mb={"10px"} />
  //         <Chakra.AlertTitle m={"0 auto"} lineHeight={"50px"}>
  //           Lo sentimos
  //         </Chakra.AlertTitle>
  //         <Chakra.AlertDescription textAlign={"center"}>
  //           No pudimos completar tu compra; error: {error.message}
  //         </Chakra.AlertDescription>
  //       </Chakra.Alert>
  //     );
  //   },
  // });

  // const sessionId = session?.data?.id;

  // const lineItemsList = ReactQuery.useQuery(
  //   [QueryKeys.QK_LINE_ITEMS_BY_CS_ID, sessionId],
  //   async () => await QueryFns.getCheckoutSessionLineItemsAxios(sessionId),
  //   {
  //     enabled: !!sessionId,
  //     onSuccess: (itemsList) => {
  //       itemsList.forEach((item) => {
  //         stockMutation.mutate({
  //           artworkId: item.price.product,
  //           boughtQuantity: item.quantity,
  //         });
  //       });
  //     },
  //   }
  // );

  return (
    <Chakra.Box
      bg={"var(--color5)"}
      minH={"calc(100vh - 327px)"}
      fontFamily={"Poppins"}
      fontSize={"20px"}
      padding={"40px"}
    >
      {success === "true" ? (
        <Chakra.Alert
          status="success"
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          maxW={"400px"}
          w={"100%"}
          minH={"400px"}
          h={"100%"}
          borderRadius={"1000px"}
          m={"auto"}
          color={"var(--black)"}
        >
          <Chakra.AlertIcon m={"0 auto"} transform={"scale(2)"} mb={"10px"} />
          <Chakra.AlertTitle m={"0 auto"} lineHeight={"50px"}>
            Gracias
          </Chakra.AlertTitle>
          <Chakra.AlertDescription m={"0 auto"}>
            Tu compra fue exitosa
          </Chakra.AlertDescription>
        </Chakra.Alert>
      ) : (
        <Chakra.Alert
          status="warning"
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          maxW={"400px"}
          w={"100%"}
          minH={"400px"}
          h={"100%"}
          borderRadius={"1000px"}
          m={"auto"}
          color={"var(--black)"}
        >
          <Chakra.AlertIcon m={"0 auto"} transform={"scale(2)"} mb={"10px"} />
          <Chakra.AlertTitle m={"0 auto"} lineHeight={"50px"}>
            Lo sentimos
          </Chakra.AlertTitle>
          <Chakra.AlertDescription textAlign={"center"}>
            No pudimos completar tu compra
          </Chakra.AlertDescription>
        </Chakra.Alert>
      )}
    </Chakra.Box>
  );
}

export async function getServerSideProps(context) {
  const queryClient = new ReactQuery.QueryClient();
  const { success = false, session_id } = context.query;

  await queryClient.prefetchQuery([QueryKeys.QK_CHECKOUT_SESSION_BY_ID], () =>
    QueryFns.getCheckoutSessionByIdAxios(session_id)
  );

  return {
    props: {
      dehydratedState: ReactQuery.dehydrate(queryClient),
      success,
      session_id,
    },
  };
}

export default Purchase;
