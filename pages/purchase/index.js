import * as Chakra from "@chakra-ui/react";

function Purchase({ success }) {
  return (
    <Chakra.Box>
      {success === "true" ? (
        <Chakra.Alert status="success">
          <Chakra.AlertIcon />
          <Chakra.AlertTitle>Thank you</Chakra.AlertTitle>
          <Chakra.AlertDescription>
            You purchase successful
          </Chakra.AlertDescription>
        </Chakra.Alert>
      ) : (
        <Chakra.Alert status="warning">
          <Chakra.AlertIcon />
          <Chakra.AlertTitle>We are sorry</Chakra.AlertTitle>
          <Chakra.AlertDescription>
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
