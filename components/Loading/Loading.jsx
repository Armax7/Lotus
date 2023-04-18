import * as Chakra from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Chakra.Box w={"50%"} m={"auto"}>
      <Chakra.Image src={"/lotusImagotipo.svg"} />
      <Chakra.Flex alignItems={"center"} justifyContent={"center"}>
        <Chakra.Box fontSize={"5xl"}>Loading...</Chakra.Box>
        <Chakra.Spinner size={"xl"} />
      </Chakra.Flex>
    </Chakra.Box>
  );
};

export default Loading;
