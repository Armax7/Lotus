import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const Alert = ({ status, title, description }) => (
  <ChakraAlert status={status} borderRadius="md" width="fit-content">
    <AlertIcon />
    <AlertTitle mr={2}>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </ChakraAlert>
);

export default Alert;
