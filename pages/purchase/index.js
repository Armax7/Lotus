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
        style="
          margin: 12px auto;
          display: flex;
          width: 100%;
          min-width: 300px;
          max-width: 600px;
          background: #eddbc7;
          border-radius: 12px;
          color: #804674;
          font-family: Poppins, Google sans;
        "
      >
        <div class="imgWrapper">
          <img
            src=${e.image}
            style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              min-width: 120px;
              max-width: 180px;
              border-radius: 12px 0 0 12px;
            "
          />
        </div>
        <div
          class="textContainer"
          style="
            width: 100%;
            min-width: 180px;
            max-width: max-content;
            padding: 12px;
            border-radius: 12px 0 0 12px;
          "
        >
          <div style="display: block; margin: 16px 0">
            <p style="line-height: 18px">Nombre:</p>
            <h1
              style="
                line-height: 28px;
                font-size: 26px;
                font-weight: bold;
                margin-bottom: 8px;
              "
            >
              ${e.name}
            </h1>
          </div>
          <div style="display: block; margin: 16px 0">
            <p style="line-height: 10px">Precio:</p>
            <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 8px">
              ${e.price}
            </h3>
          </div>
          <div style="display: block; margin: 16px 0">
            <p style="line-height: 10px">Cantidad:</p>
            <h3 style="font-size: 16px; font-weight: bold">${e.quantity}</h3>
          </div>
        </div>
      </div>
  `
    )
    .join("");

  let htmlToSend = `<!DOCTYPE html>
  <html>
    <head>
      <title></title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
  
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body,
        div,
        h1,
        h3,
        p {
          font-family: "Poppins", "Google sans";
          color: #804674;
        }
      </style>
    </head>
  
    <body>
      <div
        style="
          width: 100%;
          padding: 12px;
          background: #f9f5e7;
          font-family: Google sans;
        "
      >
        <h1
          style="
            display: block;
            font-size: 26px;
            font-weight: 400;
            text-align: center;
          "
        >
          Felicidades por la compra de:
        </h1>
        ${allCards}
        <div style="width: 100%; text-align: center">
          <a
            href="https://lotus-git-development-armax7.vercel.app/"
            target="_blank"
          >
            <button
              style="
                background-color: #804674;
                color: #eddbc7;
                font-family: Poppins, Google sans;
                font-weight: 500;
                border-radius: 100px;
                border: none;
                padding: 12px 24px;
                transition: transform 0.2s;
              "
              onmouseover="this.style.background='#1f1f1f'; this.style.transform='translateY(-4px)'"
              onmouseout="this.style.background='#804674'; this.style.transform='translateY(4px)'"
            >
              Volver a Lotus
            </button>
          </a>
        </div>
      </div>
    </body>
  </html>`;

  function sendmail() {
    axios
      .post("/api/nodemailer", {
        to: session.data?.customer_details.email,
        subject: `Lotus - Hola ${session.data?.customer_details.name} Gracias por tu compra!`,
        text: "Lotus - Gracias por tu compra!",
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
