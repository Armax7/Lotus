import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../../helpers/page_helpers/CheckoutSession_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/CheckoutSession_helpers/query_fn";
import { useState, useEffect } from "react";
import { sendEmail } from "../../helpers/email_sendEmail";
import {
  boughtTemplate,
  boughtTemplateToSend,
} from "../../helpers/email_templates";

function Purchase({ success, session_id }) {
  const queryClient = ReactQuery.useQueryClient();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCart(cartItems);
  }, []);

  const session = ReactQuery.useQuery(
    [QueryKeys.QK_CHECKOUT_SESSION_BY_ID, session_id],
    async () => await QueryFns.getCheckoutSessionByIdAxios(session_id),
    {
      onSuccess: (data) => {
        localStorage.removeItem("cartItems");
      },
    }
  );

  let allCards = cart?.map((e) => boughtTemplate(e)).join("");

  let htmlToSend = boughtTemplateToSend(allCards);

  let emailData = {
    email: session.data?.customer_details.email,
    subject: `Lotus - Hola ${session.data?.customer_details.name} Gracias por tu compra!`,
    text: "Lotus - Gracias por tu compra!",
    html: htmlToSend,
  };

  session.data?.payment_status === "paid" && cart?.length
    ? sendEmail(emailData)
    : null;

  return (
    <Chakra.Box
      bg={"var(--color5)"}
      minH={"calc(100vh - 120px)"}
      fontFamily={"Poppins"}
      fontSize={"20px"}
      padding={"12px"}
      display={"flex"}
      alignItems={"center"}
    >
      {success === "true" ? (
        <Chakra.Alert
          status="success"
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          w={"100%"}
          maxW={"400px"}
          minW={"300px"}
          h={"100vw"}
          minH={"300px"}
          maxH={"400px"}
          borderRadius={"1000px"}
          m={"auto"}
          color={"var(--black)"}
        >
          <Chakra.AlertIcon m={"0 auto"} transform={"scale(2)"} mb={"10px"} />
          <Chakra.AlertTitle m={"0 auto"} lineHeight={"50px"}>
            Gracias {session.data?.customer_details.name}
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
          justifyContent={"center"}
          w={"100%"}
          maxW={"400px"}
          minW={"300px"}
          h={"100vw"}
          minH={"300px"}
          maxH={"400px"}
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
