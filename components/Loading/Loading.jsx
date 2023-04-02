import * as Chakra from "@chakra-ui/react";
import { Spinner} from "@chakra-ui/react";




const Loading = () => {
    
    return (
      <Chakra.Stack direction='row' spacing={4}>
      <Spinner size='xs' />
      <Spinner size='sm' />
      <Spinner size='md' />
      <Spinner size='lg' />
      <Spinner size='xl' />
    </Chakra.Stack>
    );
  };

  
export default Loading;