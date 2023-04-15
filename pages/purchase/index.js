import * as Chakra from "@chakra-ui/react";
import * as ReactQuery from "@tanstack/react-query";
import * as QueryKeys from "../../helpers/page_helpers/CheckoutSession_helpers/query_keys";
import * as QueryFns from "../../helpers/page_helpers/CheckoutSession_helpers/query_fn";
import { useState, useEffect } from "react";
import axios from "axios";

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

  let allCards = cart
    ?.map(
      (e) => `
      <div
        style={{
          margin: "auto",
          display: "flex",
          width: "100%",
          minWidth: "300px",
          maxWidth: "max-content",
          background: "#eddbc7",
          borderRadius: "12px",
          color: "#804674",
          fontFamily: "Poppins",
        }}
      >
        <div
          style={{
            width: "100%",
            minWidth: "120px",
            maxWidth: "180px",
            borderRadius: "12px 0 0 12px",
          }}
        >
          <img
            src=${e.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px 0 0 12px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            width: "100%",
            minWidth: "180px",
            maxWidth: "max-content",
            padding: "12px",
            borderRadius: "12px 0 0 12px",
          }}
        >
          <div style={{ margin: "8px 0" }}>
            <p style={{ lineHeight: "18px" }}>Nombre: </p>
            <h1
              style={{
                lineHeight: "28px",
                fontSize: "26px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              ${e.name}
            </h1>
          </div>
          <div style={{ margin: "8px 0" }}>
            <p style={{ lineHeight: "10px" }}>Precio: </p>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              ${e.price}
            </h3>
          </div>
          <div style={{ margin: "8px 0" }}>
            <p style={{ lineHeight: "10px" }}>Cantidad: </p>
            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
              ${e.quantity}
            </h3>
          </div>
        </div>
      </div>
  `
    )
    .join("");

  let htmlToSend = `
    <div
      style={{
        padding: "12px",
        width: "100%",
        background:"#f9f5e7"
      }}
    >
      <h1 style={{fontSize:"26px", color:"#804674", fontFamily:"Poppins", fontWeight:"bold"}}>Felicidades por la compra de:</h1>
      ${allCards}
    </div>`;

  function sendmail() {
    axios
      .post("/api/nodemailer", {
        to: session.data?.customer_details.email,
        subject: `Lotus - Hi ${session.data?.customer_details.name} Thanks for your purchase`,
        text: "Lotus - Thanks for your purchase",
        html: htmlToSend,
      })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  }

  session.data?.payment_status === "paid" && sendmail();

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
