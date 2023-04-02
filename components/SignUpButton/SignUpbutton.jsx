import * as Chakra from "@chakra-ui/react";
import { userOAuth } from "../../helpers/supabase_helpers/user_management";

function SignUpButton() {
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

  // const googleHandle = (google) => {
  //   userOAuth({provider: google});
  // };
  return (
    <>
      <Chakra.Button onClick={onOpen}>Btoncito</Chakra.Button>

      <Chakra.Modal isOpen={isOpen} onClose={onClose}>
        <Chakra.ModalOverlay />
        <Chakra.ModalContent>
          <Chakra.ModalHeader>Crear cuenta</Chakra.ModalHeader>
          <Chakra.ModalCloseButton />
          <Chakra.ModalBody></Chakra.ModalBody>

          <Chakra.ModalFooter>
            <Chakra.Button
              colorScheme="blue"
              mr={3}
              
            >
              Continuar con Google
            </Chakra.Button>
            <Chakra.Button>Continuar con Facebook</Chakra.Button>
          </Chakra.ModalFooter>
        </Chakra.ModalContent>
      </Chakra.Modal>
    </>
  );
}

export default SignUpButton;
