import * as Chakra from "@chakra-ui/react";
import aboutUsPic from "../../assets/images/about_Us_Pic.jpg";
//import * as Components from "../../components"

function AboutUs() {
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
  return (
    <>
      <button onClick={onOpen}>Quiénes somos</button>

      <Chakra.Modal isOpen={isOpen} onClose={onClose} backgroundColor="#f9f5e7">
        <Chakra.ModalOverlay />
        <Chakra.ModalContent maxH="800px" maxW="900px">
          <Chakra.ModalHeader fontSize="3xl" fontWeight="bold">
            Quienes somos
          </Chakra.ModalHeader>
          <Chakra.ModalCloseButton />
          <Chakra.ModalBody>
            <Chakra.Box>
              {/* <Chakra.Image src={aboutUsPic} /> */}
            </Chakra.Box>
            <Chakra.Text fontSize="2xl" fontWeight="bold" mb="2">
              Somos Lotus
            </Chakra.Text>
            <Chakra.Divider color="#a7727d"/>
            <Chakra.Text mb="2" fontSize="lg" fontWeight="medium">
              Lotus tiene como objetivo ser un puente entre los artistas y sus
              compradores haciendo de la compra de arte en línea una experiencia
              fácil y agradable.
            </Chakra.Text>
            <Chakra.Text mb="2" fontSize="lg" fontWeight="medium">
              Creemos que el arte es una forma poderosa de expresión y que puede
              mejorar nuestras vidas de muchas maneras. Ya sea que esté buscando
              una obra de arte para decorar su hogar, para regalar a un ser
              querido o simplemente para enriquecer su colección personal,
              estamos aquí para ayudarlo a encontrar la pieza perfecta.
            </Chakra.Text>
            <Chakra.Text mb="2" fontSize="lg" fontWeight="medium">
              Nuestra galería se compone de obras de todo tipo de artistas
              emergentes y consagrados, de diferentes estilos y en diferentes
              soportes. Cualquier usuario puede completar el formulario de
              solicitud de publicación de obra y comercializar con nosotros su
              creación.
            </Chakra.Text>
            <Chakra.Text mb="2" fontSize="lg" fontWeight="medium">
              Nos esforzamos por brindar un excelente servicio al cliente y
              hacer que su experiencia de compra sea lo más satisfactoria
              posible. Si tiene alguna pregunta o necesita ayuda en cualquier
              momento durante su proceso de compra, no dude en contactarnos.
              Estamos aquí para ayudarlo y asegurarnos de que esté satisfecho
              con su compra.
            </Chakra.Text>

            <Chakra.Divider color="#a7727d"/>

           {/* <Chakra.Flex>
              <Chakra.Avatar src="https://bit.ly/sage-adebayo" />
              <Chakra.Box ml="3">
                <Chakra.Text fontWeight="bold">
                  Segun Adebayo
                  <Chakra.Badge ml="1" colorScheme="green">
                    New
                  </Chakra.Badge>
                </Chakra.Text>
                <Chakra.Text fontSize="sm">UI Engineer</Chakra.Text>
              </Chakra.Box>
            </Chakra.Flex>
             <Components.Minimap /> */}
          </Chakra.ModalBody>

          <Chakra.ModalFooter>
            <Chakra.Button
              backgroundColor="#804674"
              color="#F9F5E7"
              mr={3}
              onClick={onClose}
            >
              Cerrar
            </Chakra.Button>
          </Chakra.ModalFooter>
        </Chakra.ModalContent>
      </Chakra.Modal>
    </>
  );
}

export default AboutUs;
