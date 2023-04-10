import React from "react";
import * as Components from "..";
import * as Chakra from "@chakra-ui/react";

function Register() {
  const OverlayOne = () => <Chakra.ModalOverlay />;

  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const SignIn = Chakra.useDisclosure();
  const singUp = Chakra.useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Chakra.Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Ir a pagar
      </Chakra.Button>

      <Chakra.Modal
        size="lg"
        maxW="md"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        {overlay}
        <Chakra.ModalContent bg="#F9F5E7">
          <Chakra.Alert>
            <Chakra.AlertIcon boxSize="40px" mr={10} color="var(--color1)" />
            <Chakra.AlertTitle mt={4} mb={1} fontSize="lg">
              Debes iniciar sesión o crear una cuenta para continuar con el pago
              .
            </Chakra.AlertTitle>
          </Chakra.Alert>
          <Chakra.ModalCloseButton />
          <Chakra.ModalBody></Chakra.ModalBody>
          <Chakra.Button
            mr={30}
            ml={30}
            _hover={{
              bgColor: "blue.800",
              transform: "translateY(-4px)",
            }}
            background="var(--color1)"
            color="white"
            onClick={SignIn.onOpen}
          >
            iniciar sesion
          </Chakra.Button>
          <Chakra.Drawer
            isOpen={SignIn.isOpen}
            placement="right"
            onClose={SignIn.onClose}
            finalFocusRef={btnRef}
            size="xl"
          >
            <Chakra.DrawerOverlay />
            <Chakra.DrawerContent
              bgColor="var(--color1-1)"
              backgroundPosition="bottom"
              bgRepeat="no-repeat"
              bgSize="contain"
            >
              <Chakra.DrawerCloseButton
                backgroundColor="var(--color1)"
                color="var(--color3)"
                justifyItems="center"
                _hover={{
                  background: "var(--color3)",
                  color: "var(--color1)",
                }}
              />

              <Chakra.DrawerBody
                display="flex"
                alignItems="center"
                bgRepeat="no-repeat"
                bgPosition="center bottom 80px"
                bgSize="26%"
              >
                <Components.SignIn />
              </Chakra.DrawerBody>
            </Chakra.DrawerContent>
          </Chakra.Drawer>

          <Chakra.Button
            mt={2}
            mr={30}
            ml={30}
            background="var(--color1)"
            color="white"
            _hover={{
              bgColor: "var(--color2)",
              transform: "translateY(-4px)",
            }}
            onClick={singUp.onOpen}
          >
            Crear cuenta
          </Chakra.Button>
          <Chakra.Drawer
            isOpen={singUp.isOpen}
            placement="right"
            onClose={singUp.onClose}
            finalFocusRef={btnRef}
            size="xl"
          >
            <Chakra.DrawerOverlay />

            <Chakra.DrawerContent
              bgColor="var(--color1-1)"
              backgroundPosition="bottom"
              bgRepeat="no-repeat"
              bgSize="contain"
            >
              <Chakra.DrawerCloseButton
                backgroundColor="var(--color1)"
                color="var(--color3)"
                justifyItems="center"
                _hover={{
                  background: "var(--color3)",
                  color: "var(--color1)",
                }}
              />

              <Chakra.DrawerBody
                bgRepeat="no-repeat"
                bgPosition="center bottom 80px"
                display="flex"
                alignItems="center"
              >
                <Components.SignUp />
              </Chakra.DrawerBody>
            </Chakra.DrawerContent>
          </Chakra.Drawer>
          <Chakra.ModalFooter>
            <Chakra.Button colorScheme="red" onClick={onClose}>
              Close
            </Chakra.Button>
          </Chakra.ModalFooter>
        </Chakra.ModalContent>
      </Chakra.Modal>
    </>
  );
}

export default Register;
