import * as Chakra from "@chakra-ui/react";

function Purchase({ success }) {
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
          <Chakra.AlertIcon m={"0 auto"} transform={"scale(2)"} mb={"10px"}/>
          <Chakra.AlertTitle  m={"0 auto"} lineHeight={"50px"}>We are sorry</Chakra.AlertTitle>
          <Chakra.AlertDescription textAlign={"center"}>
            We could not complete your purchase
          </Chakra.AlertDescription>
        </Chakra.Alert>
      )}
    </Chakra.Box>
  );
}

export async function getServerSideProps(context) {
  const { success = false } = context.query;

  return { props: { success } };
}

export default Purchase;
