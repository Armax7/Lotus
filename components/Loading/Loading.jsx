import * as Chakra from "@chakra-ui/react";
import { Spinner, Flex } from "@chakra-ui/react";




const Loading = () => {
    
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  };

  
export default Loading;